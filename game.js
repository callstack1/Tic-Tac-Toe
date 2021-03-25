function Game(){
    this.playerOne = 'x';
    this.playerTwo = 'o';
    this.currentPlayer = this.playerOne;
    
    this.board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
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
            this.update(Number(evt.target.classList[1], this.currentPlayer, ));
        }
    }
    
    this.changePlayer = () => {
        if (this.currentPlayer == this.playerOne){
            this.currentPlayer = this.playerTwo;
        } else {
            this.currentPlayer  = this.playerOne;
            // adding comment to test
        }
    }

    this.update = (chosenSquare, img, lineNumber) => {
        const line = this.board[lineNumber];
        line[chosenSquare] = img;
        this.checkWinner();
    }

    this.checkWinner = () => {
        for (const line of this.board){
            if (line[0] == line[1] == line[2]){
                this.winnerMsg();
            }
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