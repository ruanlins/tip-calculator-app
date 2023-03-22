const billInput = document.querySelector(".bill-input input");
const tipButtons = document.querySelectorAll(".select-tip-percentage");
const customInput = document.querySelector("#custom")
const peopleNumber = document.querySelector(".people-input input");
const personTip = document.querySelector(".tip-person");
const personTotal = document.querySelector(".total-person");
const resetBtn = document.querySelector(".reset-btn");
const error = document.querySelector("#error")
const inputError = document.querySelector(".people-input")

//reset button
resetBtn.addEventListener('click', () => {
    billInput.value = ""
    customInput.value = ""
    peopleNumber.value = ""
    personTip.innerText = "$0.00"
    personTotal.innerText = "$0.00"
    tipButtons.forEach(button => {
        button.classList.remove("active")
        tipButtons[1].classList.add("active")
    })
})


// add and remove active class on tip buttons
tipButtons.forEach(button => {
    button.addEventListener("click", (e) => {
        tipButtons.forEach(button => {
            button.classList.remove("active")
        })
        e.target.classList.add("active")
        if (!customInput.classList.contains("active")) {
            customInput.value = ""
        }
        if (billInput.value != "" && billInput.value > 1 && peopleNumber.value > 0 && peopleNumber.value != "") {
            calculateTip();
        }
    })
})

//get the tip values
const calculateTip = () => {
    const billValue = parseFloat(billInput.value);
    const people = parseInt(peopleNumber.value);
    const customTip = document.querySelector("#custom.active")
    let tipPercentage = parseInt(document.querySelector(".select-tip-percentage.active").dataset.percentage);

    if (customTip) {
        tipPercentage = parseFloat(customTip.value)
    }

    const tipTotal = +(billValue * (tipPercentage / 100)).toFixed(2);
    const tipPerson = +(tipTotal / people).toFixed(2);
    const billTotalPerson = +((billValue + tipTotal) / people).toFixed(2);

    personTotal.innerText = `$${billTotalPerson}`
    personTip.innerText = `$${tipPerson}`
}

//calculate tip
billInput.addEventListener("keyup", () => {
    if (billInput.value != "" && billInput.value > 1 && peopleNumber.value > 0 && peopleNumber.value != "") {
        calculateTip();
    }
})

peopleNumber.addEventListener("keyup", () => {
    if (peopleNumber.value == 0) {
        error.style.display = "block"
        inputError.classList.add("error")
    }

    if (billInput.value != "" && billInput.value > 1 && peopleNumber.value > 0 && peopleNumber.value != "") {
        inputError.classList.remove("error")
        error.style.display = "none"
        calculateTip();
    }
})








