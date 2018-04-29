/**
 * GEM MAGUSCHARTS összehasonlító grafikonok és táblázatok
 * (c)2015 Sándor Preszter - https://opensource.org/licenses/MIT 
 * 
 * @author	Sándor Preszter <preszter.sandor@gmail.com>
 * @version	1.03
 * @since	2015-10-31 
 */ 

/**
 * JQuery onload / inicializálás
 */
  
$(function(){

	/**
	 * Tabok inicializálása
	 */     
	var tabTitle = $( "#tab_title" ),
	tabContent = $( "#tab_content" );
	
	var tabs = $( "#tabs" ).tabs();
	
	/**
	 * Egyéb Jquery és Jquery-Ui elemek inicializálása
	 */
	
	// Tooltipek
	$( ".tooltip" ).tooltip();
	
	// Gombok
	$( ".button" ).button();
	
	fegyvertablazat.ini();
	fegyvergrafikonok.ini(); 
	kasztgrafikonok.ini();  

});



