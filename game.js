function Game(){
    this.playerOne = 'x';
    this.playerTwo = 'o';
    this.currentPlayer = this.playerOne;
    
    this.board = [
        ['0', '1', '2'],
        ['3', '4', '5'],
        ['6', '7', '8']
    ]

    this.fill = (evt) => {
        if (evt.target.children.length == 0 &&
            evt.target.classList[0] == "square"){
            if (this.currentPlayer == 'x'){
                const cross = document.createElement('p');
                cross.className = "cross";
                cross.textContent = "X";
                evt.target.appendChild(cross);
            } else if (this.currentPlayer == 'o'){
                const circle = document.createElement('div');
                circle.className = "circle";
                evt.target.appendChild(circle);
            }
            this.changePlayer();
            const lineNumber = evt.target.parentNode.id.slice(-1);
            this.update(Number(evt.target.classList[1]), this.currentPlayer, lineNumber);
        }
    }
    
    this.changePlayer = () => {
        if (this.currentPlayer == this.playerOne){
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer  = this.playerOne;
        }
    }

    this.update = (chosenSquare, img, lineNumber) => {
        var line = this.board[lineNumber];
        line[chosenSquare] = img;
        this.checkWinner();
    }

    this.checkWinner = () => {
        for (const line of this.board){ // line
            if (line[0] == line[1] && line[0] == line[2]){
                this.endGameMsg();
            }
        }
        if (this.board[1][1] == this.board[0][0] // diagonal 
            && this.board[1][1] == this.board[2][2]
            || this.board[1][1] == this.board[2][0] 
            && this.board[0][2]){
            this.endGameMsg();
        } else if (this.board[0][0] == this.board[1][0] 
            && this.board[0][0] == this.board[2][0]
            || this.board[1][0] == this.board[1][1]
            && this.board[1][0] == this.board[1][2]
            || this.board[2][0] == this.board[2][1]
            && this.board[2][0] == this.board[2][2]){ // column
                this.endGameMsg();
        }
        var filled = 0;
        const lineCtn = document.querySelectorAll(".line-ctn");
        for (var line of lineCtn){
            for (var square of line.children){
                if (square.children.length != 0){
                    filled++;
                }
            }
        }
        if (filled == 9){
            this.endGameMsg(true);
        }
    }

    this.endGameMsg = function(draw=false){
        const boxMsg = document.createElement('div');
        const gameBoard = document.querySelector('#game-board');
        boxMsg.id = "box-msg";
        if (!draw){
            var player = this.currentPlayer == "o" ? "One" : "Two";
            boxMsg.innerHTML = `
                <p style="font-size: 2rem; position: relative; top: 20%">Player ${player} wins!</p>
                <button id="restart-game">Restart</button>
            `
            this.addPoint(player);
        } else {
            boxMsg.innerHTML = `
                <p style="font-size: 2rem; position: relative; top: 20%">Game draw!</p>
                <button id="restart-game">Restart</button>
            `
        }
        gameBoard.appendChild(boxMsg);
        const restartButton = document.querySelector("#restart-game");
        restartButton.addEventListener('click', () => {
            this.restart(gameBoard, boxMsg);
        })
        return 0;
    }
    
    this.restart = function(board, box){
        board.removeChild(box);
        const lines = document.querySelectorAll(".line-ctn");
        for (var line of lines){
            for (var square of line.children){
                if (square.children.length != 0){
                    square.removeChild(square.children[0]);
                }
            }
        }
        this.board = [
            ['0', '1', '2'],
            ['3', '4', '5'],
            ['6', '7', '8']
        ]
        this.currentPlayer = this.playerOne;
    }
    
    this.addPoint = function(player){
        if (player == "One"){
            const para = document.querySelector("#player-one");
            para.textContent = `Player One: ${Number(para.textContent.slice(-1))+1}`;
        } else {
            const para = document.querySelector("#player-two");
            para.textContent = `Player Two: ${Number(para.textContent.slice(-1))+1}`;
        }
    }

    this.start = function(){
        const lineCtns = document.getElementsByClassName('line-ctn');
        for (let i = 0; i < 9; i++){
            const div = document.createElement('div');
            div.className = "square";
            div.addEventListener("click", this.fill);
            if (i < 3){
                lineCtns[0].appendChild(div);
                div.classList.add(`${i}`);
            } else if (i < 6){
                lineCtns[1].appendChild(div);
                div.classList.add(`${i-3}`);
            } else {
                lineCtns[2].appendChild(div);
                div.classList.add(`${i-6}`);
            }
        }
    }
}

const game = new Game();
game.start();