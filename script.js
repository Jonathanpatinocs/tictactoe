const player1 = { 
    name: 'Player 1',
    marker: 'X',
    myTurn: true
}
const player2 = {
    name: 'Player 2',
    marker:'O',
    myTurn: false
}
const gameBoard = (function() {
    const object = {
    array: 
    [['a1' ,'a2', 'a3'],
     ['b1', 'b2', 'b3'],
     ['c1', 'c2', 'c3']],

     replace(player, gamePiece) {
        for (let i = 0; i < 3; i++) {
            for(let j = 0; j < 3; j++) {
                if (this.array[i][j] === gamePiece) {
                    this.array[i][j] = player;
                }
            }
        }
     },
     checkBoard() {
        let winner;
        for(let i = 0; i < 3; i++) { // Checks for winner in columns
            if (this.array[i][0] === this.array[i][1] && this.array[i][1] === this.array[i][2]) {
                winner = this.array[i][0];
            }
        }
        for (let i = 0; i < 3; i++) { // Checks for winner in rows
            if (this.array[0][i] === this.array[1][i] &&  this.array[1][i] === this.array[2][i]) {
                winner = this.array[0][i];
            }
        }
        //checks for winner in diagonals
        if (this.array[0][0] === this.array[1][1] && this.array[1][1] === this.array[2][2]) {
            winner = this.array[1][1];
        }
        if (this.array[2][0] === this.array[1][1] && this.array[1][1] === this.array[0][2]) {
            winner = this.array[1][1];
        } // 
        if (winner != 'X' && winner != 'O') {
            let defaultPieces = 0;
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    if (this.array[i][j] != 'O' &&  this.array[i][j] != 'X') {
                        defaultPieces++;
                    }
                }
            }
            if (defaultPieces === 0) {winner = 'Tie'}
            
        }   
        return winner;
     },
     reset() {
        this.array =
    [['a1' ,'a2', 'a3'],
     ['b1', 'b2', 'b3'],
     ['c1', 'c2', 'c3']],
     player1.myTurn = true,
     player2.myTurn = false
     },
     
    }
    return object;
})();

function game() {
    
    gameBoard.reset();
    const boxes = document.getElementsByClassName("box");
    const turnBox = document.getElementById('turn');
    turnBox.innerText = 'Player 1 Turn (X)';
    
    for(let i = 0; i < boxes.length; i++) {
        boxes[i].addEventListener('click' ,()=>  {
        
            if(player1.myTurn === true && !boxes[i].classList.contains('taken')) {
                boxes[i].textContent = 'X';
                let choice = boxes[i].id;
                gameBoard.replace(player1.marker, choice);
                player1.myTurn = false;
                player2.myTurn = true;
                turnBox.textContent = 'Player 2 Turn (O)'
            }
            else if (player2.myTurn === true && !boxes[i].classList.contains('taken')) {
                let choice = boxes[i].id;
                boxes[i].textContent = 'O';
                gameBoard.replace(player2.marker, choice);
                player2.myTurn = false;
                player1.myTurn = true;
                turnBox.textContent = 'Player 1 Turn (X)'
            }
            boxes[i].classList.add('taken');
             
            if(gameBoard.checkBoard() != undefined) {
                let winner = gameBoard.checkBoard();
                turnBox.textContent = 'Winner: ' + winner;
            }
            console.log(gameBoard.array);
        })
    }
    
}
game();
