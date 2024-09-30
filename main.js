
const billAmountInput = document.getElementById('bill-amount');
// Select all buttons inside the .tip-buttons container
const tipButtons = document.querySelectorAll('.tip-buttons-wrap .tip-button');

// Select the custom tip input
const customTipInput = document.getElementById('custom-tip');

// Select the elements to display the tip amount and total amount
const tipAmountDisplay = document.querySelector('.tip-amount-wrap .tip-amount');
const totalAmountDisplay = document.querySelector('.total .total-amount');
const numOfPeople = document.getElementById('people');
const inputDivPeople = document.querySelector('.input-div-people');
const errorText = document.querySelector('.error-txt-msg');
// steps
// 1. Get the bill amount from the input field create a function to get the bill amount and pass the billAmountInput variable
// 2. Get the tip amount from the button create a function to get the tip amount and pass the tipButtons variable
// 3. Calculate the tip amount create a function to calculate the tip amount and pass the bill amount and tip amount

// edge cases
// 1. If the bill amount is empty, show an error message
// 2. If the tip amount is empty, show an error message
// 3. If the custom tip amount is empty, show an error message
// 4. If the custom tip amount is less than 0, show an error message

// Function to calculate the tip amount and total cost per person
function calculateTipAmount(tipPercentage, isDollarAmount = false) {
    const billAmount = parseFloat(billAmountInput.value);
    const people = parseFloat(numOfPeople.value);

    if (isNaN(billAmount) || billAmount <= 0) {
        alert('Please enter a valid bill amount');
        return;
    }

    if (isNaN(people) || people <= 0) {
        // alert('Please enter a valid number of people');
        inputDivPeople.classList.add('error');
        errorText.style.display = 'block';
        setTimeout(() => {
            inputDivPeople.classList.remove('error');
            errorText.style.display = 'none';
        }, 3000);
        return;
    }

    const tipAmount = billAmount * (tipPercentage / 100);
    const tipPerPerson = tipAmount / people;
    const totalAmount = billAmount + tipAmount;
    const totalPerPerson = totalAmount / people;

    tipAmountDisplay.textContent = `$${tipPerPerson.toFixed(2)}`;
    totalAmountDisplay.textContent = `$${totalPerPerson.toFixed(2)}`;
}

// Add an event listener for each tip button element
tipButtons.forEach(button => {
    button.addEventListener('click', () => {
        const tipPercentage = parseFloat(button.textContent);
        tipButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add("active");
        calculateTipAmount(tipPercentage);
        if (customTipInput.value) {
            customTipInput.value = '';
            tipButtons.forEach(btn => btn.classList.remove('active'));
        }
    });
});

// Add an event listener for the custom tip input
customTipInput.addEventListener('input', () => {
    const customTipPercentage = parseFloat(customTipInput.value);
    if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
        calculateTipAmount(customTipPercentage);
    }

    if (customTipPercentage === 0) {
        let newCustomDivMsg = document.createElement('div');
        // newCustomDivMsg.innerHTML = `<p class="custom-tip-msg">If you're broke then just say that</p>`;
        newCustomDivMsg.innerHTML = 
        `<div class="custom-tip-zero-msg">
        <img class="custom-tip-zero-img" src="./assets/Screenshot_2024-09-29_152710-removebg-preview.png">
            <p>Pwase leave a tip?</p>
            // add an image here later
            <button class="close-btn">X</button>
            <button class="yes-btn">Yes</button>
            <button class="no-btn">No</button>
        </div>`;

        // selecting our container element 
        let container = document.querySelector('.container');

        container.appendChild(newCustomDivMsg);
    }
});

// Add an event listener for the custom tip input focus event
customTipInput.addEventListener('focus', () => {
    tipButtons.forEach(btn => btn.classList.remove('active'));
});

// Add an event listener for the number of people input
numOfPeople.addEventListener('input', () => {
    const activeButton = document.querySelector('.tip-button.active');
    if (activeButton) {
        const tipPercentage = parseFloat(activeButton.textContent);
        calculateTipAmount(tipPercentage);
    } else {
        const customTipPercentage = parseFloat(customTipInput.value);
        if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
            calculateTipAmount(customTipPercentage);
        }
    }
});