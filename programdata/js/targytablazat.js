/**
 * Tárgy táblázatok
 * 
 * @author	Sándor Preszter <preszter.sandor@gmail.com>
 * @version	1.0
 * @dependency	jquery-ui-min.js 
 * @dependency	canvasjs.min.js  
 * @dependency	jquery.dataTables.min.js 
 */ 
var fegyvertablazat = {

	km: [],
	/**
	 * Inicializálás
	 * @constructor
	 */
	ini: function(){
	
	
		/* XML konvertáló script 
		x = "[";
		Gtargyak.find("targyak>targy").each(function(){
				// nKd+nb felbontása
				y = $(this).attr('sp');
				y = y.split("k");
				n = y[0];
				y = (y[1]) ? y[1].split("+") : Array(1);
				d = (y[0]) ? y[0] : 0;
				nb = (y[1]) ? y[1] : 0;
				x += '{"id":'+$(this).attr('id')+', "name":"'+$(this).attr('name')+'", "category":'+$(this).attr('kateg')+', "meret":'+$(this).attr('meret')+', "ido":'+$(this).attr('ido')+', "suly":'+($(this).attr('suly').replace(",","."))*1+', "stp":'+$(this).attr('stp')+', "mgt":'+$(this).attr('mgt')+', "sfe":'+$(this).attr('sfe')+', "ke":'+$(this).attr('ke')+', "te":'+$(this).attr('te')+', "ve":'+$(this).attr('ve')+', "ce":'+$(this).attr('ce')+', "n":'+n+', "d":'+d+', "nb":'+nb+'},\n';	
		});
		x += "]";                 alert(x);
		document.getElementById("buhi").innerHTML = x;   /**/
		
		html = '';
		m = JSON_targyak.length;
		for(i = 0; i < m; i++){
		
		        min = JSON_targyak[i].n+JSON_targyak[i].nb;
			max = JSON_targyak[i].n*JSON_targyak[i].d+JSON_targyak[i].nb;
			avg = JSON_targyak[i].n*(1+JSON_targyak[i].d)/2+JSON_targyak[i].nb;
			
			tpk = ((JSON_targyak[i].ido) ? Math.floor(10/JSON_targyak[i].ido) : 1);
			sfe3 = ((!JSON_targyak[i].at) ? 3 : ((3-JSON_targyak[i].n < 0) ? 0 : 3-JSON_targyak[i].n) );
			sfe6 = ((!JSON_targyak[i].at) ? 6 : ((3-JSON_targyak[i].n < 0) ? 0 : 6-JSON_targyak[i].n) );
			avg0 = (JSON_targyak[i].n*(1+JSON_targyak[i].d)/2+JSON_targyak[i].nb)*tpk;
			avg3 = ( ( ((min-sfe3<0) ? 0 : min-sfe3) + ((max-sfe3<0) ? 0 : max-sfe3) )/2 )*tpk;
			avg6 = ( ( ((min-sfe6<0) ? 0 : min-sfe6) + ((max-sfe6<0) ? 0 : max-sfe6) )/2 )*tpk;
			
			html += '<tr id="it_"'+JSON_targyak[i].id+'">';
			html += '<td>'+JSON_targyak[i].name+'</td>';
			html += '<td>'+JSON_targyak[i].suly+'</td>';
			html += '<td>'+JSON_targyak[i].meret+'</td>'; 
			html += '<td>'+JSON_targyak[i].ido+'</td>';
			html += '<td>'+JSON_targyak[i].stp+'</td>';
			html += '<td>'+JSON_targyak[i].mgt+'</td>';
			html += '<td>'+JSON_targyak[i].sfe+'</td>';
			html += '<td>'+JSON_targyak[i].ke+'</td>';
			html += '<td>'+JSON_targyak[i].te+'</td>';
			html += '<td>'+JSON_targyak[i].ve+'</td>';
			html += '<td>'+JSON_targyak[i].ce+'</td>';
			html += '<td>'+JSON_targyak[i].n+'k'+JSON_targyak[i].d+'+'+JSON_targyak[i].nb+'</td>';
			html += '<td>'+((!JSON_targyak[i].at) ? 'nem' : 'igen')+'</td>';
			html += '<td>'+min+'</td>';
			html += '<td>'+max+'</td>';
			html += '<td>'+avg+'</td>';
			html += '<td>'+avg0+'</td>';
			html += '<td>'+avg3+'</td>';
			html += '<td>'+avg6+'</td>';
			html += '<td>'+((JSON_targyak[i].ke+JSON_targyak[i].te+JSON_targyak[i].ve+JSON_targyak[i].ce)*2-JSON_targyak[i].mgt*13)+'</td>';
			html += '</tr>';
		}
		
		$("#targytable").append(html);
		
		/* Táblázat formázása */
		$('#targytable').DataTable( {
		        "paging":   false,
		        "info":     false
		});	
	
	},		 	 		
}
