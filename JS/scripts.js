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
        if(currentOperationText.innerText === ''){
            if(this.previusOperationText.innerText !== ''){
                this,changeOperation(operation);
            }
            return;
        }
        
        // Get current and previus value
        let operationValue
        const previus = +this.previusOperationText.innerText.split(" ")[0]; 
        const current = +this.currentOperationText.innerText;

        switch(operation){
            case '+':
                operationValue = previus + current;
                this.updateScreen(operationValue, operation, previus, current);
                break;
            case '-':
                operationValue = previus - current;
                this.updateScreen(operationValue, operation, previus, current);
                break;
            case '/':
                operationValue = previus / current;
                this.updateScreen(operationValue, operation, previus, current);
                break;
            case '*':
                operationValue = previus * current;
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

        if(operationValue === null) {
            this.currentOperationText.innerText += this.currentOperation;
        } else{
            if(previus === 0){
                operationValue = current;
            }
            this.previusOperationText.innerText = `${operationValue} ${operation}`
            this.currentOperationText.innerText = '';
        }
    }

    //   Mudar operador
    changeOperation(operation){

        const mathOperations = ['*', '/', '+', '-']

        if(!mathOperations.includes(operation)){   
            return;
        }

        this.previusOperationText.innerText = this.previusOperationText.innerText.slice(0, -1) + operation;

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