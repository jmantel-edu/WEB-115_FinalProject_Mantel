// Builds previews
class Preview {
    constructor(tja) {
      this.tja = tja

      this.title = undefined;

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
					// Prevent erroring out when accessing an index out of bounds while inspecting the last line
				}
				
        // Configure Difficulty Levels
        switch(line.trim()) {
          case "COURSE:Oni":
						next = next.replace("LEVEL:", "");
						this.oni = parseInt(next);
            break;
					case "COURSE:Hard":
						next = next.replace("LEVEL:", "");
						this.hard = parseInt(next);
            break;
					case "COURSE:Normal":
						next = next.replace("LEVEL:", "");
						this.normal = parseInt(next);
            break;
					case "COURSE:Easy":
						next = next.replace("LEVEL:", "");
						this.easy = parseInt(next);
            break;
					case "COURSE:Edit": // For Ura
						next = next.replace("LEVEL:", "");
						this.ura = parseInt(next);
            break;
        }

        if (line.includes("TITLE:") && this.title == undefined) {
          this.title = line.replace("TITLE:", "");
        }
      }
			this.preview = `<h3 class="title">${this.title}</h3>
        <div class="difficultyHolder">
            <p class="easy">${this.easy == undefined ? "--" : this.easy}</p>   
            <p class="normal">${this.normal == undefined ? "--" : this.normal}</p>   
            <p class="hard">${this.hard == undefined ? "--" : this.hard}</p>   
            <p class="oni">${this.oni == undefined ? "--" : this.oni}</p>   
            <p class="ura">${this.ura == undefined ? "--" : this.ura}</p>   
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
    mySong = new Song(chart);
		tjaDebugDisplay.innerHTML = fileContentArray.join("<br>")
    myPreview.renderPreview();
  };
  reader.readAsText(file);
};

var myPreview;
var mySong;
