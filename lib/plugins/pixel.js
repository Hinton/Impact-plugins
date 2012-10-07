"use strict";

ig.module(
	'plugins.pixel'
)
.requires(
	'impact.image'
)
.defines(function () {

// Impact.JS PixelManipulation plugin.  
// (c) 2012 Oscar Hinton.  
// Licensed under MIT.  

// Example Usage
// -------------

//     var image = new ig.Image('path');
//     var px = new PixelManipulation(image);
//     var imageData = pix.getImageData();
//
//     var p = imageData.data;
//     
//     for (var i = 0; i < p.length; i += 4) {
//
//         // Multiply
//         p[i  ] = this.color.r / 255 * p[i];   // Red
//         p[i+1] = this.color.g / 255 * p[i+1]; // Green
//         [i+2] = this.color.b / 255 * p[i+2]; // Blue
//     }
//
//     pix.setImageData(imageData);
//     image = pix.getImage();
//

window.PixelManipulation = ig.Class.extend({

	canvas: null,
	context: null,

	init: function(image) {
		this.canvas = document.createElement('canvas');
		this.canvas.width = image.width;
		this.canvas.height = image.height;

		this.context = this.canvas.getContext('2d');

		this.context.drawImage(image.data, 0, 0);
	},

	getImageData: function() {
		return this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
	},

	setImageData: function(imageData) {
		this.context.putImageData(imageData, 0, 0);
	},

	// Return a new ig.Image instance with the canvas data as image.
	getImage: function() {
		var cache = ig.nocache;
		ig.nocache = "";
		var image = new ig.Image(this.canvas.toDataURL());
		ig.nocache = cache;

		return image;
	}

});

});