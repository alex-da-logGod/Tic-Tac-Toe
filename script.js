const fieldElement = document.querySelector('#field')
const boxElements = document.querySelectorAll('#field .box')

let currentTurn;

const winCombos = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]

startGame()

function startGame() {
    fieldElement.classList.remove('turn-x', 'turn-o')

    for (let box of boxElements) {
        box.classList.remove('x', 'o')
        box.addEventListener('click', fillBox, {once: true})
    }

    currentTurn = Math.round(Math.random(0,1)) === 1 ? 'x' : 'o';
    fieldElement.classList.add('turn-' + currentTurn)
}

function fillBox() {
    this.classList.add(currentTurn)

    if (checkWin()) {
        
        const restart = confirm(`${currentTurn} is the winner! Restart?`)

        if (restart) startGame()
    } else if (drawCheck()) {
        const restart = confirm("it's a draw! Restart")

        if (restart) startGame()
    } else {
        currentTurn = currentTurn === 'x' ? 'o' : 'x'
        fieldElement.classList.remove('turn-x', 'turn-o')
        fieldElement.classList.add('turn-' + currentTurn)
    }


    
}

function checkWin() {
    return winCombos.some(combo => {
        return combo.every(b => {
            if (boxElements[b].classList.contains(currentTurn)) {
                return true
            }
            return false
        })
    })
}

function drawCheck() {
    return [...boxElements].every(b => {
        if (
            b.classList.contains('x') ||
            b.classList.contains('o')
        ) {
            return true
        }

        return false
    })
}