//global for the controls and input 
var controls = null;
//store visualisations in a container
var vis = null;
//variable for the p5 sound object
var sound = null;
//Default music preloaded
var defaultMusic = 'darixtogni-DigiGAlessio';
//variable for p5 fast fourier transform
var fourier;
//Music menu
var mMenu = null;

function preload() {
	sound = loadSound('assets/' + defaultMusic + '.mp3');
}

function setup() {
	createCanvas(windowWidth, windowHeight);
	background(0);

	controls = new ControlsAndInput();

	//instantiate the fft object
	fourier = new p5.FFT();

	//create a new visualisation container and add visualisations
	vis = new Visualisations();
	vis.add(new Spectrum());
	vis.add(new WavePattern());
	vis.add(new Needles());

	//Additional visualisers added
	vis.add(new TimeWarp());
	vis.add(new Plasma());
	vis.add(new Smiley());

	//instance of music menu created once
	mMenu = new musicMenu();

	//Music file names added to the array of musics
	mMenu.add("darixtogni-DigiGAlessio");
	mMenu.add("deadmau5Suckfest9001");
	mMenu.add("FluxPavilion-ICantStop");

}

function draw() {
	background(0);
	// draw the selected visualisation  
	vis.selectedVisual.draw();

	// draw the controls on top.
	controls.draw();

}

//Mouse clicking events
function mouseClicked() {
	controls.mousePressed();
}

//Key pressing events
function keyPressed() {
	controls.keyPressed(keyCode);
}

//when the window has been resized. Resize canvas to fit 
//if the visualisation needs to be resized call its onResize method
function windowResized() {
	resizeCanvas(windowWidth, windowHeight);
	if (vis.selectedVisual.hasOwnProperty('onResize')) {
		vis.selectedVisual.onResize();
	}
}
