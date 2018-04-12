# js-musical-notation
A parser for notating music and converting it into actions. Under construction and note fully useable.

~~~~

var piece = JsMusicalPiece.create({
	mm : 120,
	ts : '3/4'
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

console.log(tracks)

~~~~