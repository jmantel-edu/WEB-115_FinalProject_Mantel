// Builds previews
class Preview {
    constructor(tja) {

    }
}


// This code borrowed from https://www.delftstack.com/howto/javascript/javascript-read-file-line-by-line/



document.getElementById('file').onchange = function() {
  var file = this.files[0];
  var reader = new FileReader();
  reader.onload = function(progressEvent) {
    console.log(this.result);
  };
  reader.readAsText(file);
};

lineByLine("./songs/#1f1e33.tja");