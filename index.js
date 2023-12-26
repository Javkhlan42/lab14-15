const cells = document.querySelectorAll(".cell");
        const statusText = document.querySelector("#statusText");
        const restartBtn = document.querySelector("#restartBtn");
        const playerXWinsElement = document.querySelector("#playerXWins");
        const playerOWinsElement = document.querySelector("#playerOWins");
        const winConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
        let options = ["", "", "", "", "", "", "", "", ""];
        let currentPlayer = "X";
        let playerXWins = 0;
        let playerOWins = 0;
    
        initializeGame();
    
        function initializeGame() {
            cells.forEach(cell => cell.addEventListener("click", cellClicked));
            restartBtn.addEventListener("click", restartGame);
            statusText.textContent = `${currentPlayer}'s turn`;
        }
    
        function cellClicked() {
            const cellIndex = this.getAttribute("cellIndex");
    
            if (options[cellIndex] !== "") {
                return;
            }
    
            updateCell(this, cellIndex);
            checkWinner();
        }
    
        function updateCell(cell, index) {
            options[index] = currentPlayer;
            cell.textContent = currentPlayer;
        }
    
        function changePlayer() {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            statusText.textContent = `${currentPlayer}'s turn`;
        }
    
        function checkWinner() {
            let roundWon = false;
    
            for (let i = 0; i < winConditions.length; i++) {
                const condition = winConditions[i];
                const cellA = options[condition[0]];
                const cellB = options[condition[1]];
                const cellC = options[condition[2]];
    
                if (cellA === "" || cellB === "" || cellC === "") {
                    continue;
                }
                if (cellA === cellB && cellB === cellC) {
                    roundWon = true;
                    break;
                }
            }
    
            if (roundWon) {
                if (currentPlayer === "X") {
                    playerXWins++;
                    playerXWinsElement.textContent = playerXWins;
                } else {
                    playerOWins++;
                    playerOWinsElement.textContent = playerOWins;
                }
    
                statusText.textContent = `${currentPlayer} wins!`;
                statusText.style.color = currentPlayer === "X" ? "purple" : "purple";
                statusText.style.fontSize = "3.2em";
    
                if (playerXWins === 3 || playerOWins === 3) {
                    statusText.textContent = `${
                        playerXWins === 3 ? "X" : "O"
                    } wins the game!`;
                } else {
                    setTimeout(() => {
                        restartGame();
                        startNextGame();
                    }, 2000);
                }
            } else if (!options.includes("")) {
                statusText.textContent = `Draw!`;
    
                setTimeout(() => {
                    restartGame();
                    startNextGame();
                }, 2000);
            } else {
                changePlayer();
            }
        }
    
        function restartGame() {
            currentPlayer = "X";
            options = ["", "", "", "", "", "", "", "", ""];
            statusText.textContent = `${currentPlayer}'s turn`;
            cells.forEach((cell) => (cell.textContent = ""));
        }
    
        function startNextGame() {
            initializeGame();
        }