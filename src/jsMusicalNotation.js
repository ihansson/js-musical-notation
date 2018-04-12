'use strict';

(function() {

    window.JsMusicalPiece = {

        raw: [],
        actions: [],

        create: function(options) {
            const piece = Object.create(this)
            piece.timePerQuarterNote = options.timePerQuarterNote
            return piece
        },

        createTracks: function(tracks) {
            const piece = this;
            tracks.forEach(function(track) {
                piece.raw.push(track)
                try {
                    let actions = piece.createTrackAction(track)
                    if(actions.length) piece.actions = piece.actions.concat(actions)
                } catch (e) {
                    console.log('Error parsing track | ', e, " | TRACK: " + track)
                }
            })
            return this.actions
        },

        createTrackAction: function(track) {

            const piece = this
            const pitchInformation = this.extractPitchInformationFromTrack(track)
            const measures = this.extractMeasureInformationFromTrack(track)
            let actions = [];
            let measureStartTime = 0

            measures.forEach(function(measure, index) {
                measureStartTime = index * (piece.timePerQuarterNote * 4)
                measure.forEach(function(notationCharacter) {

                    const modifier = notationCharacter[1]
                    const number = parseInt(notationCharacter[0])

                    if (!is_valid_notation_number(number)) {
                        throw 'Invalid notation number "' + number + '"';
                    }
                    const duration = (piece.timePerQuarterNote * 4) / number
                    let pitch = pitchInformation.pitch
                    if (modifier) {
                        if (modifier === 'w') {
                            return measureStartTime += duration
                        } else if(modifier === '#'){
                            pitch = shiftFrequencyPitch(pitch, 1)
                        } else if(modifier === 'b'){
                            pitch = shiftFrequencyPitch(pitch, -1)
                        } else {
                            throw 'Invalid notation modifier "' + modifier + '"';
                        }
                    }
                    actions.push({
                        pitch: pitch,
                        startTime: measureStartTime,
                        duration: duration
                    })
                    measureStartTime += duration
                })
            })

            return actions

        },

        extractPitchInformationFromTrack: function(track) {

            let toneLetter = track[0].toLowerCase()
            const octaveNumber = parseInt(track[1])
            const modifier = track[2]

            if (!is_valid_tone(toneLetter)) {
                throw 'First character of track is not a tone letter. E.g C';
            }
            if (!is_valid_octave(octaveNumber)) {
                throw 'Second character of track is not a valid Octave. 1-8';
            }
            if (!(is_space(modifier) || is_valid_modifier(modifier))) {
                throw 'Third character of track is not a valid modifier. Empty string or #, b';
            }
            if (!is_space(modifier)) {
                toneLetter += modifier
            }

            return {
                tone: toneLetter,
                octave: octaveNumber,
                pitch: calculateFrequencyFromLetter(toneLetter, octaveNumber),
            }

        },

        extractMeasureInformationFromTrack: function(track) {

            let measures = []
            let startingIndex = track.indexOf('~')
            track = track.substr(startingIndex + 1, track.length)

            if (startingIndex === -1) {
                throw 'No measure start character found. "~" Should be present';
            }

            let nextMeasureIndex = track.indexOf('-')

            while (nextMeasureIndex !== -1) {
                let measure = track.substr(0, nextMeasureIndex);
                measures.push(cleanArray(measure.split(" ")))
                track = track.substr(nextMeasureIndex + 1, track.length)
                nextMeasureIndex = track.indexOf('-')
            }

            return measures;

        }

    }

    // Track validation helpers

    function is_valid_notation_number(str) {
        return [1, 2, 3, 4].indexOf(str) !== -1;
    }

    function is_valid_tone(str) {
        return ["a", "b", "c", "d", "e", "f", "g"].indexOf(str) !== -1;
    }

    function is_valid_octave(str) {
        return [1, 2, 3, 4, 5, 6, 7, 8].indexOf(str) !== -1;
    }

    function is_space(str) {
        return str === ' ';
    }

    function is_valid_modifier(str) {
        return ["#", "b"].indexOf(str) !== -1;
    }

    function cleanArray(actual) {
        var newArray = new Array();
        for (var i = 0; i < actual.length; i++) {
            if (actual[i]) {
                newArray.push(actual[i]);
            }
        }
        return newArray;
    }

    // Pitch helpers

    const semiTone = 1.059463094359

    function getLetterDistanceFromA(letter) {

        const letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#']
        const singleLetter = letter[0]

        let modifier = letter[1]

        if (modifier === '#') modifier = 1;
        else if (modifier === 'b') modifier = -1;
        else modifier = 0

        return letters.indexOf(singleLetter) + modifier

    }

    function shiftFrequencyOctave(freq, octave) {
        return freq * Math.pow(semiTone, octave * 12)
    }

    function shiftFrequencyPitch(freq, steps) {
        return freq * Math.pow(semiTone, steps)
    }

    function calculateFrequencyFromLetter(letter, octave) {
        const distance = getLetterDistanceFromA(letter.replace(/[0-9]/g, ''))
        let freq = 440 * Math.pow(semiTone, distance)

        if (octave) {
            freq = shiftFrequencyOctave(freq, octave - 4)
        }
        return freq
    }

}());