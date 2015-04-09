( function( $ ) {

	// Brand
	// =============================================================================

	wp.customize( 'setting_hy_address', function( value ) {
		value.bind( function( newval ) {
			$( '.czrAddress' ).html( nl2br( newval ) );
		} );
	} );

	wp.customize( 'setting_hy_contacts', function( value ) {
		value.bind( function( newval ) {
			$( '.czrContacts' ).html( nl2br( newval ) );
		} );
	} );



	// Colors
	// =============================================================================

	var list = ['div', 'a', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'span', 'input', 'select'];
	var api = Absurd();

	wp.customize( 'setting_hy_dark_color', function( value ) {
		value.bind( function( newval ) {

			window.settings.darkColor = newval;

			var css = api.morph('dynamic-css').add({
			    '<% elClass[0] %>': {
			        backgroundColor: '<% w %>'
			    },
			    '<% this.list.join() %>': { 
			    	color: '<% w %>' 
			    },
			    '<% this.list.join(elClass[1] + ",") %>': { 
			    	color: '<% w %>' 
			    },
			    '<% elClass[1] + " " + this.list.join(", " + elClass[1] + " ") %>': { 
			    	color: '<% w %>' 
			    }

			}).compile(function(err, css) {

			}, { w: newval, elClass: ['.dark-background', '.dark', '.dark-border'], list: list });

			$(".dark-border").css("border-color", newval);

			$("#setting_hy_dark_color").each (function() {
				$(this).remove();
			});
			$("head").append("<style id='setting_hy_dark_color'>" + css + '</style>');

		} );
	} );
	
	wp.customize( 'setting_hy_light_color', function( value ) {
		value.bind( function( newval ) {

			window.settings.lightColor = newval;

			
			var css = api.morph('dynamic-css').add({
			    '<% elClass[0] %>': {
			        backgroundColor: '<% w %>'
			    },
			    '<% this.list.join(elClass[1] + ",") %>': { 
			    	color: '<% w %>' 
			    },
			    '<% elClass[1] + " " + this.list.join(", " + elClass[1] + " ") %>': { 
			    	color: '<% w %>' 
			    }

			}).compile(function(err, css) {

			}, { w: newval, elClass: ['.light-background', '.light', '.light-border'], list: list });

			// adding css doesn't seem to change anything
			$(".light-border").css("border-color", newval);
			
			$("#setting_hy_light_color").remove();

			$("head").append("<style id='setting_hy_light_color'>" + css + '</style>');
		} );
	} );


	// Fonts
	// =============================================================================

	var web_fonts = {
        'arial'         : 'Arial, Helvetica, sans-serif',
        'arial-black'   : '"Arial Black", Gadget, sans-serif',
        'courier'       : '"Courier New", Courier, monospace',
        'georgia'       : 'Georgia, "Times New Roman", Times, serif',
        'lucida'        : '"Lucida Sans Unicode", "Lucida Grande", sans-serif',
        'tahoma'        : 'Tahoma, Geneva, sans-serif',
        'times'         : '"Times New Roman", Times, serif',
        'trebuchet'     : '"Trebuchet MS", Arial, Helvetica, sans-serif',
        'verdana'       : 'Verdana, Geneva, sans-serif'
    };
	
	wp.customize( 'setting_hy_title_font', function( value ) {
		value.bind( function( newval ) {
			var found = false;

			for(var key in web_fonts) {
				if (key == newval) {
			  		newval = web_fonts[key];
			  		found = true;
			  	}
			}

			if (!found) {
				WebFont.load({
				    google: {
				      families: [newval]
				    }
				});
			}
			
			api.component("hy_title_font", {
			    css: {
			        'h1,h2,h3,h4,h5,h6': {
			            fontFamily: newval
			        }
			    },
			    constructor: function(name) {
			        this.populate();
			    }
			})();

		} );
	} );

	wp.customize( 'setting_hy_text_font', function( value ) {
		value.bind( function( newval ) {
			var found = false;

			for(var key in web_fonts) {
				if (key == newval) {
			  		newval = web_fonts[key];
			  		found = true;
			  	}
			}

			if (!found) {
				WebFont.load({
				    google: {
				      families: [newval]
				    }
				});
			}

			api.component("hy_text_font", {
			    css: {
			        'html,body': {
			            fontFamily: newval
			        }
			    },
			    constructor: function(name) {
			        this.populate();
			    }
			})();
		} );
	} );
		

} )( jQuery );

function nl2br (str, is_xhtml) {
    var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
    return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}