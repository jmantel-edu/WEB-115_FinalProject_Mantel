// Converter for TJA files

// I aim to support the following note types, as they cover 99% of charts (copied and pasted from the spec)
/*
0 - Blank, no note.
1 - Don.
2 - Ka.
3 - DON (Big).
4 - KA (Big).
5 - Drumroll. Should end with an 8.
6 - DRUMROLL (Big). Should end with an 8.
7 - Balloon. Should end with an 8.
8 - End of a balloon or drumroll.
*/
// There are extra types of notes but as mentioned earlier they are generally quite uncommon

// Definition of classes

class Song {
    constructor(tja) {
        this.rawTJA = tja; 
        // rawTJA is an array preprocessed by the line splitter in preview.js. 
        // No other modification is performed there other than splitting the file into each line
        this.title = "Untitled Song";
        this.subtitle = "";
        this.bpm = 120; // Measures / Sign * 4; where Measures is the amt of measures per min and Sign is the time sig
        this.offset = 0; // Offset to account for silence / filler at the beginning of an audio file to ensure song begins on beat
        this.genre = "";
        this.charter = "";
        this.headscroll = 1;
        this.lyrics; // STRETCH GOAL: Lyrics are WebVTT files. Implement a preexisting WebVTT parser from the internet to read and render lyrics. https://github.com/w3c/webvtt.js/
    }

    parseTJAHeaders() {
        // The structure of this was mostly referenced from the Python script I used to create charts in my midterm project
        let tja = this.rawTJA;

        for (let i = 0; i < tja.length; i++) {

            var lineIsHeader = false; // Flag that if true will continue to next iteration before trying to process line as notes
            var line = tja[i];
            try {
                var next = tja[i+1];
            } catch(error) {
                // --
            }

        // Metadata parsing
        
        switch(true) {
            // Title
            case line.startsWith("TITLE:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.title = line.replace("TITLE:", "");
                break;
            // Subtitle
            case line.startsWith("SUBTITLE:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.subtitle = line.replace("SUBTITLE:", "");
                break;
            // BPM
            case line.startsWith("BPM:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.bpm = parseInt(line.replace("BPM:", ""));
                break;
            // Offset
            case line.startsWith("OFFSET:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.offset = parseFloat(line.replace("OFFSET:", "")) * 1000;
                break;
            // Genre
            case line.startsWith("GENRE:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.genre = line.replace("GENRE:", "");
                break;
            // Charter
            case line.startsWith("MAKER:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.charter = line.replace("MAKER:", "");
                break;
            // Headscroll
            case line.startsWith("HEADSCROLL:"):
                console.log(`Analyzed line: ${line}`)
                lineIsHeader = true;
                this.headscroll = parseFloat(line.replace("HEADSCROLL:", ""));
                break;
            
            }
        }
    }

}

class Chart extends Song {
    constructor(tja, difficulty) {
        super(tja);
        this.difficulty = difficulty; // Values: "Easy", "Normal", "Hard", "Oni", "Edit"
    }

    parseTJAChart() {
        let offset = this.offset;
        let bpm = this.bpm;
        let rt = offset
        let scrollSpeed = this.headscroll;
        let timesig = 1;
        let tja = this.rawTJA;

        // ms/measure = (60000 * 4 * timesig) / BPM
        let msPerMeasure = (60000 * 4 * timesig) / bpm;
        // ms between notes = ms/measure / notes_in_measure
        // Equal to ms/measure if there are no notes in the measure.
        let msBetweenNotes;

        // Checking if the headers indicating the start of the chart representing the Chart.difficulty have been found, otherwise chart data will not be read
        let foundDiff = false;
        let started = false;
        let ended = false;
        let balloons = [];
        let balloonIndex = 0;

        // This chart parsing only
        for (let i = 0; i < tja.length; i++) {
            var lineIsHeader = false; // Flag that if true will continue to next iteration before trying to process line as notes
            var line = tja[i];
            try {
                var next = tja[i+1];
            } catch(error) {
                // --
            }

            if (line.toLowerCase() == `COURSE:${this.difficulty}`.toLowerCase()) {
                foundDiff = i;
            }
            if (line.startsWith("BALLOON:")) {
                balloons = line.replace("BALLOON:", "").split(",")
            }
            if (foundDiff != false && line=="#START") {
                started = i;
            }
            if (foundDiff != false && line=="#END") {
                ended = i;
            }
            
        }

        // Actual content parsing
        for (let i = started; i < ended; i++) { // i starts at the #START header and ends at the #END header as detected in the previous For loop
            var lineIsHeader = false; // Flag that if true will continue to next iteration before trying to process line as notes
            var line = tja[i];
            try {
                var next = tja[i+1];
            } catch(error) {
                // --
            }

            var measure = [];
            var overflow = -1; // Used for measures spanning multiple lines
            do {
                console.log(tja[i+overflow+1])
                measure.concat(tja[i+overflow+1]);
                console.log(measure[overflow])
                overflow += 1
            } while (measure[-1].endsWith(","))


            // Actually parsing some notes for real this time. Sorry for any fake-outs
            for (let j in measure) { // Beat in Measure
                let msPerMeasure = (60000 * 4 * timesig) / bpm; // Recalculate the msPerMeasure
                if (measure.trim() == ",") { // Used for empty measures when there's only a comma
                    rt += msPerMeasure;
                    break;
                }
                if (measure.trim() == "") { // For empty lines; these lines have no significance and can be skipped
                    break;
                }
                const char = measure[j];
                switch (char) {
                    /*
                        0 - Blank, no note.
                        1 - Don.
                        2 - Ka.
                        3 - DON (Big).
                        4 - KA (Big).
                        5 - Drumroll. Should end with an 8.
                        6 - DRUMROLL (Big). Should end with an 8.
                        7 - Balloon. Should end with an 8.
                        8 - End of a balloon or drumroll.
                    */
                    case "1":
                        this.chart.push(new Don(rt, bpm, scrollSpeed, false));
                        console.log("Added new Don");
                        break;
                    case "2":
                        this.chart.push(new Ka(rt, bpm, scrollSpeed, false));
                        console.log("Added new Ka");
                        break;
                    case "3":
                    case "A":
                        this.chart.push(new Don(rt, bpm, scrollSpeed, true))
                        console.log("Added new big Don");
                        break;
                    case "4":
                    case "B":
                        this.chart.push(new Ka(rt, bpm, scrollSpeed, true));
                        console.log("Added new big Ka")
                        break;
                    case "5":
                        this.chart.push(new HeadRoll(rt, bpm, scrollSpeed, false));
                        console.log("Added new Drumroll");
                        break;  
                    case "6":
                        this.chart.push(new HeadRoll(rt, bpm, scrollSpeed, true));
                        console.log("Added new big Drumroll");
                        break;
                    case "7":
                    case "9":
                        this.chart.push(new Balloon(rt, bpm, scrollSpeed, balloons[balloonIndex]));
                        balloonIndex++;
                        console.log("Added new Balloon");
                        break;
                    case "8":
                        this.chart.push(new EndRoll(rt, bpm, scrollSpeed))
                        break;

                    if (j.startsWith("#")) {
                        if (j.startsWith("#SCROLL")) {
                            scrollSpeed = parseFloat(j.replace("#SCROLL ", ""))
                            lineIsHeader = true;
                        }
                        if (line.startsWith("#MEASURE")) {
                            timesig = eval(j.replace("#MEASURE ", ""))
                            lineIsHeader = true;
                        }
                    }

                }
                rt += msPerMeasure / (j.length - 1); // Comma at end denotes end of measure
            }

        }
    }
}

class Note {
    constructor(timing, bpmAtNote, isBig) {
        this.timing; // ms at which the note should be hit
        this.bpmAtNote; // The BPM of the song at the time the note should be hit
        this.speed = 1; // Scroll speed of this note
        this.isBarLine = false; 
        // Visual-only lines used to separate measures, but sometimes charters like to have fun with them. 
        // Only enabled in Barline notes.
        this.isBig;
        // Some notes are big and can be hit with both drumsticks for extra points 
        // (alternatively on the arcade cabinet, strongly with one stick). 
        // No plans to implement hitting both sides for extra points in this player.
    }
}

class Don extends Note {
    constructor(timing, bpmAtNote, speed, isBig) {
        super(timing, bpmAtNote, isBig);
        this.timing = timing;
        this.bpm = bpmAtNote;
        this.scrollSpeed = speed;
        this.isBig = isBig;
        this.type = "don";
    }
}

class Ka extends Note {
    constructor(timing, bpmAtNote, speed, isBig) {
        super(timing, bpmAtNote, isBig);
        this.timing = timing;
        this.bpm = bpmAtNote;
        this.scrollSpeed = speed;
        this.isBig = isBig;
        this.type = "ka";
    }
}

class HeadRoll extends Note {
    constructor(timing, bpmAtNote, speed, isBig) {
        super(timing, bpmAtNote, isBig);
        this.timing = timing;
        this.bpm = bpmAtNote;
        this.scrollSpeed = speed;
        this.isBig = isBig;
        this.type = "headroll"
    }
}

class Balloon extends Note {
    constructor(timing, bpmAtNote, speed, goal) {
        super(timing, bpmAtNote);
        this.timing = timing;
        this.bpm = bpmAtNote;
        this.scrollSpeed = speed;
        this.isBig = false; // Balloons cannot be big
        this.goal = goal;
        this.type = "balloon";
    }
}

class EndRoll extends Note {
    constructor(timing, bpmAtNote, speed) {
        super(timing, bpmAtNote, isBig)
        this.timing = timing;
        this.bpm = bpmAtNote;
        this.scrollSpeed = speed;
        this.isBig = isBig;
        this.type = "endroll";
    }
}

class Barline extends Note { // STRETCH GOAL: Create and implement Barlines
    constructor() {
        super()
        this.isBarLine = true;
    }
}

document.getElementById("ura").addEventListener("click", function () {
    console.log("Load Song pressed");
    mySong.parseTJAHeaders();
    myChart = new Chart(mySong.rawTJA, "Edit");
    myChart.parseTJAChart();
} )
document.getElementById("oni").addEventListener("click", function () {
    console.log("Load Song pressed");
    mySong.parseTJAHeaders();
    myChart = new Chart(mySong.rawTJA, "Oni");
    myChart.parseTJAChart();
} )
document.getElementById("hard").addEventListener("click", function () {
    console.log("Load Song pressed");
    mySong.parseTJAHeaders();
    myChart = new Chart(mySong.rawTJA, "Hard");
    myChart.parseTJAChart();
} )
document.getElementById("normal").addEventListener("click", function () {
    console.log("Load Song pressed");
    mySong.parseTJAHeaders();
    myChart = new Chart(mySong.rawTJA, "Normal");
    myChart.parseTJAChart();
} )
document.getElementById("easy").addEventListener("click", function () {
    console.log("Load Song pressed");
    mySong.parseTJAHeaders();
    myChart = new Chart(mySong.rawTJA, "Easy");
    myChart.parseTJAChart();
} )