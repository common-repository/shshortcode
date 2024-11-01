(function(){
	tinymce.create('tinymce.plugins.SHshortcode', {
		createControl : function(id, controlManager) {
			if (id == 'SHshortcode_button') {
				var button = controlManager.createButton('SHshortcode_button', {
					title : 'SHshortcode', // title of the button
					image : '../wp-content/plugins/SHshortcode/icon.png',  
					onclick : function() 
					{
						var width = jQuery(window).width(), H = jQuery(window).height(), W = ( 720 < width ) ? 720 : width;
						W = W - 80;
						H = H - 84;
						tb_show( 'SyntaxHighlighter Shortcodes', '#TB_inline?width=' + W + '&height=' + H + '&inlineId=SHshortcode-form' );
					}
				});
				return button;
			}
			return null;
		}
	});

	tinymce.PluginManager.add('SHshortcode', tinymce.plugins.SHshortcode);
	
	jQuery(function(){
	
		var htmldoc = jQuery('<div id="SHshortcode-form"></div>');
	
		jQuery.ajax(
		{
			url: '../wp-content/plugins/SHshortcode/SHshortcode_form.html',
			success:function(data)
			{
				htmldoc.html(data);
			},
 		});
		
		var form = htmldoc.find('form');
		htmldoc.appendTo('body').hide();
		
	});
})()

function showAdvanced() 
{
	var element = document.getElementById("hideContent");

	if(element.style.display == "block") 
	{
    	element.style.display = "none";
  	}
	else 
	{
		element.style.display = "block";
	}
} 

function generateShortCode()
{
	
	var shortcode = '['+ document.getElementById('SHshortcode-language').value;
	
	if(document.getElementById('SHshortcode-advanced').checked)
	{
	
		var textOptions = 
		{
			'title'         : '',
			'firstline'     : '',
			'highlight'    	: '',
		};
		
		var radioOptions = 
		{ 
			'autolinks'    	: '',
			'collapse'    	: '',
			'gutter' 		: '',
			'htmlscript'    : '',
			'toolbar'    	: '',
			'wraplines'    	: '' 
		};
				
		for( var index in textOptions)
		{
			var value = document.getElementById('SHshortcode-' + index).value;
			shortcode += ' '+ index + '="' + value +'"';
		}
		
		for( var index in radioOptions)
		{
			var element = document.getElementById('SHshortcode-' + index);
			var value = document.getElementById('SHshortcode-' + index).value;
			
			if( element.checked)
				shortcode += ' ' + index + '="' + value + '"';
		}
	
	}
	
	shortcode += '][/' + document.getElementById('SHshortcode-language').value + ']';

	tinyMCE.activeEditor.execCommand('mceInsertContent', false, shortcode);
			
	tb_remove();

}
