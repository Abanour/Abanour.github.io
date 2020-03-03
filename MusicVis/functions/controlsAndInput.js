//Constructor function to handle the onscreen menu, keyboard and mouse
//controls
function ControlsAndInput() {

	this.menuDisplayed = false;

	this.musicDisplayed = false;

	//playback button displayed in the top left of the screen
	this.playbackButton = new PlaybackButton();

	//Volume controls
	this.volumeControl = new volumeControl();

	//make the window fullscreen or revert to windowed
	this.mousePressed = function () {
		var fs = fullscreen();
		//check if the playback button has been clicked
		//if not make the visualisation fullscreen
		if (this.playbackButton.hitCheck() == false && this.volumeControl.hitCheck() == false) {
			fullscreen(!fs);
		};

		//Volume control
		this.volumeControl.mousePressed();

	};

	//responds to keyboard presses
	//@param keycode the ascii code of the keypressed
	this.keyPressed = function (keycode) {
		if (keycode == 32) {
			this.menuDisplayed = !this.menuDisplayed;
			this.musicDisplayed = !this.musicDisplayed;
		};

		//Finds the key code for the corresponding visual and passes it onto visualiser class
		if (keycode > 48 && keycode < 55) {
			var visNumber = keycode - 49;
			vis.selectVisual(vis.visuals[visNumber].name);
		};

		//Finds the key code for the corresponding music and passes it onto muis menu class
		if (keycode > 54 && keycode < 58) {
			var musNumber = keycode - 49;
			mMenu.getMusic(musNumber);
		};
	};
	
	//draws the playback button and potentially the menu
	this.draw = function () {
		
		push();

		//playback button 
		this.playbackButton.draw();

		//volume buttons
		this.volumeControl.draw();

		

		//When the menu is not displayed and text is displayed
		if (this.menuDisplayed == false && this.musicDisplayed == false) {

			noStroke();
			fill(255, 255, 255, 60)
			textSize(15);
			text("Press space to open up the visuals and music menu", width / 11, height / 30);

		} else {

			stroke(255, 0, 0);

			line(80, 0, 80, 10);

			fill(0, 0, 0, 200);
			rect(80, 10, 450, 350);
			
		}

		fill("white");
		stroke("black");
		strokeWeight(2);
		textSize(17);

		//only draw the menu if menu displayed is set to true.
		if (this.menuDisplayed) {

			text("Select a visualisation:", 100, 30);
			this.menu();

		}

		if (this.musicDisplayed) {
			text("Select a music:", 300, 30);
			this.musMenu();
		}

		pop();

	};

	this.menu = function () {
		//draw out menu items for each visualisation
		for (i = 0; i < vis.visuals.length; i++) {
			if (vis.visuals[i].name == vis.selectedVisual.name) {
				fill(255, 9, 0)
			}
			text(i + 1 + ": " + vis.visuals[i].name, 100, 80 + 50 * i);
			fill(255)
		}
	};

	this.musMenu = function () {
		//draw out menu items for each music
		for (i = 0; i < mMenu.music.length; i++) {
			if (mMenu.music[i] == defaultMusic) {
				fill(255, 9, 0);
			}
			text(i + 7 + ": " + mMenu.music[i], 300, 80 + 50 * i);
			fill(255);
		}
	}
}


