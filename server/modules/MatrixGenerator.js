var config = {
    w: 10,
    h: 10,
    words: ['dog', 'bear', 'foot', 'memories', 'day', 'yoga', 'Ohio', 'oxford', 'rockford', 'PC']
};

module.exports.createPuzzle = function createPuzzle(config) {
    var puzzle = [];
    var placedWords = [];
    const abc = 'abcdefghijklmnopqrstuvwxyz';
    const bgabc = 'абвгдежзийклмнопрстуфхцчшщюя';
    // Create the empty puzzle
    for (var i = 0; i < config.w; i++) {
        puzzle.push([]);
        for (var j = 0; j < config.h; j++) {
            puzzle[i].push(' ');
        }
    }

    // Try to place each word in the puzzle
    for (var i = 0; i < config.words.length; i++) {
        if (placeInPuzzle(config.words[i], puzzle, config) === false) {
            console.log(config.words[i] + ' was not placed!');
            // Skip the word if it wasn't placed in the puzzle
            continue;
        }
        placedWords.push(config.words[i]);
    }

    if (config.fill === true) {
        var isEng = abc.indexOf(config.words[0][0]);
        if (isEng !== -1) {
            // fill with eng letters
            for (var i = 0; i < puzzle.length; i++) {
                for (var j = 0; j < puzzle[i].length; j++) {
                    if (puzzle[i][j] === ' ') {
                        puzzle[i][j] = abc[Math.floor(Math.random() * abc.length)];
                    }
                }
            }
        } else {
            // fill with bg letters
            for (var i = 0; i < puzzle.length; i++) {
                for (var j = 0; j < puzzle[i].length; j++) {
                    if (puzzle[i][j] === ' ') {
                        puzzle[i][j] = bgabc[Math.floor(Math.random() * bgabc.length)];
                    }
                }
            }
        }
    }

    return { puzzle: puzzle, placedWords: placedWords };
}

function placeInPuzzle(word, puzzle, config) {
    // Find all possible locations in the puzzle
    var possibleLocations = findPossibleLocations(word, puzzle, config);

    if (possibleLocations.length === 0) {
        return false;
    }

    // Randomly choose location
    var location = possibleLocations[Math.floor(Math.random() * possibleLocations.length)];
    var wordIndex = 0;

    // Place the word
    if (location.hor) {
        for (var i = 0; i < word.length; i++) {
            puzzle[location.row][location.col + i] = word[i];
        }
    } else {
        for (var i = 0; i < word.length; i++) {
            puzzle[location.row + i][location.col] = word[i];
        }
    }

    return true;
}

function findPossibleLocations(word, puzzle, config) {
    var locations = [];

    // If the word cannot fit in the matrix
    if (word.length > config.h || word.length > config.w) {
        return locations;
    }

    // Check if word can fit somewhere in a row
    for (var row = 0; row < puzzle.length; row++) {
        var usedSpots = findUsedSpots(puzzle[row]);
        if (usedSpots.length === 0) {
            locations.push({ row: row, col: 0, hor: true });
            continue;
        }
        for (var spot = 0; spot < usedSpots.length; spot++) {
            var previousSpot = usedSpots[spot - 1] || 0;
            var wordCanFit = fitWordBeforeSpot(word.length, usedSpots[spot], previousSpot);
            if (wordCanFit === true) {
                locations.push({ row: row, col: usedSpots[spot] - word.length, hor: true });
            }
        }
    }

    // Extract the columns with their elements
    var cols = [];
    for (var col = 0; col < puzzle.length; col++) {
        var column = [];
        for (var row = 0; row < puzzle.length; row++) {
            column.push(puzzle[row][col]);
        }
        cols.push(column);
    }
    // Check if word can fit somewhere in a col
    for (var col = 0; col < cols.length; col++) {
        var usedPlacesInCol = findUsedSpots(cols[col]);
        if (usedPlacesInCol.length === 0) {
            locations.push({ row: 0, col: col, hor: false });
            continue;
        }
        for (var pos = 0; pos < usedPlacesInCol.length; pos++) {
            var previousPos = usedPlacesInCol[pos - 1] || 0;
            var wordCanFit = fitWordBeforeSpot(word.length, usedPlacesInCol[pos], previousPos);
            if (wordCanFit === true) {
                locations.push({ row: usedPlacesInCol[pos] - word.length, col: col, hor: false });
            }
        }
    }

    return locations;
}

function findUsedSpots(row) {
    var usedSpotsIndexes = [];
    for (var cell = 0; cell < row.length; cell++) {
        if (row[cell] !== ' ') {
            usedSpotsIndexes.push(cell);
        }
    }
    return usedSpotsIndexes;
}

function fitWordBeforeSpot(wordLength, spotIndex, previousSpotIndex) {
    if (!previousSpotIndex) {
        return wordLength < (spotIndex - 1); // ??
    }

    return ((spotIndex - previousSpotIndex) - 1) >= wordLength;
}