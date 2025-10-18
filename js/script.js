const display = document.querySelector(".display");
const buttons = document.querySelectorAll("button");

let expression = ""; // the whole typed expression

function updateDisplay() {
display.textContent = expression || "0";
}

function handleButton(value) {
if (!isNaN(value) || value === ".") {
// number or decimal
expression += value;
}
else if (["+", "-", "*", "/", "%"].includes(value)) {
if (expression === "" && value !== "-") return; // don't start with +*/%
// avoid double operator
if (/[+\-*/%]$/.test(expression)) {
expression = expression.slice(0, -1) + value;
} else {
expression += value;
}
}
else if (value === "=") {
try {
// evaluate safely
expression = eval(expression.replace("%", "/100")).toString();
} catch {
expression = "Error";
}
}
else if (value === "clr") {
expression = "";
}
else if (value === "del") {
expression = expression.slice(0, -1);
}

updateDisplay();
}

buttons.forEach(button => {
button.addEventListener("click", () => handleButton(button.textContent));
});

updateDisplay();