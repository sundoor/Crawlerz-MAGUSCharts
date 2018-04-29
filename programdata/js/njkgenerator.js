/**
 * NJK Generátor
 * 
 * @author	Sándor Preszter <preszter.sandor@gmail.com>
 * @version	1.0
 * @dependency	jquery-ui-min.js 
 */ 
var njkgenerator = {

	/**
	 * Inicializálás
	 * @constructor
	 */
	ini: function(){
		$("#tabs-7").on("click", "#sk_addbutton", function(){
			dobaskalkulator.hozzaadas();	
		});
		
		for(i=0; i<=7; i++){
			html = '<tr>';
			html += '<td><input type="checkbox" id="jk'+i+'statplaying" /></td>';
			html += '<td><input id="jk'+i+'statfp" style="width: 3em;" value="0" /></td>';
			html += '<td><input id="jk'+i+'statke" style="width: 3em;" value="0" /></td>';
			html += '<td><input id="jk'+i+'statte" style="width: 3em;" value="0" /></td>';
			html += '<td><input id="jk'+i+'statve" style="width: 3em;" value="0" /></td>';
			html += '<td><input id="jk'+i+'statsp" style="width: 3em;" value="0" /></td></tr>';
			$("#jkstatinput").append(html);
		}
		
		html = '<tr>';
		html += '<td>átl.</td>';
		html += '<td id="jkatlagfp"></td>';
		html += '<td id="jkatlagke"></td>';
		html += '<td id="jkatlagte"></td>';
		html += '<td id="jkatlagve"></td>';
		html += '<td id="jkatlagsp"></td></tr>';
		$("#jkstatinput").append(html);
	}		 	 		
}

$(function(){
	njkgenerator.ini();
});