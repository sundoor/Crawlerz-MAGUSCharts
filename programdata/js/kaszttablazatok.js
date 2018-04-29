/**
 * Kasztok és képzettségek

 * 
 * @author	Sándor Preszter <preszter.sandor@gmail.com>
 * @version	1.20
 * @dependency	jquery-ui-min.js 
 * @dependency	canvasjs.min.js  
 */ 

var JSON_nehezsegek = [
	{"id":1, "fokok": [
		{"fok":1, "ido":0.25, "kp":1},
		{"fok":2, "ido":1, "kp":2},
		{"fok":3, "ido":3, "kp":5},
		{"fok":4, "ido":6, "kp":7},
		{"fok":5, "ido":12, "kp":10}
		]},
	{"id":2, "fokok": [
		{"fok":1, "ido":1, "kp":1},
		{"fok":2, "ido":3, "kp":4},
		{"fok":3, "ido":6, "kp":6},
		{"fok":4, "ido":12, "kp":10},
		{"fok":5, "ido":24, "kp":10}
		]},
	{"id":3, "fokok": [
		{"fok":1, "ido":3, "kp":2},
		{"fok":2, "ido":6, "kp":6},
		{"fok":3, "ido":12, "kp":7},
		{"fok":4, "ido":24, "kp":15},
		{"fok":5, "ido":48, "kp":15}
		]},
	{"id":4, "fokok": [
		{"fok":1, "ido":6, "kp":3},
		{"fok":2, "ido":12, "kp":7},
		{"fok":3, "ido":24, "kp":10},
		{"fok":4, "ido":48, "kp":15},
		{"fok":5, "ido":96, "kp":20}
		]}
];

var JSON_fokasztok = [
	{"id": 0, "name":"Harcos"},
	{"id": 1, "name":"Lovag"},
	{"id": 2, "name":"Fejvadász"},
	{"id": 3, "name":"Tolvaj"},
	{"id": 4, "name":"Bárd"},
	{"id": 5, "name":"Harcművész"},
	{"id": 6, "name":"Pap"},
	{"id": 7, "name":"Paplovag"},
	{"id": 8, "name":"Boszorkány"},
	{"id": 9, "name":"Boszorkánymester"},
	{"id": 10, "name":"Tűzvarázsló"},
	{"id": 11, "name":"Varázsló"}
];

var kasztgrafikonok = {

	/**
	 * Inicializálás
	 * @constructor
	 */
	ini: function(){
		html = '';
		for(i in JSON_kasztok){
			ido = 0;
			kap = 0;
			n = JSON_kasztok[i].kepzettsegek.length;
			for(j=0; j<n; j++){
				a = JSON_kasztok[i].kepzettsegek[j].id;
				b = JSON_kasztok[i].kepzettsegek[j].fok;
				z = JSON_kepzettsegek[a].nehez-1;
				if(JSON_kepzettsegek[a].type == "N"){
					for(k=0; k<b; k++){
						y = JSON_nehezsegek[z].fokok[k].ido;
						// Oktatás 4. foka beleszámolva
						x = JSON_nehezsegek[z].fokok[k].kp;
						x = ((x-2)<1)? 1 : x-2;
						kap += x;
						ido += y;
					} 
				}
				else if(JSON_kepzettsegek[a].type == "S"){
					// 1. fok = 20%, 2. fok = 40% stb
					z = 0;
					c = Math.floor(b/20);
					for(k=0; k<c; k++){ 
						y = JSON_nehezsegek[z].fokok[k].ido;
						// Oktatás 4. foka beleszámolva
						x = b/5;
						kap += x;
						ido += y;
					} 
				}
			}

			// Hozzáadás a táblázathoz
			html += '<tr>';
			html += '<td style="text-align: left;">'+JSON_kasztok[i].name+'</td>';
			html += '<td>'+JSON_kasztok[i].kap+'</td>';
			html += '<td>'+kap+'</td>';
			html += '<td>'+Math.round(ido)+'</td>';
			html += '<td>'+Math.floor(kap/JSON_kasztok[i].kap)+'</td>';
			html += '</tr>';
			
		} 
		
		$("#kaszttable").append(html);
		
		/* Táblázat formázása */
		$('#kaszttable').DataTable( {
		        "paging":   false,
		        "info":     false
		});	

		this.kasztaccordion();	
		this.kepzettsegtable();
			
	},

	kasztaccordion: function(){
		html = '';
		for(i in JSON_fokasztok){
			html += '<h2>'+JSON_fokasztok[i].name+'</h2><div class="accordion">';
			for(j in JSON_kasztok){
				if(JSON_kasztok[j].fokaszt == i){
					html += '<h3>'+JSON_kasztok[j].name+'</h3><div><table><tr><th>Képzettség</th><th>Fok</th></tr>';
					for(k in JSON_kasztok[j].kepzettsegek){
						html += '<tr><td style="text-align: left;">'+JSON_kepzettsegek[JSON_kasztok[j].kepzettsegek[k].id].name+'</td><td>'+JSON_kasztok[j].kepzettsegek[k].fok+'</td></tr>';	
					}
					html += '</table></div>';
				}
			}
			html += '</div>';	
		}
		$("#kasztaccordion").append(html);
		$("#kasztaccordion").accordion({collapsible: true, heightStyle: "content", animate: false, active: false});
		$(".accordion").accordion({collapsible: true, heightStyle: "content", animate: false, active: false});
	},

	kepzettsegtable: function(){
		html = '';
		for(i in JSON_kepzettsegek){
			switch(JSON_kepzettsegek[i].category){
				case 'H': 
					tipus = 'Harci';
					break;
				case 'A': 
					tipus = 'Alvilági';
					break;
				case 'V': 
					tipus = 'Világi';
					break;
				case 'T': 
					tipus = 'Tudományos';
					break;
				case 'S': 
					tipus = 'Szociális';
					break;
				case 'M': 
					tipus = 'Misztikus';
					break;
				default:
					tipus = 'Harci';
			}
			html += '<tr><td style="text-align: left;">'+JSON_kepzettsegek[i].name+'</td>';
			html += '<td>'+tipus+'</td>';
			x = JSON_kepzettsegek[i].nehez*1;
			html += '<td>'+((x==0)?1:x)+'</td>';
			if(x == 0){
				html += '<td>1/3%</td><td></td><td></td><td></td><td></td>';	
			}
			else{
				html += '<td>'+JSON_nehezsegek[x-1].fokok[0].kp+'</td>';
				html += '<td>'+JSON_nehezsegek[x-1].fokok[1].kp+'</td>';
				html += '<td>'+JSON_nehezsegek[x-1].fokok[2].kp+'</td>';
				html += '<td>'+JSON_nehezsegek[x-1].fokok[3].kp+'</td>';
				html += '<td>'+JSON_nehezsegek[x-1].fokok[4].kp+'</td>';
			}

			tul = '';
			for(j in JSON_kepzettsegek[i].tul){
				tul += JSON_kepzettsegek[i].tul[j]+' ';
			}
			html += '<td>'+tul+'</td></tr>';
		}
		
		$("#kepzettsegtable").append(html);
		$('#kepzettsegtable').DataTable( {
		        "paging":   false,
		        "info":     false
		});	
	}
		 	 		
}
