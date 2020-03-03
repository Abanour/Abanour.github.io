function Spectrum(){
	this.name = "spectrum";

	//Drawing method
	this.draw = function(){
		push();
		var spectrum = fourier.analyze();
		noStroke();
		
		//Normal bars fixed horizontally
		for (var i = 0; i< spectrum.length; i++){
			fill(spectrum[i], 255 - spectrum[i], 0);
			var x = map(i, 0, spectrum.length, 0, width);
			var h = -width + map(spectrum[i], 0, 255, width, 0);
			rect(0, x, -h, height / spectrum.length);
  		}
	
		pop();
	};
}
