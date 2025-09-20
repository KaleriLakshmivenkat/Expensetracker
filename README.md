# Expense Tracker

A simple web application built with HTML, CSS, and JavaScript to track income and expenses.  
Users can add transactions, view their current balance, filter by date or category, and export their data as a CSV file.

---

## Layout & UI

The interface is divided into three main sections:

1. Current Balance  
   - Shows the total balance in real time (Income − Expenses).

2. Transaction History  
   - Lists each transaction with its name, amount, type (income/expense), date, and category.

3. Add New Transaction  
   - Form fields:
     - Transaction Name: e.g., “Groceries” or “Salary”.
     - Amount: The transaction amount.
     - Type: Radio buttons or dropdown to choose Income or Expense.
     - Category: Optional field (e.g., Groceries, Entertainment).
     - Date: Automatically added or user-selected.
   - Add Transaction button submits the form and updates the balance and history instantly.

---

## Features

- Real-Time Balance Display – Updates immediately after adding or deleting a transaction.  
- Filter by Date – View transactions within a specific date range.  
- Category Filter – Filter transactions by category (e.g., Groceries, Entertainment).  
- Monthly Summary – Shows total income and expenses for each month.  
- Export Data – Download all transactions as a CSV file.  
- Responsive Design – Works well on desktop and mobile screens.

---

## Technologies Used
- HTML – Structure of the app.
- CSS – Styling and responsive layout.
- JavaScript – App logic, DOM manipulation, local storage for saving transactions.

---

## Usage

1. Add a Transaction  
   - Enter a name, amount, select income or expense, and choose a category if desired.
   - Click Add Transaction.

2. Filter Transactions  
   - Use the date range picker or category filter to view specific transactions.

3. Monthly Summary  
   - View total income and expenses grouped by month.

4. Export Data  
   - Click Export CSV to download your transaction history.

---

## Optional Enhancements
- Dark mode theme
- Graphs/Charts to visualize spending trends
- User authentication with cloud storage (future enhancement)
