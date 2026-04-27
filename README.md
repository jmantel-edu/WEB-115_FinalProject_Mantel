# Final Project
**WEB-115** Final Project Proposal -- Student: Jordan Mantel
## Overview
This project is a TJA file reader and player. TJA files are chart files for the popular rhythm game Taiko no Tatsujin. The goals are to read and convert .tja chart files -- created in an external chart editor program -- to a JavaScript object that the player can play. 

(Note: A working example of a TJA file player can be found online; the website is named cjdgrevival)
[TJA Format Specification](https://gist.github.com/KatieFrogs/e000f406bbc70a12f3c34a07303eec8b)
## Features
### Primary
* File Converter -- converts .tja files to a format readable by the player
	* Reads measures in the file and creates a Note object for each one
	* Outputs a Chart object with song metadata and chart data
* File Player -- reads Song objects output by the converter
	* Notes placed, correctly timed (or at least as correctly timed as the chart is) and can be hit by the player
* Song Selector -- lists playable songs and available charts
	* Server-hosted / Included songs only
### Stretch Goals
* Allow users to drop and play their own TJA files & audios
* Support more advanced TJA features and interpretations
## Core Requirements Coverage
### If Statements & Loops
* If statements are used to determine the type of note while iterating over the chart content. Also used to determine what type of note hit (center or edge) is made while playing.
* Loops are used to iterate over the list of songs and chart content, and are used for the main game loop in the player.
### Event Listeners
* Event listeners are used to register keypresses in the players, and to play song previews in the song selector when songs are clicked
### DOM element creation
* The song picker dynamically creates elements in the DOM depending on what songs there are available
### Classes and Subclasses
Refer to the tree for a quick overview (Note that more may be added as needed) as to how the project uses classes:
* class **Song**
	* class **Chart** extends Song
	* (Various metadata.)

* class **Note**
	* timing: Number
	* class **Center** extends Note
		* isBig: Boolean -- Some notes in the game are Big Notes and must be hit with both drumsticks
	* class **Rim** extends Note
		* isBig: Boolean
	* class **Drumroll** extends Note
		* isBig: Boolean -- Big drumrolls only affect scoring and no extra action needs to be taken to hit them
	* class **Balloon** extends Note
		* goal: Number -- Goal number must be reached to pop the balloon for a score bonus
	* (Whatever other note types I missed...)

* class **Preview**
	* song: Song -- Automatically creates preview code that may be added to the DOM based on the data in the given Song object