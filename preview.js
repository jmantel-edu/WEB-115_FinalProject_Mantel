// Builds previews
class Preview {
    constructor(tja) {
      this.tja = tja

      this.easy = undefined
      this.normal = undefined
      this.hard = undefined
      this.oni = undefined // Also called Extreme difficulty
      this.ura = undefined // Also called Purple Extreme / Reverse Extreme difficulty

      for (let i = 0; i < this.tja.length; i++) {
				let line = this.tja[i]
				try {
					var next = this.tja[i+1]
				} catch(error) {
					// Don't do anything
				}
				
        // Configure Difficulty Levels
        switch(line.trim()) {
          case "COURSE:Oni":
						next = next.replace("LEVEL:", "");
						this.oni = parseInt(next);
					case "COURSE:Hard":
						next = next.replace("LEVEL:", "");
						this.hard = parseInt(next);
					case "COURSE:Normal":
						next = next.replace("LEVEL:", "");
						this.normal = parseInt(next);
					case "COURSE:Easy":
						next = next.replace("LEVEL:", "");
						this.easy = parseInt(next);
					case "COURSE:Ura":
						next = next.replace("LEVEL:", "");
						this.ura = parseInt(next);
        }
      }
			this.preview = `<h3 class="title"></h3>
        <div class="difficultyHolder">
            <p class="easy">${this.easy}</p>
            <p class="normal">${this.normal}</p>
            <p class="hard">${this.hard}</p>
            <p class="oni">${this.oni}</p>
            <p class="ura">${this.ura}</p>
        </div>`
    }

		renderPreview() {
			document.getElementById("preview").innerHTML = this.preview;
		}
}

let chart = [];

// This code borrowed from https://www.delftstack.com/howto/javascript/javascript-read-file-line-by-line/

let tjaDebugDisplay = document.getElementById("myTJA")
document.getElementById('uploadTJA').onchange = function() {
  tjaDebugDisplay.innerHTML = "";
  
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent) {
    var fileContentArray = this.result.split(/\r\n|\n/);
    for (var line = 0; line < fileContentArray.length - 1; line++) {
      chart.push(fileContentArray[line]);
    }
    myPreview = new Preview(chart)
		tjaDebugDisplay.innerHTML = fileContentArray.join("<br>")
  };
  reader.readAsText(file);
};

var myPreview;
