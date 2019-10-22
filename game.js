const chessBoardSize = 15;
let isPVPMode = true;
let player;
let index;
let char;
let isWhiteTurn = true;
let isGameEnd = false;
let chessBoardMatrix = [];
let chessBoardScore = [];


function createChessBoardMatrixnScore() {
    for(let i = 0; i < chessBoardSize; i++) {
        chessBoardMatrix[i] = new Array(chessBoardSize);
        chessBoardScore[i] = new Array(chessBoardSize);
        for(let j = 0; j < chessBoardMatrix[i].length; j++) {
            chessBoardMatrix[i][j] = "N";
            chessBoardScore[i][j] = 0;
        }
    }
    
    console.log('chessBoardMatrix', chessBoardMatrix);
    console.log('chessBoardScore', chessBoardScore);
}

function createChessBoard() {
    //top left corner 
    $(".chessBoard").append(`
        <div class="chessBlock leftTop"></div>
    `);

    // 13 top middle
    for (let i = 0; i < chessBoardSize - 2; i++) {
        $(".chessBoard").append(`
            <div class="chessBlock middleTop"></div>
        `);
    }

    //top right corner
    $(".chessBoard").append(`
        <div class="chessBlock rightTop"></div>
    `);

    //left middle, 13 middle, right,middle
    for (let i = 0; i < chessBoardSize - 2; i++) {
        $(".chessBoard").append(`
            <div class="chessBlock leftMiddle"></div>
        `);
        for (let i = 0; i < chessBoardSize - 2; i++) {
            $(".chessBoard").append(`
            <div class="chessBlock middle">
            </div>`);
        }
        $(".chessBoard").append(`
        <div class="chessBlock rightMiddle">
        </div>`);
    }
    //bottom left corner 
    $(".chessBoard").append(`
    <div class="chessBlock leftBottom">
    </div>`);
    // 13 bottom middle
    for (let i = 0; i < chessBoardSize - 2; i++) {
        $(".chessBoard").append(`
        <div class="chessBlock middleBottom">
        </div>`);
    }
    //bottom right corner
    $(".chessBoard").append(`
    <div class="chessBlock rightBottom">
    </div>`);
    //console.log("created");
}

function createPlayerInfo(){
    $(".playerInfo").append(`
    <div class="gameMode"></div>
        <div class="playerTurn white">white turn</div>
        <div class="winMessage"></div>
        `);
        //<div class="buttonGroup"><button>Setting</button></div>
}

function setIndexInMatrix(index,firstCharPlayer){
    let row = Math.floor(index/15) == 0? 0 : Math.floor(index/15);
    let column = index - [15*row] == 0? 0 : index - [15*row];
    console.log("Row: " + row + " Column: " + column);
    chessBoardMatrix[row][column] = firstCharPlayer;
    console.log("Chess Block index: " + index);
}

function renderChessBoard(){
    for (let i = 0; i < chessBoardMatrix.length; i++) {
        for (let j = 0; j < chessBoardMatrix[i].length; j++) {
            if (chessBoardMatrix[i][j] === "W") { 
                $(".chessBlock").eq(i * chessBoardMatrix.length + j).html(`<div class="stone white"></div>`);
            }
            else if (chessBoardMatrix[i][j] === "B") {
                $(".chessBlock").eq(i * chessBoardMatrix.length + j).html(`<div class="stone black"></div>`);
            } 
        }
    }
}



function checkWinner(playerChar) {
    for(let i = 0; i < chessBoardMatrix.length; i++){
        for(let j = 0; j < chessBoardMatrix[i].length; j++){
            //horizontal
            if(i <= 10 &&
                chessBoardMatrix[i][j] === playerChar && 
                chessBoardMatrix[i + 1][j] === playerChar && 
                chessBoardMatrix[i + 2][j] === playerChar && 
                chessBoardMatrix[i + 3][j] === playerChar && 
                chessBoardMatrix[i + 4][j] === playerChar)
                isGameEnd = true;
            //vertical
            if(j <= 10 && 
                chessBoardMatrix[i][j] === playerChar &&
                chessBoardMatrix[i][j + 1] === playerChar &&
                chessBoardMatrix[i][j + 2] === playerChar &&
                chessBoardMatrix[i][j + 3] === playerChar &&
                chessBoardMatrix[i][j + 4] === playerChar)
                isGameEnd = true;
            //diagonal -ve
            if(i <= 10 && j <= 10 &&
                chessBoardMatrix[i][j] === playerChar &&
                chessBoardMatrix[i + 1][j + 1] === playerChar &&
                chessBoardMatrix[i + 2][j + 2] === playerChar &&
                chessBoardMatrix[i + 3][j + 3] === playerChar &&
                chessBoardMatrix[i + 4][j + 4] === playerChar)
                isGameEnd = true;
            //diagonal +ve
            if(i >= 4 && j <= 10 &&
                chessBoardMatrix[i][j] === playerChar &&
                chessBoardMatrix[i - 1][j + 1] === playerChar &&
                chessBoardMatrix[i - 2][j + 2] === playerChar &&
                chessBoardMatrix[i - 3][j + 3] === playerChar &&
                chessBoardMatrix[i - 4][j + 4] === playerChar)
                isGameEnd = true;
        }
    }
    
}

function chooseMode(){
    //isPVPMode = prompt("Which mode you want to play?\nPVP type 0, PVE type 1");
    if(isPVPMode == 0){
        console.log("PVP");
    }
    else if(isPVPMode == 1){
        console.log("PVE");
    };
}
function changeMode(currentTarget, isPVPMode){
    if (isPVPMode) {  //PVP
        player = isWhiteTurn ? "white" : "black";

        let index = $(currentTarget).index();
        char = isWhiteTurn ? "W" : "B";

        setIndexInMatrix(index,char);

        $(".playerTurn").removeClass(player);
        $(".playerTurn").text(`${!isWhiteTurn ? "white" : "black"} turn`);
        $(".playerTurn").addClass(!isWhiteTurn ? "white" : "black"); 
        isWhiteTurn = !isWhiteTurn;

    } else {          //PVE
        index = $(currentTarget).index();
        char = "W";
        setIndexInMatrix(index,char);
        // let timeout = setTimeout(() => {
        //     clearTimeout(timeout);
            //AIMoveTurn();
            char = "B";
            setIndexInMatrix(23,char);
            console.log(checkAdjacent5(char));
        // }, 2000);
        
    }
}


createChessBoard();
createChessBoardMatrixnScore();
createPlayerInfo();

//move stone function
$(".chessBlock").on('click', (evt) => {
    let currentTarget = evt.currentTarget;
    if ($(currentTarget).has(".stone").length === 0 && !isGameEnd) {

        changeMode(currentTarget, isPVPMode);
        
        renderChessBoard();
        checkWinner(char);

        if(isGameEnd){
            $(".playerTurn").html("");
            $(".winMessage").addClass(player);
            $(".winMessage").text(`${player} Win!`);
        }
    }
})
