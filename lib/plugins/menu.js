ig.module(
	'plugins.menu'
)
.defines(function () {

// Impact.JS menu plugin.
// (c) 2012 Oscar Hinton.
// Licensed under MIT.

// Example Usage
// -------------

//     var menu = new Menu(new ig.Font('font.png'), {x: 0, y: 0});
//     menu.add(new TextMenuItem('Item 1', function() {
//         console.log('Clicked item 1');	
//     }))

// 
//     // Draws the menu, should be located in a draw hook.
//     menu.draw()
//     
//     // Trigger the callback on the current selected item.
//     menu.click()

// Menu
// ----
Menu = ig.Class.extend({
	width: 100,
	height: 10,
	font: null,
	items: [],
	pos: {},

	// Initialize the menu.
	init: function(font, pos) {
		this.font = font;
		this.pos = pos;
	},

	// Adds a new menu item to the menu.
	add: function(item) {
		item.menu = this;
		this.items.push(item);
	},

	// Draws the menu, calls the items draw functions in order.
	draw: function() {

		var mouse = ig.input.mouse;
		var x = this.pos.x;
		var y = this.pos.y;

		for (var i = 0; i < this.items.length; i++) {
			var choice = this.items[i];

			var selected = (x < mouse.x && x + this.width > mouse.x &&
			                y < mouse.y && y + choice.height > mouse.y);

			choice.draw(this.pos.x, y, selected);

			y += choice.height;
		}
	},

	// Attempt to trigger the callback on a menu item by checking the mouse position.
	click: function() {

		var mouse = ig.input.mouse;
		var x = this.pos.x;
		var y = this.pos.y;

		for (var i = 0; i < this.items.length; i++) {
			var choice = this.items[i];

			// Is the item selected?
			if (x < mouse.x && x + this.width > mouse.x &&
			    y < mouse.y && y + choice.height > mouse.y) {

				choice.callback();
				return true;
			}

			y += choice.height;
		}
		return false;
	}

});

// TextMenu Item
// -------------
TextMenuItem = ig.Class.extend({
	label: '',
	callback: null,
	height: 10,
	menu: null,

	// Initialize the text menu item.
	init: function(label, callback) {
		this.label = label;
		this.callback = callback;
	},

	// Draws the text menu item.
	draw: function(x, y, selected) {
		var label = this.label;
		if (selected) {
			label = '<< ' + label + ' >>';
		}
		x = x + this.menu.width / 2;

		this.menu.font.draw(label, x, y, ig.Font.ALIGN.CENTER);
	}
});

// ImageMenu Item
// --------------

// Example Usage
// -------------
// 
//     menu.add(new ImageMenuItem(new ig.Image('media/image.png'), 0, function() {
//         console.log("clicked item 1");
//     });
ImageMenuItem = ig.Class.extend({
	image: null,
	tile: 0,
	callback: null,
	height: 25,
	menu: null,

	// Initialize the text menu item.
	init: function(image, tile, callback) {
		this.image = image;
		this.tile = tile;
		this.callback = callback;
	},

	// Draws the text menu item.
	draw: function(x, y, selected) {
		var tile = this.tile;
		if (selected) {
			tile += 1;
		}

		this.image.drawTile(x, y, tile, this.menu.width, this.height);
	}
});

});