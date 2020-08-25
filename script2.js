const displayTop = document.querySelector('.display-top')
const displayMain = document.querySelector('.display-main')
const buttons = document.querySelectorAll('button')
let subTotal1 = 0, subTotal2 = 0, total = 0;

//console.log(displayMain.textContent)

const calc = (operand) => {
    switch (operand) {
        case '+': total = subTotal1 + subTotal2
    }
    displayMain.textContent = total
    subTotal1=0
    subTotal2=0
    total=0
}

buttons.forEach(bt => {
    bt.addEventListener('click', function() {
        const btValue = this.textContent
        if (/AC/.test(btValue)) {
            displayTop.innerHTML = '&nbsp;'
            displayMain.textContent = ''
        } else if (/DEL/.test(btValue)) {
            displayMain.textContent = displayMain.textContent.slice(0, -1)
        } else if (/[\d]/.test(btValue)) {
            displayMain.textContent += btValue
            //subTotal = parseFloat(displayMain.textContent)
            //console.log(subTotal)
        } else if (/[\.]/.test(btValue)) {
            if (!/[\.]/.test(displayMain.textContent)) {
                displayMain.textContent += btValue
                //subTotal = parseFloat(displayMain.textContent)
                //console.log(subTotal)
            }
            return false
        } else if (/[\÷\+\*\-]/.test(btValue)) {
            if (displayMain.textContent == '') {
                return false
            }
            if (subTotal1 > 0) {
                subTotal2 = parseFloat(displayMain.textContent)
                return calc(btValue)
            }
            subTotal1 = parseFloat(displayMain.textContent)
            console.log(subTotal1)
            displayTop.textContent = `${displayMain.textContent} ${btValue}`
            displayMain.textContent = ''
        }  else {
            displayTop.innerHTML = '&nbsp;'
            displayMain.textContent = 'result'
        }
        //return calc(this.textContent)
    })
})