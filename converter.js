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
        this.title;
        this.subtitle;
        this.bpm; // Measures / Sign * 4; where Measures is the amt of measures per min and Sign is the time sig
        this.offset; // Offset to account for silence / filler at the beginning of an audio file to ensure song begins on beat
        this.genre;
        this.charter;
        this.balloons; // Balloon goals are predefined in the BALLOON: header at the beginning of the file
        this.lyrics; // STRETCH GOAL: Lyrics are WebVTT files. Implement a preexisting WebVTT parser from the internet to read and render lyrics. https://github.com/w3c/webvtt.js/

    }

    parseTJA() {
        let bpm = this.bpm;
        let timing = this.offset;
        let tja = this.tja;

        for (let i = 0; i < tja.length; i++) {

        }
    }
}

class Chart extends Song {
    constructor() {
        this.difficulty; // Values: "Easy", "Normal", "Hard", "Oni", "Ura"       
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