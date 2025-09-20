// ====== DOM ELEMENTS ======
const balanceEl = document.getElementById("balance");
const transactionList = document.getElementById("transaction-list");
const form = document.getElementById("transaction-form");
const nameInput = document.getElementById("name");
const amountInput = document.getElementById("amount");
const typeInput = document.getElementById("type");
const dateInput = document.getElementById("date");
const categoryInput = document.getElementById("category");

// New filter elements
const filterStart = document.getElementById("filter-start");
const filterEnd = document.getElementById("filter-end");
const filterCategory = document.getElementById("filter-category");
const applyFiltersBtn = document.getElementById("apply-filters");
const clearFiltersBtn = document.getElementById("clear-filters");
const monthlySummaryEl = document.getElementById("monthly-summary");
const exportBtn = document.getElementById("export-csv");

// ====== DATA ======
let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

// ====== HELPERS ======
function saveTransactions() {
  localStorage.setItem("transactions", JSON.stringify(transactions));
}

// Format date to YYYY-MM-DD for consistent comparison
function toDateStr(date) {
  return new Date(date).toISOString().split("T")[0];
}

// ====== UI UPDATE ======
function updateUI() {
  transactionList.innerHTML = "";
  let balance = 0;

  // Filter logic
  const start = filterStart.value ? new Date(filterStart.value) : null;
  const end = filterEnd.value ? new Date(filterEnd.value) : null;
  const categoryFilter = filterCategory.value;

  const filtered = transactions.filter(t => {
    const tDate = new Date(t.date);
    const matchDate =
      (!start || tDate >= start) &&
      (!end || tDate <= end);
    const matchCat =
      categoryFilter === "all" || categoryFilter === "" || t.category === categoryFilter;
    return matchDate && matchCat;
  });

  filtered.forEach(t => {
    balance += t.type === "income" ? t.amount : -t.amount;

    const li = document.createElement("li");
    li.classList.add(t.type);
    li.innerHTML = `
      ${t.name} (${t.category})<br>
      <small>${t.date}</small>
      <span>₹${t.amount}</span>
      <button onclick="deleteTransaction(${t.id})">×</button>
    `;
    transactionList.appendChild(li);
  });

  balanceEl.textContent = `₹${balance}`;
  updateMonthlySummary(filtered);
  updateCategoryFilterOptions();
}

// ====== Monthly Summary ======
function updateMonthlySummary(list) {
  monthlySummaryEl.innerHTML = "";
  const monthlyData = {};

  list.forEach(t => {
    const monthKey = t.date.slice(0, 7); // YYYY-MM
    if (!monthlyData[monthKey]) {
      monthlyData[monthKey] = { income: 0, expense: 0 };
    }
    if (t.type === "income") {
      monthlyData[monthKey].income += t.amount;
    } else {
      monthlyData[monthKey].expense += t.amount;
    }
  });

  for (const [month, vals] of Object.entries(monthlyData)) {
    const div = document.createElement("div");
    div.textContent = `${month}: Income ₹${vals.income} | Expense ₹${vals.expense}`;
    monthlySummaryEl.appendChild(div);
  }

  if (Object.keys(monthlyData).length === 0) {
    monthlySummaryEl.textContent = "No transactions for selected range.";
  }
}

// ====== Category Filter Options ======
function updateCategoryFilterOptions() {
  const categories = Array.from(new Set(transactions.map(t => t.category)));
  const current = filterCategory.value;
  filterCategory.innerHTML = `<option value="all">All</option>`;
  categories.forEach(cat => {
    const opt = document.createElement("option");
    opt.value = cat;
    opt.textContent = cat;
    filterCategory.appendChild(opt);
  });
  if (categories.includes(current)) filterCategory.value = current;
}

// ====== FORM SUBMIT ======
form.addEventListener("submit", e => {
  e.preventDefault();

  // Validation
  const name = nameInput.value.trim();
  const amount = +amountInput.value;
  const type = typeInput.value;
  const date = dateInput.value;
  const category = categoryInput.value.trim();

  if (!name || !date || !category || amount <= 0) {
    alert("Please enter valid name, category, date, and positive amount.");
    return;
  }

  const transaction = {
    id: Date.now(),
    name,
    amount,
    type,
    date: toDateStr(date),
    category
  };

  transactions.push(transaction);
  saveTransactions();
  updateUI();

  // Clear inputs
  nameInput.value = "";
  amountInput.value = "";
  typeInput.value = "income";
  dateInput.value = "";
  categoryInput.value = "";
});

// ====== DELETE ======
function deleteTransaction(id) {
  transactions = transactions.filter(t => t.id !== id);
  saveTransactions();
  updateUI();
}
window.deleteTransaction = deleteTransaction; // allow inline onclick

// ====== FILTER BUTTONS ======
applyFiltersBtn.addEventListener("click", updateUI);
clearFiltersBtn.addEventListener("click", () => {
  filterStart.value = "";
  filterEnd.value = "";
  filterCategory.value = "all";
  updateUI();
});

// ====== EXPORT CSV ======
exportBtn.addEventListener("click", () => {
  if (transactions.length === 0) {
    alert("No transactions to export.");
    return;
  }
  const header = "Name,Amount,Type,Date,Category\n";
  const rows = transactions
    .map(t => `${t.name},${t.amount},${t.type},${t.date},${t.category}`)
    .join("\n");
  const blob = new Blob([header + rows], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "transactions.csv";
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
});

// ====== INIT ======
updateUI();
