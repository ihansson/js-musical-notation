# js-musical-notation
A parser for notating music and converting it into actions. Under construction and not fully useable.

~~~~
var piece = JsMusicalPiece.create({
	timePerQuarterNote : 0.2
});

var tracks = piece.createTracks([
	'c5  ~',
	'b5  ~ 3 3 3  -',
	'a5  ~ 4      -',
	'g4  ~ 1      - - - - - - -',
	'f4# ~ 2   2  - - - - - - -',
	'e4# ~ 2#  2b - - - - - - -',
	'd4  ~ 4 4 2  - - - - - - -',
	'c4# ~ 2w  2  - - - - - - -',
	'b4  ~ 1w     - - - - - - -',
	'a4  ~ 1w     - - - - - - -',
	'g3  ~',
	'f3  ~',
	'e3  ~'
]);
~~~~

Parses into data containing the pitch, startTime, duration

~~~~
0:{pitch: 987.766602508394, startTime: 0, duration: 0.26666666666666666}
1:{pitch: 987.766602508394, startTime: 0.26666666666666666, duration: 0.26666666666666666}
2:{pitch: 987.766602508394, startTime: 0.5333333333333333, duration: 0.26666666666666666}
3:{pitch: 879.9999999970568, startTime: 0, duration: 0.2}
4:{pitch: 783.9908719613135, startTime: 0, duration: 0.8}
5:{pitch: 739.9888454214125, startTime: 0, duration: 0.4}
6:{pitch: 739.9888454214125, startTime: 0.4, duration: 0.4}
7:{pitch: 739.9888454214125, startTime: 0, duration: 0.4}
8:{pitch: 659.2551138244536, startTime: 0.4, duration: 0.4}
9:{pitch: 587.3295358339967, startTime: 0, duration: 0.2}
10:{pitch: 587.3295358339967, startTime: 0.2, duration: 0.2}
11:{pitch: 587.3295358339967, startTime: 0.4, duration: 0.4}
12:{pitch: 554.3652619531262, startTime: 0.4, duration: 0.4}
~~~~

# Notation How To

~~~~

Letter
 ^
'f4# ~ 2 2 - - - - - - -',

Octave
  ^
'f4# ~ 2 2 - - - - - - -',

Modifier (optional)
   ^
'f4# ~ 2 2 - - - - - - -',

Start Measures
     ^
'f4# ~ 2 2 - - - - - - -',

New Measure
           ^
'f4# ~ 2 2 - - - - - - -',

Note Number (Defines the duration of a note as a fraction of the measure. Can be 1,2,3,4)
       ^
'f4# ~ 2 2 - - - - - - -',

Note Number Modifier (Defines a modifier for a note. The w modifier will wait and not add an action but delay the next note. Can also be # and b to modify the pitch)
        ^
'f4# ~ 2w 2 - - - - - - -',

~~~~