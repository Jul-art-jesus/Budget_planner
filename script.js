import { database } from "./firebase-config.js";
import { ref, push, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const transactionsRef = ref(database, "transactions");

// Ensure buttons trigger functions correctly
document.getElementById("addIncome").addEventListener("click", () => addTransaction("income"));
document.getElementById("addExpense").addEventListener("click", () => addTransaction("expense"));

function addTransaction(type) {
    const inputField = document.getElementById(type);
    const amount = parseFloat(inputField.value);

    if (amount > 0) {
        push(transactionsRef, { type, amount });
        inputField.value = ''; // Clear input after adding
    } else {
        alert("Please enter a valid amount!");
    }
}

// Listen for database changes and update UI
onValue(transactionsRef, (snapshot) => {
    const transactions = snapshot.val();
    const list = document.getElementById('transactions');
    list.innerHTML = "";

    let totalIncome = 0, totalExpenses = 0;

    if (transactions) {
        Object.values(transactions).forEach(t => {
            const li = document.createElement('li');
            li.textContent = `${t.type}: $${t.amount.toFixed(2)}`;
            list.appendChild(li);
            
            if (t.type === "income") {
                totalIncome += t.amount;
            } else {
                totalExpenses += t.amount;
            }
        });
    }

    // Update Summary
    document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
});
