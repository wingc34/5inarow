// const size = 10

// let arr = [
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,2,2,2,2,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,1,0,0,0,0,0],
//     [0,0,0,0,1,0,0,0,0,0],
//     [0,0,0,0,1,0,0,1,0,0],
//     [0,0,0,0,1,0,0,1,0,0],
//     [0,0,0,0,0,0,0,1,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0]
// ]

// let score = [
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
//     [0,0,0,0,0,0,0,0,0,0],
// ]



function checkAdjacent5(playerChar) {
    let match = false

    for(let i = 0; i < chessBoardSize; i++) {
        for(let j = 0; j < chessBoardSize; j++) {

            let isRowMatch = i <= 10 &&
                            chessBoardMatrix[i][j] === playerChar && 
                            chessBoardMatrix[i + 1][j] === playerChar && 
                            chessBoardMatrix[i + 2][j] === playerChar && 
                            chessBoardMatrix[i + 3][j] === playerChar && 
                            chessBoardMatrix[i + 4][j] === playerChar
            let isColMatch = j <= 10 && 
                            chessBoardMatrix[i][j] === playerChar &&
                            chessBoardMatrix[i][j + 1] === playerChar &&
                            chessBoardMatrix[i][j + 2] === playerChar &&
                            chessBoardMatrix[i][j + 3] === playerChar &&
                            chessBoardMatrix[i][j + 4] === playerChar
            let isDigNMatch = i <= 10 && j <= 10 &&
                            chessBoardMatrix[i][j] === playerChar &&
                            chessBoardMatrix[i + 1][j + 1] === playerChar &&
                            chessBoardMatrix[i + 2][j + 2] === playerChar &&
                            chessBoardMatrix[i + 3][j + 3] === playerChar &&
                            chessBoardMatrix[i + 4][j + 4] === playerChar

            let isDigPMatch = i >= 4 && j <= 10 &&
                            chessBoardMatrix[i][j] === playerChar &&
                            chessBoardMatrix[i - 1][j + 1] === playerChar &&
                            chessBoardMatrix[i - 2][j + 2] === playerChar &&
                            chessBoardMatrix[i - 3][j + 3] === playerChar &&
                            chessBoardMatrix[i - 4][j + 4] === playerChar
            
            if(isRowMatch || isColMatch || isDigNMatch || isDigPMatch) {
                match = true
            }

        }
    }
    return match
}

function checkAdjacent4(row, col, turn) {
    let match = false

    for(let i = 0; i < size; i++) {
        for(let j = 0; j < size; j++) {

            let isRowMatch = j < 7 && arr[i][j] === turn && arr[i][j+1] === turn && arr[i][j+2] === turn && arr[i][j+3] === turn
            let isRowInclude = i === row && (j === col || j + 1 === col || j + 2 === col || j + 3 === col)

            let isColMatch = i < 7 && arr[i][j] === turn && arr[i+1][j] === turn && arr[i+2][j] === turn && arr[i+3][j] === turn 
            let isColInclude = j === col && (i === row || i + 1 === row || i + 2 === row || i + 3 === row)

            let isDigNMatch = i < 7 && j < 7 && arr[i][j] === turn && arr[i+1][j+1] === turn && arr[i+2][j+2] === turn && arr[i+3][j+3] === turn 
            let isOblInclude = i === row && j === col || i + 1 === row && j + 1 === col || i + 2 === row && j + 2 === col || i + 3 === row && j + 3 === col

            if(isRowMatch && isRowInclude) {
                match = true
            }

            if(isColMatch && isColInclude) {
                match = true
            }

            if(isDigNMatch && isOblInclude) {
                match = true
            }

        }
    }

    return match
}

function calculate(row, col, playerChar) {
    let index;
    /*
        Scores
        9: adjacent 5 (Me)
        8: adjacent 4 (Me)
        7: cross adjacent 3 (You)
        6: adjacent 3 (You)
        5: adjacent 3 (Me)
        4: adjacent 2 (Me)
        3: random
    */

    //anticipate next step
    //arr[row][col] = playerChar

    if(checkAdjacent5(playerChar) && chessBoardScore[row][col] < 9) {
        chessBoardScore[row][col] = 9
    }

    // if(checkAdjacent4(row, col, 1) && score[row][col] < 8) {
    //     score[row][col] = 8
    // }

    //remove the anticipated step
   // arr[row][col] = 0
   return index
}

function AIMoveTurn(){
    for(let i = 0; i < chessBoardSize; i++) {
        for(let j = 0; j < chessBoardSize; j++) {
            
            if(arr[i][j] !== 'N') {
                chessBoardScore[i][j] = 0
            } else {
                calculate(i, j, 'B')
            }
    
        }
    }
    console.log("AI moving");
}

