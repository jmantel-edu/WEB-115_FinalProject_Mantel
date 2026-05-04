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
        this.parsedTJA; 
        this.title = "Untitled Song";
        this.subtitle = "";
        this.bpm = 120; // Measures / Sign * 4; where Measures is the amt of measures per min and Sign is the time sig
        this.offset = 0; // Offset to account for silence / filler at the beginning of an audio file to ensure song begins on beat
        this.genre = "";
        this.charter = "";
        this.headscroll = 1;
        this.balloons; // Balloon goals are predefined in the BALLOON: header at the beginning of the file
        this.lyrics; // STRETCH GOAL: Lyrics are WebVTT files. Implement a preexisting WebVTT parser from the internet to read and render lyrics. https://github.com/w3c/webvtt.js/
    }

    parseTJAHeaders() {
        // The structure of this was mostly referenced from the Python script I used to create charts in my midterm project
        let tja = this.tja;

        for (let i = 0; i < tja.length; i++) {
            var lineIsHeader = false; // Flag that if true will continue to next iteration before trying to process line as notes
            var line = tja[i];
            try {
                var next = tja[i+1];
            } catch(error) {
                // --
            }

        // Metadata parsing
        switch(line.trim()) {
            // Title
            case line.startsWith("TITLE:"):
                lineIsHeader = true;
                this.title = line.replace("TITLE:", "");
                break;
            // Subtitle
            case line.startsWith("SUBTITLE:"):
                lineIsHeader = true;
                this.subtitle = line.replace("SUBTITLE:", "");
                break;
            // BPM
            case line.startsWith("BPM:"):
                lineIsHeader = true;
                this.bpm = parseInt(line.replace("BPM:", ""));
                break;
            // Offset
            case line.startsWith("OFFSET:"):
                lineIsHeader = true;
                this.offset = parseFloat(line.replace("OFFSET:", ""));
                break;
            // Genre
            case line.startsWith("GENRE:"):
                lineIsHeader = true;
                this.genre = line.replace("GENRE:", "");
                break;
            // Charter
            case line.startsWith("MAKER:"):
                lineIsHeader = true;
                this.charter = line.replace("MAKER:", "");
                break;
            // Headscroll
            case line.startsWith("HEADSCROLL:"):
                lineIsHeader = true;
                this.headscroll = parseFloat(line.replace("HEADSCROLL:", ""));
                break;
            // Lyrics

            }
        }
    }

}

class Chart extends Song {
    constructor() {
        this.difficulty; // Values: "Easy", "Normal", "Hard", "Oni", "Ura"
        this.chart = []
    }

    parseTJAChart() {
        let bpm = this.bpm;
        let offset = this.offset;
        let rt = offset*1000

        // Checking if the headers indicating the start of the chart representing the Chart.difficulty have been found, otherwise chart data will not be read
        let foundDiff = false;
        let started = false;

        for (let i = 0; i < tja.length; i++) {
            var lineIsHeader = false; // Flag that if true will continue to next iteration before trying to process line as notes
            var line = tja[i];
            try {
                var next = tja[i+1];
            } catch(error) {
                // --
            }

            
        }
    }
}

class Note {
    constructor() {
        this.timing;
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
    constructor() {

    }
}

class Ka extends Note {
    constructor() {

    }
}

class Roll extends Note {
    constructor() {

    }
}

class Balloon extends Note {
    constructor() {
        super()
        this.isBig = false; // Balloons cannot be big
    }
}

class Barline extends Note { // STRETCH GOAL: Create and implement Barlines
    constructor() {
        super()
        this.isBarLine = true;
    }
}