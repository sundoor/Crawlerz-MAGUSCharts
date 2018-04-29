/**
 * Dobáskalkulátor
 * 
 * @author	Sándor Preszter <preszter.sandor@gmail.com>
 * @version	1.0
 * @dependency	jquery-ui-min.js 
 * @dependency	canvasjs.min.js  
 */ 
var dobaskalkulator = {

	km: [],
	sm: [],
	/**
	 * Inicializálás
	 * @constructor
	 */
	ini: function(){
		$("#tabs-2").on("click", "#sk_addbutton", function(){
			dobaskalkulator.hozzaadas();	
		});
		
		$("#tabs-2").on("click", "#sk_graphbutton", function(){
			dobaskalkulator.plotchart();
			dobaskalkulator.plotchart2();	
		});
		
		// Dinamikusan generált sorok eltávolítógombja
		$("#tabs-2").on( "click", "a.removeline", function(){
			$(this).closest("tr").remove();
			dobaskalkulator.removeline($(this).closest("tr").attr("id"));
		}); 
	},
	
	removeline: function(id){
		n = this.km.length;
		for(i=0; i<n; i++){
			if(this.km[i].id == id){
				this.km.splice(i,1);
				this.sm.splice(i,1);
			}
		} 
	},
		 	
	hozzaadas: function(){
		id = new Date; 
		id = id.getTime(); 
		tpk = $("#sk_tpkselect").val()*1; // Támadás per kör
		at = $("#sk_atselect").val()*1; // Átütés
		n = $("#sk_nselect").val()*1;	// Kockák száma
		d = $("#sk_dselect").val()*1;	// Kockák oldalainak száma
		nb = $("#sk_nbonus").val()*1;	// Bónusz sebzés   
		
		data = this.calc(n, d, nb, tpk, at);
		
		nev = $("#sk_name").val();
		dobas = "("+n+"k"+d+"+"+nb+")";                                                                                                                                  
		json = { type: "spline",  showInLegend: true, name: nev+" "+dobas, dataPoints: data.adatsor, id: id};
		
		$("#sk_dobasok").append('<tr id="'+id+'"><td>'+nev+'</td><td>'+dobas+'</td><td>'+data.min+'</td><td>'+data.max+'</td><td>'+data.avg+'</td><td>'+((at==1)? 'igen':'nem')+'</td><td><a class="removeline button"><img src="programdata/gfx/dot.gif" alt="Eltávolítás" class="icon ic_s_cancel" /></a></td></tr>');
		
		this.sm.push({type: "spline",  showInLegend: true, name: nev+" "+dobas, dataPoints: data.sfesor});
		return this.km.push(json);
	},
	
	calc: function(n, d, nb, tpk, at){
		min = n+nb;	// Minimum érték
		max = n*d+nb;    // Maximum érték
		a = n*(1+d)/2+nb;	// Átlag
		
		dm = [];
		k = n*d;
		v = 0;
		
		for(i = 1; i <= d; i++){
			v += Math.pow(i-((1+d)/2),2)*(1/d);
		}
			
		v = n*v;	// Variancia (szórás^2)
			       
		dp = [];
		for(i = 1; i <= k+nb; i++){
			if(i < n+nb){
				dp.push({x: i, y: 0});	
			}
			else{
				dp.push({label: i+" SP", x: i, y: ((n==1)? 1/d : this.gauss(v, a, i, Math.pow(i-a,2)))});
			}	
		}
		
		// SFÉ adatsor
		sp = [];
		for(j=0; j<=10; j++){
			if(at == 1){
				r = ((j-n)<0) ? 0 : j-n; // Átütés
			}
			else{
				r = j;
			}
			p = ((n-r)<0)? 0 : n-r;  // Minimum sebzés
			q = ((n*d-r)<0)? 0 : n*d-r; // Maximum sebzés               
			z = tpk*((p+q)/2); 
			sp.push({x: j, y: z});
		}
		return {min: min, max: max, avg: a, adatsor: dp, sfesor: sp, id: id};
	},
	
	
	
	gauss: function(v, a, x, dev){
		s = Math.sqrt(v);	// Szórás
		g = 1/(s*Math.sqrt(2*Math.PI));
		return g*Math.pow(Math.E,(dev/(2*Math.pow(s,2)))*(-1));
	},
	
	plotchart: function(){
		var chart = new CanvasJS.Chart("chartContainer",
		{
			title:{ text: "Sebzések valószínűsége / támadás" },   
                        animationEnabled: true,
			exportEnabled: true,  
			axisY:{ 
				title: "Valószínűség",
				includeZero: false,
				interval: 0.01,
				gridThickness: 1                    
			},
			axisX: {
				title: "Lehetséges sebzés",
				interval: 1
			},
			toolTip: {
				shared: true,
				content: function(e){
					var body = new String;
					var head ;
					for (var i = 0; i < e.entries.length; i++){
						var  str = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong>'' <br/>" ; 
						body = body.concat(str);
					}
					head = "<span style = 'color:DodgerBlue; '><strong>"+ (e.entries[0].dataPoint.label) + "</strong></span><br/>";

					return (head.concat(body));
				}
			},
			legend: {
				horizontalAlign :"center"
			},
			data: dobaskalkulator.km,
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
	},
	
		plotchart2: function(){
		var chart = new CanvasJS.Chart("chartContainer2",
		{
			title:{ text: "Körönkénti átlagos sebzés az SFÉ függvényében" },   
                        animationEnabled: true,
			exportEnabled: true,  
			axisY:{ 
				title: "Átlagos SP",
				includeZero: false,
				interval: 1,
				gridThickness: 1                    
			},
			axisX: {
				title: "SFÉ",
				interval: 1
			},
			toolTip: {
				shared: true,
				content: function(e){
					var body = new String;
					var head ;
					for (var i = 0; i < e.entries.length; i++){
						var  str = "<span style= 'color:"+e.entries[i].dataSeries.color + "'> " + e.entries[i].dataSeries.name + "</span>: <strong>"+  e.entries[i].dataPoint.y + "</strong>'' <br/>" ; 
						body = body.concat(str);
					}
					head = "<span style = 'color:DodgerBlue; '><strong>"+ (e.entries[0].dataPoint.label) + "</strong></span><br/>";

					return (head.concat(body));
				}
			},
			legend: {
				horizontalAlign :"center"
			},
			data: dobaskalkulator.sm,
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

$(function(){
	dobaskalkulator.ini();
});