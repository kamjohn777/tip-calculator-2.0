
const billAmountInput = document.getElementById('bill-amount');
// Select all buttons inside the .tip-buttons container
const tipButtons = document.querySelectorAll('.tip-buttons-wrap .tip-button');

// Select the custom tip input
const customTipInput = document.querySelector('custom-tip');

// Select the elements to display the tip amount and total amount
const tipAmountDisplay = document.querySelector('.tip-amount-wrap .tip-amount');
const totalAmountDisplay = document.querySelector('.total .total-amount');
const numOfPeople = document.getElementById('people');

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
        alert('Please enter a valid number of people');
        return;
    }

    let tipAmount;
    if (isDollarAmount) {
        tipAmount = tipPercentage;
    } else {
        tipAmount = billAmount * (tipPercentage / 100);
    }

    // const tipAmount = billAmount * (tipPercentage / 100);
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
    });
});

// Add an event listener for the custom tip input
customTipInput.addEventListener('input', () => {
    // const customTipPercentage = parseFloat(customTipInput.value);
    // if (!isNaN(customTipPercentage) && customTipPercentage >= 0) {
    //     calculateTipAmount(customTipPercentage);
    // }
    const customTipValue = parseFloat(customTipInput.value);
    const tipType = tipTypeSelect.value;
    if (!isNaN(customTipValue) && customTipValue >= 0) {
        const isDollarAmount = tipType === 'dollar';
        calculateTipAmount(customTipValue, tipType === 'dollar');
    }
});

// Add an event listener for the number of people input
numOfPeople.addEventListener('input', () => {
    const activeButton = document.querySelector('.tip-button.active');
    if (activeButton) {
        const tipPercentage = parseFloat(activeButton.textContent);
        calculateTipAmount(tipPercentage);
    } else {
        const customTipValue = parseFloat(customTipInput.value);
        const tipType = tipTypeSelect.value;
        if (!isNaN(customTipValue) && customTipValue >= 0) {
            const isDollarAmount = tipType === 'dollar';
            calculateTipAmount(customTipPercentage);
        }
    }
});