/**
 * Loader class 
 * @author: Krzysztof Wilczek
 * @since: 11.11.2011
 **/
var Loader = new Class({
	
	Implements: [Options, Events],
	
	_element: null, // DOM element for Loader
	_wrapper: null, // wrapper DOM element
	_loader: null, // DOM loader element
	_overlay: null, // DOM overlay element
	
	options: {
		css_class: 'loader',
		overlay_css_class: 'loader_overlay',
		overlay_color: '#fff',
		wrapper_css_class: 'loader_wrapper'
		
	},
	
	/**
	 * Object initialization, create wrapper, item list and assign options
	 * @param Object element
	 * @param Object options
	 * @return Loader
	 */
	initialize: function(element, options)
	{
		if (!element)
		{
			return false;
		}
		this._element = element;
		this.setOptions(options);
		
		this._render();
		this.fireEvent('create');
		return this;
	},

	/**
	 * Render wrapper, loader and overlay
	 */
	_render: function() {
		
		// Create wrapper
		this._wrapper = new Element('div', {'class': this.options.wrapper_css_class});
		this._wrapper.inject(this._element, 'before');
		this._wrapper.grab(this._element);
		this._wrapper.grab(new Element('div', {'class': 'cleaner'}));
		
		// Create loader
		this._loader = new Element('div', {'class': this.options.css_class});
		this._loader.setStyle('opacity',0);
		this._wrapper.grab(this._loader);
		
		// Create overlay
		this._overlay = new Element('div', {'class': this.options.overlay_css_class});
		this._overlay.setStyles({
			'background-color': this.options.overlay_color,
			'opacity': 0
		})
		
		var element_position = this._element.getPosition();
		var element_size = this._element.getSize();
		var loader_size = this._loader.getSize();
		
		// Set overlay position
		this._overlay.setStyles({
			'left': element_position.x,
			'width': element_size.x
		});
		
		// Set loader position
		this._loader.setStyles({
			'top': Math.round(element_size.y/2) - Math.round(loader_size.y/2),
			'left': element_position.x + Math.round(element_size.x/2) - Math.round(loader_size.x/2)		
		});
		
		this._wrapper.grab(this._overlay);
	},
	
	/**
	 * Shows loader
	 */
	show: function() {
		this._overlay.fade(0.8);
		this._loader.fade('in');
		this.fireEvent('show');
	},
	
	/**
	 * Hide loader
	 */
	hide: function() {
		this._overlay.fade('out');
		this._loader.fade('out');
		this.fireEvent('hide');
	},
	
	/**
	 * Unset loader (dispose wrapper)
	 */
	destroy: function() {
		this._element.inject(this._wrapper, 'before');
		this._wrapper.dispose();
		this._wrapper = null;
		this.fireEvent('destroy');
	}
	
});

/**
 * Standard Mootools Element extension 
 * add new method called: loader (create new Loader)
 * @param Object options 
 * @return Loader
 */
Element.implement('loader', function(){
	
	var options = arguments[0];	
	
	if (options != null) {
		var loader = new Loader(this, options);
		this.store('loader', loader);		
	} 
	else 
	{
		var loader = this.retrieve('loader');	
		if (loader != null) {
			return loader;
		}
	}
	return this;

});
