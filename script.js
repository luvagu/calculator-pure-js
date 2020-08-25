class Calculator {
    constructor(previousOperandText, currentOperandText) {
        this.previousOperandText = previousOperandText
        this.currentOperandText = currentOperandText
        this.allClear()
    }

    allClear() {
        this.previousOperand = ''
        this.currentOperand = ''
        this.operation = undefined
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)
    }

    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return
        this.currentOperand = this.currentOperand.toString() + number.toString()
    }

    chooseOperation(symbol) {
        if (this.currentOperand === '') return
        if (this.previousOperand !== '') {
            this.compute()
        }
        this.operation = symbol
        this.previousOperand = this.currentOperand
        this.currentOperand = ''
    }

    compute() {
        let computation
        const prev = parseFloat(this.previousOperand)
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current)) return
        //computation = prev + current
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            default:
                return
        }
        this.currentOperand = computation
        this.operation = undefined
        this.previousOperand = ''
    }

    formatNumber(number) {
        const stringNum = number.toString()
        const intDigits = parseFloat(stringNum.split('.')[0])
        const decimalDigits = stringNum.split('.')[1]
        let intDisplay
        if (isNaN(intDigits)) {
            intDisplay = ''
        } else {
            intDisplay = intDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }
        if (decimalDigits != null) {
            return `${intDisplay}.${decimalDigits}`
        } else {
            return intDisplay
        }
    }

    updateDisplay() {
        this.currentOperandText.innerText = this.formatNumber(this.currentOperand)
        if (this.operation != null) {
            this.previousOperandText.innerText = `${this.formatNumber(this.previousOperand)} ${this.operation}`
        } else {
            this.previousOperandText.innerText = ''
        }
    }

}

const numberButtons = document.querySelectorAll('[data-number]')
const symbolButtons = document.querySelectorAll('[data-symbol]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const equalsButton = document.querySelector('[data-equals]')
const currentOperandText = document.querySelector('[data-current-op]')
const previousOperandText = document.querySelector('[data-previous-op]')

const calculator = new Calculator(previousOperandText, currentOperandText)

numberButtons.forEach(number => {
    number.addEventListener('click', () => {
        calculator.appendNumber(number.innerText)
        calculator.updateDisplay()
    })
})

symbolButtons.forEach(symbol => {
    symbol.addEventListener('click', () => {
        calculator.chooseOperation(symbol.innerText)
        calculator.updateDisplay()
    })
})

equalsButton.addEventListener('click', () => {
    calculator.compute()
    calculator.updateDisplay()
})

allClearButton.addEventListener('click', () => {
    calculator.allClear()
    calculator.updateDisplay()
})

deleteButton.addEventListener('click', () => {
    calculator.delete()
    calculator.updateDisplay()
})