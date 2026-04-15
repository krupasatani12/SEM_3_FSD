# Inventory Hub - FSD Project

A modern Inventory Management System built with **HTML**, **CSS**, **JavaScript**, and **Supabase (PostgreSQL)**. This application allows users to manage their stock, record sales, track suppliers, and view business analytics through an interactive dashboard.

## 🚀 Features

- **User Authentication**: Secure Login and Registration system using Supabase.
- **Dashboard**: Real-time overview of inventory and expiry alerts for items expiring within 7 days.
- **Inventory Management**: 
  - Add new items with category, quantity, expiry date, buying price, and selling price.
  - Update existing stock details.
  - Delete items from inventory.
- **Sales Tracking**: 
  - Sell products directly from inventory.
  - Automatic calculation of total amount and profit.
  - Inventory levels update automatically after each sale.
- **Supplier Management**: Maintain a database of suppliers with contact details.
- **Reports**: View transaction history and profit analysis.
- **Responsive UI**: Clean and professional design using Bootstrap and custom CSS.

## 🛠️ Technology Stack

- **Frontend**: HTML5, CSS3, JavaScript (ES6+).
- **Styling**: Bootstrap 5, Font Awesome.
- **Backend / Database**: Supabase (PostgreSQL).
- **Libraries**: SweetAlert2 / Bootstrap Modals for notifications.

## 📁 Project Structure

```text
SEM_3_FSD/
├── css/            # Custom stylesheets
├── js/             # Application logic & Supabase integration
│   ├── dash.js     # Dashboard logic
│   ├── login.js    # Authentication logic
│   ├── stock.js    # Inventory management
│   ├── sell.js     # Sales processing
│   └── ...
├── img/            # Static images and icons
├── database.sql    # Database schema for Supabase
├── README.md       # Project documentation
└── index.html      # Landing / Home page
```

## ⚙️ Setup Instructions

1. **Create a Supabase Project**:
   - Go to [Supabase](https://supabase.com/) and create a new project.
   - Go to the **SQL Editor** and paste the content of `database.sql` to create the tables.

2. **Configure API Keys**:
   - In each `.js` file in the `js/` folder, replace the Supabase URL and Anon Key with your project credentials:
     ```javascript
     const supabaseUrl = 'YOUR_SUPABASE_URL';
     const supabaseKey = 'YOUR_SUPABASE_ANON_KEY';
     ```

3. **Run Locally**:
   - Open `login.html` or `home.html` in your browser (preferably using a Live Server).

## 📊 Database Schema

The project uses the following tables:
- `users`: Stores user profile and credentials.
- `inventory`: Stores product details and stock levels.
- `sales`: Logs all sales transactions and profit calculations.
- `suppliers`: Stores vendor information.

---
**Developed for SEM-3 Full Stack Development (FSD) Project.**
