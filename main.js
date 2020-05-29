const mainContainer = document.querySelector('.mainContainer');
const numberBtn = document.querySelectorAll('[data-number]');
const operationBtn = document.querySelectorAll('[data-operation]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');
const clearBtn = document.querySelector('[data-clear]');
const lastNum = document.querySelector('[data-previous-operand]');
const currentNum = document.querySelector('[data-current-operand]');

class Calculator {
  constructor(lastNum, currentNum) {
    this.lastNum = lastNum;
    this.currentNum = currentNum;
    this.clear();
  }

  clear () {
    this.currentDisplayValue ='';
    this.lastDisplayValue = '';
    this.operation = undefined;


  }

  delete() {
    this.currentDisplayValue = this.currentDisplayValue.toString().slice(0,-1);

  }

  concatNum (number){
    //check if decimal is pressed and if included in current display
    if (number === '.' && this.currentDisplayValue.includes('.')) return;
    /*number passed in from numberBtn event listener; current diplayValue(was empty string)
    gets assigned number pressed from event listener and added as string */
    this.currentDisplayValue = this.currentDisplayValue.toString() + number.toString();
  }

  operationBtn (operation) {
    //return if no value in currentDisplay before operation pressed
    if (this.currentDisplayValue === '')return
    /*Check if there is a lastValue (entered previously), if there is, compute
    the values and then proceed w/ appeneding operators */
    if (this.lastDisplayValue !== ''){
      this.compute();
    }
    /*tell calculator to use operation that was passed in from event listener
    so calculator knows what operation should be used to compute.*/
    this.operation = operation;
    /*pass currentValue displayed to lastDisplayValue, tell calculator that were
    done typing current value so its held in lastDisp. -> then cleared */
    this.lastDisplayValue = this.currentDisplayValue;
    this.currentDisplayValue = '';


  }

  compute () {
    let calculate;
    let previousValue = parseFloat(this.lastDisplayValue);
    let currentValue = parseFloat(this.currentDisplayValue);
    if (isNaN(previousValue) || isNaN(currentValue)) return
    switch (this.operation){
      case '+':
      calculate = previousValue + currentValue
      break;
      case '-':
      calculate = previousValue - currentValue
      break;
      case '*':
      calculate = previousValue * currentValue
      break;
      case '/':
      calculate = previousValue / currentValue
      break;
    default:
      return
    }
    this.currentDisplayValue = calculate;
  }

  updateDisplay() {
    this.currentNum.innerText = this.currentDisplayValue;
    this.lastNum.innerText = this.lastDisplayValue;

  }

}


const calculator = new Calculator(lastNum, currentNum);

clearBtn.addEventListener('click', clrButton => {
    calculator.clear()
    console.log(clearBtn.innerText)
    calculator.updateDisplay();
  })

deleteBtn.addEventListener('click', equalsButton => {
    calculator.delete()
    console.log(deleteBtn.innerText)
    calculator.updateDisplay();
  })


numberBtn.forEach(element => {
  element.addEventListener('click', ()=> {
    calculator.concatNum(element.innerText)
    console.log(element.innerText)
    calculator.updateDisplay()
  });

});

operationBtn.forEach(OpBtn => {
  OpBtn.addEventListener('click',()=> {
    calculator.operationBtn(OpBtn.innerText)
    console.log(OpBtn.innerText)
    calculator.updateDisplay();
  });
});

equalsBtn.addEventListener('click', equalsButton => {
    calculator.compute()
    console.log(equalsBtn.innerText)
    calculator.updateDisplay();
});
