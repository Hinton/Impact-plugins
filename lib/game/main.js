ig.module( 
	'game.main' 
)
.requires(
	'impact.game',
	'impact.font',

	'plugins.menu'
)
.defines(function(){

MyGame = ig.Game.extend({
	
	// Load a font
	font: new ig.Font( 'media/04b03.font.png' ),
	
	
	init: function() {
		// Initialize your game here; bind keys etc.
		
		ig.input.initMouse();
		ig.input.bind(ig.KEY.MOUSE1, 'mouse1');

		var that = this;

		this.menu1 = new Menu(new ig.Font('media/04b03.font.png'), {x: 10, y: 10});
		this.menu1.add(new TextMenuItem('Item 1', function() {
			ig.log("Clicked item 1");
		}));

		this.menu1.add(new TextMenuItem('Close menu', function() {
			ig.log("Closed menu 1");
			that.menu1 = null;
		}));

		this.menu2 = new Menu(new ig.Font('media/04b03.font.png'), {x: 200, y: 10});

		var image = new ig.Image('media/menu.png');

		this.menu2.add(new ImageMenuItem(image, 0, function() {
			ig.log("Clicked item 1");
		}));

		this.menu2.add(new ImageMenuItem(image, 2, function() {
			ig.log("Closed menu 1");
			that.menu2 = null;
		}));


	},
	
	update: function() {
		// Update all entities and backgroundMaps
		this.parent();
		
		if (ig.input.pressed('mouse1')) {
			if (this.menu1 !== null) {
				this.menu1.click();
			}
			if (this.menu2 !== null) {
				this.menu2.click();
			}
		}

		// Add your own, additional update code here
	},
	
	draw: function() {
		// Draw all entities and backgroundMaps
		this.parent();
		
		if (this.menu1 !== null) {
			this.menu1.draw();
		}

		if (this.menu2 !== null) {
			this.menu2.draw();
		}
		
		// Add your own drawing code here
		var x = ig.system.width/2,
			y = ig.system.height/2;
		
		this.font.draw( 'It Works!', x, y, ig.Font.ALIGN.CENTER );
	}
});


// Start the Game with 60fps, a resolution of 320x240, scaled
// up by a factor of 2
ig.main( '#canvas', MyGame, 60, 320, 240, 2 );

});
