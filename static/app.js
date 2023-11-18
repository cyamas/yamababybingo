//Creates socket global variable without connecting
var socket = io({autoConnect: false});

var currXes = [];
for (i=0; i < 25; i++) {currXes.push(0)}; 

//Server emits image URLS to client for current and previous items drawn  
socket.on('items', (items) => {
    $("#selected").css("background-image", "url(../" + items[0] + ")");
    $("#registry").css("background-image", "url(../" + items[1] + ")"); 
})

socket.on('currXes', (xes) => {
    currXes = xes;
})

socket.on('game_over', (name) => {
    gameOverMessage = document.getElementById("game-over-message");
    if (name === 'Host') {
        gameOverMessage.innerHTML = "Host has ended the game."
    } else {
        gameOverMessage.innerHTML = "Team " + name + " has won!";
    }
    gameOver = document.getElementById("game-over");
    gameOver.style.display = "flex";
    document.getElementById("bingo-btn").disabled = true;
    document.getElementById("next-item-btn").disabled = true;
    socket.close();
})

socket.on('invalid', (message) => {
    team = document.getElementById('team-title').innerHTML
    if (team === message) {
        alert("Invalid bingo! One or more of your marked items has not been called!")
    }
})

//Generates 5x5 square bingo game board
//card is an array of randomized bingo item image urls 
//xes is an array of 0's and 1's indicating if a bingo square has been selected by the player or not
function displayBoard(card, xes) {
    connectUser();
    const board = document.getElementById("board");
    for (let i = 0; i < 25; i++) {
        const square = document.createElement('div');
        square.classList.add('square');
        square.id = i.toString();
        square.innerText += 'X';
        square.style.justifyContent = 'center';
        square.style.alignItems = 'center';
        square.style.textAlign = 'center';
        square.style.fontFamily = 'Gill Sans';
        square.style.fontSize = '130px';
        square.style.padding = 'none';
        square.style.backgroundImage = 'url(../' + card[i] + ')';
        square.style.backgroundPosition = 'center';
        square.style.backgroundRepeat = 'no-repeat';
        square.onclick = function() {postX(square)};

        if(xes[i] === 0) {
            square.style.color = 'transparent';
        }
        else{
            square.style.color = 'red';
            currXes[i] = 1;
        }
        
        board.append(square)
    }
    return
}

//marks or unmarks a bingo square with a red x when clicked and sends to flask server to be updated in session data
function postX(square) {
    let teamName = document.getElementById('team-title').innerHTML
    if (square.style.color === 'red') {
        square.style.color = 'transparent';
        currXes[Number(square.id)] = 0;
        $.ajax({
            type: "POST",
            url: "{{ url_for('play') }}",
            data: {'team': teamName, 'id': square.id, 'x': 0}
        })
    } else {
        square.style.color = 'red';
        currXes[Number(square.id)] = 1;
        $.ajax({
            type: "POST",
            url: "{{ url_for('play') }}",
            data: {'team': teamName, 'id': square.id, 'x': 1}
        })
    }
    return
}

function checkBingo(team, card) {
    candidate = bingoChecker(currXes, card);
    if (candidate) {
        socket.emit("winner", {'team': team, 'candidate': candidate});
    }else {
        alert("You have not checked 5 boxes in a row yet!");
    }
    return;   
}

function bingoChecker(xes, card) {
    var rows = [0, 5, 10, 15, 20];
    var cols = [0, 1, 2, 3, 4];
    for (i = 0; i < 21; i++) {
        //checks for bingo starting at left diagonal
        if (i === 0) {
            var leftDiag = [];
            for (j = 0; j < 25; j += 6){
                if (xes[i+j] === 1) {
                    leftDiag.push(card[i+j]);
                }else {
                    break;
                }
            }
            if (leftDiag.length === 5) {
                return leftDiag;
            }
        }
        //checks for bingo starting at right diagonal
        if (i === 4) {
            rightDiag = []
            for (k = 0; k < 21; k += 4) {
                if(xes[i+k] === 1) {
                    rightDiag.push(card[i+j]);
                }else {
                    break;
                }
            }
            if (rightDiag.length === 5) {
                return rightDiag;
            }
        }
        //checks all rows for bingo
        if (rows.includes(i)) {
            rowCandidate = [];
            for (m = 0; m < 5; m++) {
                if (xes[i+m] === 1) {
                    rowCandidate.push(card[i+m]);
                }else {
                    break;
                }
            }
            if (rowCandidate.length === 5) {
                return rowCandidate;
            }
        }
        //checks all cols for bingo
        if (cols.includes(i)) {
            colCandidate = [];
            for (n = 0; n < 24; n += 5) {
                if (xes[i+n] === 1) {
                    colCandidate.push(card[i+n]);
                }else {
                    break;
                }
            }
            if (colCandidate.length === 5) {
                return colCandidate;
            }
        }
    }
    return false;
}

function toggleForm(elem) {
    if(elem.style.display === 'flex'){
        elem.style.display = 'none';
    } else {
        elem.style.display = 'flex';
    }
    return
}

function connectUser() {
    socket.connect();
    var team = document.getElementById('team-title').innerHTML;
    socket.emit("team", {'team': team});
    return
}

function exitGame() {
    window.location.href = '/';
}

function abortGame() {
    socket.emit("abort", "Host");
    return
}