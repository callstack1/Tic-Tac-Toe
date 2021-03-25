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
            if (this.currentPlayer == 'o'){
                const cross = document.createElement('p');
                cross.className = "cross";
                cross.textContent = "X";
                evt.target.appendChild(cross);
            } else if (this.currentPlayer == 'x'){
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
        console.log(this.board);
        this.checkWinner();
    }

    this.checkWinner = () => {
        for (const line of this.board){ // line
            if (line[0] == line[1] && line[0] == line[2]){
                this.winnerMsg();
            }
        }
        if (this.board[1][1] == this.board[0][0] // diagonal 
            && this.board[1][1] == this.board[2][2]
            || this.board[1][1] == this.board[2][0] 
            && this.board[0][2]){
            this.winnerMsg();
        } else if (this.board[0][0] == this.board[1][0] 
            && this.board[0][0] == this.board[2][0]
            || this.board[1][0] == this.board[1][1]
            && this.board[1][0] == this.board[1][2]
            || this.board[2][0] == this.board[2][1]
            && this.board[2][0] == this.board[2][2]){ // column
                this.winnerMsg();
        }
    }

    this.winnerMsg = function(){
        console.log('ganhou');
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