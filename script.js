import { database } from "./firebase-config.js";
import { ref, push, update, remove, onValue } from "https://www.gstatic.com/firebasejs/11.3.1/firebase-database.js";

const transactionsRef = ref(database, "transactions");

document.getElementById("addIncome").addEventListener("click", () => addTransaction("income"));
document.getElementById("addExpense").addEventListener("click", () => addTransaction("expense"));

function addTransaction(type) {
    const nameField = document.getElementById(`${type}-name`);
    const amountField = document.getElementById(type);
    const dateField = document.getElementById(`${type}-date`);

    const name = nameField.value.trim();
    const amount = parseFloat(amountField.value);
    const date = dateField.value;

    if (name && amount > 0 && date) {
        push(transactionsRef, { type, name, amount, date });
        nameField.value = "";
        amountField.value = "";
        dateField.value = "";
    } else {
        alert("Please enter valid details!");
    }
}

// Fetch transactions and update UI
onValue(transactionsRef, (snapshot) => {
    const transactions = snapshot.val();
    const tableBody = document.getElementById("transactions");
    tableBody.innerHTML = ""; // Clear table before updating

    let totalIncome = 0, totalExpenses = 0;

    if (transactions) {
        Object.entries(transactions).forEach(([id, t]) => {
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${t.type === "income" ? `<input type="text" value="${t.name}" class="edit-input" id="name-${id}" disabled>` : "-"}</td>
                <td>${t.type === "income" ? `<input type="number" value="${t.amount}" class="edit-input" id="amount-${id}" disabled>` : "-"}</td>
                <td>${t.type === "income" ? `<input type="date" value="${t.date}" class="edit-input" id="date-${id}" disabled>` : "-"}</td>
                <td>${t.type === "expense" ? `<input type="text" value="${t.name}" class="edit-input" id="name-${id}" disabled>` : "-"}</td>
                <td>${t.type === "expense" ? `<input type="number" value="${t.amount}" class="edit-input" id="amount-${id}" disabled>` : "-"}</td>
                <td>${t.type === "expense" ? `<input type="date" value="${t.date}" class="edit-input" id="date-${id}" disabled>` : "-"}</td>
                <td>
                    <button class="btn-sm edit-btn" id="edit-btn-${id}" onclick="toggleEdit('${id}')">Edit</button>
                    <button class="btn-sm delete-btn" onclick="deleteTransaction('${id}')">Delete</button>
                </td>
            `;

            tableBody.appendChild(row);

            if (t.type === "income") totalIncome += t.amount;
            if (t.type === "expense") totalExpenses += t.amount;
        });
    }

    document.getElementById("total-income").textContent = `$${totalIncome.toFixed(2)}`;
    document.getElementById("total-expenses").textContent = `$${totalExpenses.toFixed(2)}`;
    document.getElementById("balance").textContent = `$${(totalIncome - totalExpenses).toFixed(2)}`;
});

// **Enable Editing When "Edit" Button is Clicked**
window.toggleEdit = function (id) {
    const nameField = document.getElementById(`name-${id}`);
    const amountField = document.getElementById(`amount-${id}`);
    const dateField = document.getElementById(`date-${id}`);
    const editBtn = document.getElementById(`edit-btn-${id}`);

    if (editBtn.textContent === "Edit") {
        nameField.disabled = false;
        amountField.disabled = false;
        dateField.disabled = false;
        editBtn.textContent = "Save";
    } else {
        updateTransaction(id);
        nameField.disabled = true;
        amountField.disabled = true;
        dateField.disabled = true;
        editBtn.textContent = "Edit";
    }
};

// **Update Transaction**
window.updateTransaction = function (id) {
    const updatedName = document.getElementById(`name-${id}`).value.trim();
    const updatedAmount = parseFloat(document.getElementById(`amount-${id}`).value);
    const updatedDate = document.getElementById(`date-${id}`).value;

    if (updatedName && updatedAmount > 0 && updatedDate) {
        update(ref(database, `transactions/${id}`), {
            name: updatedName,
            amount: updatedAmount,
            date: updatedDate
        });
    } else {
        alert("Please enter valid details before updating.");
    }
};

// **Delete Transaction**
window.deleteTransaction = function (id) {
    remove(ref(database, `transactions/${id}`));
};
