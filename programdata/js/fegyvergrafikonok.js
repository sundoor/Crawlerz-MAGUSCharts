/**
 * Fegyvergrafikonok
 * 
 * @author	Sándor Preszter <preszter.sandor@gmail.com>
 * @version	1.0
 * @dependency	jquery-ui-min.js 
 * @dependency	canvasjs.min.js  
 */ 
var fegyvergrafikonok = {

	/**
	 * Inicializálás
	 * @constructor
	 */
	standby: 0,
	ini: function(){
	
		dp = [];
		km  = [];
		m = JSON_targyak.length;
		for(i = 0; i < m; i++){
		       	if(JSON_targyak[i].d > 0){
				// Bónusz sebzés íjász-szabályból
				// Az 1.2 úgy jön ki, hogy az alábbi képletet használjuk: n * Σ(i=1, i→∞)[ (1/d)^i * ((1+d)/2 ]
				// 6-oldalú kocka esetén az eredmény 0.7 (kerekítve)
				ib = (JSON_targyak[i].category == 10 || JSON_targyak[i].category == 11) ? 0.7*JSON_targyak[i].n : 0;
			        min = JSON_targyak[i].n+JSON_targyak[i].nb;
				max = JSON_targyak[i].n*JSON_targyak[i].d+JSON_targyak[i].nb;
				avg = JSON_targyak[i].n*(1+JSON_targyak[i].d)/2+JSON_targyak[i].nb+ib;
				
				switch(JSON_targyak[i].ido){
					case 3:
						tamperkor = 3;
						break;
					case 5:
						tamperkor = 2;
						break;
					case 10:
						tamperkor = 1;
						break;
					case 20:
						tamperkor = 0.5;
						break;
					case 40:
						tamperkor = 0.25;
						break;
					default:
						tamperkor = 1; 
				}
				
				// Sebzésösszehasonlítás
				dp.push({label: JSON_targyak[i].name, x: i, y: [avg*tamperkor, max*tamperkor, min*tamperkor, avg*tamperkor]});
				
			}	
		} 

		$("#tabs").on("click", 'a[href="#tabs-3"]', function(){
			if(fegyvergrafikonok.standby != 1){
				fegyvergrafikonok.plotchart(dp, m);
				fegyvergrafikonok.standby = 1;
			}
		});
	},
	
	plotchart: function(dp, m){
		var chart = new CanvasJS.Chart("chartContainer3",
		{
			//width: m*12,
			height: 800,
			title:{
				text: "Fegyver sebzés körönként",
				fontSize: 20
			},
			exportEnabled: true,
			axisY: {
				includeZero:false,
				interval: 1,
				title: "Sebzés pont",
				labelFontSize: 11,
				gridThickness: 1,
				titleFontSize: 20
			},     
			axisX: {
				interval:1,
				title: "Fegyver",
				labelAngle: 90,
				labelFontSize: 11,
				titleFontSize: 20
			},
			toolTip: {
				content: "{label}</br><strong>Sebzés:</strong></br>Átlag:{y[0]}</br>Max:{y[1]},Min:{y[2]}",
			},
			data: [{
				type: "ohlc", 
				dataPoints: dp
			}],
			legend: {
				horizontalAlign :"center"
			},
	          	legend :{
		            cursor:"pointer",
		            itemclick : function(e) {
		              if (typeof(e.dataSeries.visible) === "undefined" || e.dataSeries.visible) {
						e.dataSeries.visible = false;
		              }
		              else{
						e.dataSeries.visible = true;
		              }
		              chart.render();
		            }
		        }
		});
		
		chart.render();
	}
		 	 		
}
