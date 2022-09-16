const previusOperationText = document.querySelector("#previus-operation");
const currentOperationText = document.querySelector("#current-operation");
const button = document.querySelectorAll("#buttons-container button");

class Calculator{
    constructor(previusOperationText, currentOperationText) {
        this.previusOperationText = previusOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = '';
    }

    // Add digit to calculator screen
    addDigit(digit){
        //Check if current operation alredy has a dot
        if (digit === '.' && this.currentOperationText.innerText.includes('.')){
            return;
        }

        this.currentOperation = digit;
        this.updateScreen()
    }

    // Process all calculator operations
    processOperation(operation){
        
        // Get current and previus value
        let operationValue
        const previus = +this.previusOperationText.innerText;
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case '+':
                operationValue = previus + current;
                this.updateScreen(operationValue, operation, previus, current);
                break;
            default:
                return;
        }
    }

    //Change values of calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previus = null
    ) {
        console.log(operationValue, operation, previus, current);

        this.currentOperationText.innerText += this.currentOperation;
    }
}

const calc = new Calculator(previusOperationText, currentOperationText);

button.forEach((btn) => {
    btn.addEventListener('click', (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === '.'){
            calc.addDigit(value);
        } else{
            calc.processOperation(value);
        }
    });
});