const tileDisplay = document.querySelector('.tile-container')
const keyboardRow1 = document.querySelector('.row1-container')
const keyboardRow2 = document.querySelector('.row2-container')
const keyboardRow3 = document.querySelector('.row3-container')
const messageDisplay = document.querySelector('.message-container')


const wordle = 'Happyy'
/*const keys = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P',
              'A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L',
              'ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']*/

const row1 = ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P']
const row2 = ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L']
const row3 = ['ENTER', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', '⌫']
const keys = [row1, row2, row3]

const guessRows = [
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
    ['','','','','',''],
]
let currentRow = 0
let currentTile = 0
let isGameOver = false


guessRows.forEach((guessRow,guessRowIndex) => {
    const rowElement = document.createElement('div')
    rowElement.setAttribute('id', 'guessRow-' + guessRowIndex)
    guessRow.forEach((guess, guessIndex) => {
        const tileElement = document.createElement('div')
        tileElement.setAttribute('id', 'guessRow-' +guessRowIndex + '-tile-' + guessIndex)
        tileElement.classList.add('tile')
        rowElement.append(tileElement)
    })

    tileDisplay.append(rowElement)
})


row1.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click',() => handleClick(key))
    keyboardRow1.append(buttonElement)
})

row2.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click',() => handleClick(key))
    keyboardRow2.append(buttonElement)
})

row3.forEach(key => {
    const buttonElement = document.createElement('button')
    buttonElement.textContent = key
    buttonElement.setAttribute('id',key)
    buttonElement.addEventListener('click',() => handleClick(key))
    keyboardRow3.append(buttonElement)
})


const handleClick = (letter) => {
    console.log('clicked', letter)
    if (letter === '⌫') {
        deleteLetter()
        console.log('guessRows', guessRows)
        return
    }
    if (letter === 'ENTER') {
        checkRow()
        console.log('guessRows', guessRows)
        return
    }
    addLetter(letter)
    console.log('guessRows', guessRows)
}

const addLetter =  (letter) => {
    if (currentTile < 6 && currentRow < 6) {
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = letter
        guessRows[currentRow][currentTile] = letter
        tile.setAttribute('data', letter)
        currentTile++
    }
}

const deleteLetter = () => {
    if (currentTile >0) {
        currentTile--
        const tile = document.getElementById('guessRow-' + currentRow + '-tile-' + currentTile)
        tile.textContent = ''
        guessRows[currentRow][currentTile] = ''
        tile.setAttribute('data', '')
    }
}

const checkRow = () => {
    const guess = guessRows[currentRow].join('')

    if(currentTile > 5) {
        console.log('guess is ' + guess, 'wordle is ' + wordle)
        flipTile()
        if (wordle == guess) {
            showMessage('Can I Be Your Valentine?')
            isGameOver = true
            return
        } else {
            if (currentRow >= 5) {
                isGameOver = false
                showMessage('Game Over')
                return
            }
            if (currentRow < 5) {
                currentRow++
                currentTile = 0
            }
        }
    }
}

const showMessage = (message) => {
    const messageElement = document.createElement('p')
    messageElement.textContent = message
    messageDisplay.append(messageElement)
}

const addColorToKey = (keyLetter, color) => {
    const key = document.getElementById(keyLetter)
    key.classList.add(color)
}


const flipTile = () => {
    const rowTiles = document.querySelector('#guessRow-' + currentRow).childNodes
    let checkWordle = wordle
    const guess = []

    rowTiles.forEach(tile => {
        guess.push({ letter: tile.getAttribute('data'), color: 'grey-overlay'})
    })

    guess.forEach((guess, index) => {
        if (guess.letter == wordle[index]) {
            guess.color = 'green-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    guess.forEach(guess => {
        if (checkWordle.includes(guess.letter)) {
            guess.color = 'yellow-overlay'
            checkWordle = checkWordle.replace(guess.letter, '')
        }
    })

    rowTiles.forEach((tile, index) => {
        setTimeout(() => {
            tile.classList.add('flip')
            tile.classList.add(guess[index].color)
            addColorToKey(guess[index].letter, guess[index].color)
        }, 400 * index)
    })
}

/*Ka.innerHTML =
    "\n  <style>\n  .toaster {\n    position: absolute;\n    top: 10%;\n    left: 50%;\n    transform: translate(-50%, 0);\n    pointer-events: none;\n    width: fit-content;\n  }\n  #game-toaster {\n    z-index: "
        .concat(1e3, ";\n  }\n  #system-toaster {\n    z-index: ")
        .concat(
            4e3,
            // CHANGE THIS
            ';\n  }\n\n  #game {\n    ' +
            'width: 100%;\n    ' +
            'max-width: var(--game-max-width);\n    ' +
            'margin: 0 auto;\n    height: 100%;\n    ' +
            'display: flex;\n    ' +
            'flex-direction: column;\n  }\n  ' +
            'header {\n    display: flex;\n    ' +
            'justify-content: space-between;\n    ' +
            'align-items: center;\n    ' +
            'height: var(--header-height);\n    ' +
            'color: var(--color-tone-1);\n    ' +
            'border-bottom: 1px solid var(--color-tone-4);\n  }\n  ' +
            'header .title {\n    ' +
            'font-weight: 700;\n    ' +
            'font-size: 36px;\n    ' +
            'letter-spacing: 0.2rem;\n    ' +
            'text-transform: uppercase;\n    ' +
            'text-align: center;\n    ' +
            'position: absolute;\n    ' +
            'left: 0;\n    ' +
            'right: 0;\n    ' +
            'pointer-events: none;\n  }\n\n  ' +
            '@media (max-width: 360px) {\n    ' +
            'header .title {\n      ' +
            'font-size: 22px;\n      ' +
            'letter-spacing: 0.1rem;\n    }\n  }\n\n  ' +
            '#board-container {\n    ' +
            'display: flex;\n    ' +
            'justify-content: center;\n    ' +
            'align-items: center;\n    ' +
            'flex-grow: 1;\n    ' +
            'overflow: hidden;\n  }\n  ' +
            '#board {\n    ' +
            'display: grid;\n    ' +
            'grid-template-rows: repeat(6, 1fr);\n    ' +
            'grid-gap: 5px;\n    ' +
            'padding:10px;\n    ' +
            'box-sizing: border-box;\n  }\n  ' +
            'button.icon {\n    ' +
            'background: none;\n    ' +
            'border: none;\n    ' +
            'cursor: pointer;\n    ' +
            'padding: 0 4px;\n  }\n\n  ' +
            '#debug-tools {\n    ' +
            'position: absolute;\n    ' +
            'bottom: 0;\n  }\n\n  ' +
            '</style>\n  ' +
            '<game-theme-manager>\n    ' +
            '<div id="game">\n      ' +
            '<header>\n        ' +
            '<div class="menu">\n          ' +
            '<button id="help-button" class="icon" aria-label="help">\n            ' +
            '<game-icon icon="help"></game-icon>\n          ' +
            '</button>\n        ' +
            '</div>\n        ' +
            '<div class="title">\n         ' +
            'JNDLE 字道\n        ' +
            '</div>\n        ' +
            '<div class="menu">\n          ' +
            '<button id="statistics-button" class="icon" aria-label="statistics">\n            ' +
            '<game-icon icon="statistics"></game-icon>\n          ' +
            '</button>\n          ' +
            '<button id="settings-button" class="icon" aria-label="settings">\n            ' +
            '<game-icon icon="settings"></game-icon>\n          ' +
            '</button>\n        ' +
            '</div>\n      ' +
            '</header>\n        ' +
            '<div id="board-container">\n          ' +
            '<div id="board"></div>\n        ' +
            '</div>\n        ' +
            '<game-keyboard></game-keyboard>\n        ' +
            '<game-modal></game-modal>\n        ' +
            '<game-page></game-page>\n        ' +
            '<div class="toaster" id="game-toaster"></div>\n        ' +
            '<div class="toaster" id="system-toaster"></div>\n    ' +
            '</div>\n  ' +
            '</game-theme-manager>\n  ' +
            '<div id="debug-tools"></div>\n'
        );

        */