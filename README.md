# Transaction App (React Front End)

A React single-page application for viewing, creating, updating, and deleting transactions, plus running A/B tests and regression analysis against a Flask back end.

## Table of Contents

- [Demo](#demo)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Available Scripts](#available-scripts)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

---

## Demo

> *Add a link to your live demo here.*

---

## Features

- **Transactions**
    - List transactions with date, time, and amount
    - Create, edit, and delete transactions
- **A/B Testing**
    - Compare two groups (by half, weekday, time, or month)
    - Perform t-tests and display a boxplot image
- **Regression Analysis**
    - Select a date range and period (all, morning, noon, afternoon)
    - Display slope, intercept, R², and a trend-line chart

---

## Tech Stack

- **React** (Hooks)
- **Axios** for HTTP requests
- **Bootstrap 5** for UI components
- **ESLint** + **Prettier** for code quality

---

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v16 or higher
- npm (bundled with Node.js)
- A running Flask API at `http://localhost:5000/api`

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/<your-org>/transaction-app-react.git
   cd transaction-app-react
   ```
2. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- ``: Run the app in development mode at `http://localhost:3000`
- ``: Build the app for production (outputs to `build/`)
- ``: Lint source files with ESLint

---

## Configuration

Create a `.env` file in the project root (optional) to override defaults:

```env
REACT_APP_API_BASE_URL=http://localhost:5000/api
```

The default `apiClient.js` uses `/api` as the base URL.

---

## Project Structure

```plaintext
src/
├── apiClient.js         # Axios instance & baseURL
├── index.js             # React entry point
├── App.jsx              # Routes & layout
├── components/          # Reusable UI components
│   └── TransactionTable.jsx
├── pages/
│   ├── Transactions/
│   │   └── TransactionsPage.jsx
│   └── Analysis/
│       ├── AbTestPage.jsx
│       └── RegressionPage.jsx
└── styles/              # Custom CSS (optional)
```

---

## Usage

1. Ensure the Flask API is running:
   ```bash
   cd flask-backend
   flask run
   ```
2. Start the React app:
   ```bash
   cd transaction-app-react
   npm start
   ```
3. Open your browser at `http://localhost:3000`.
4. Navigate to **Transactions** to manage records.
5. Navigate to **Analysis** for A/B tests and regression.

---

## Contributing

1. Fork the repository
2. Create a branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. Commit your changes:
   ```bash
   git commit -m "feat: add new feature"
   ```
4. Push to your branch:
   ```bash
   git push origin feature/your-feature
   ```
5. Open a Pull Request.

Please run `npm run lint` before submitting.

---

## License

### Known Issues
Dev-tooling vulnerabilities
A few high/medium severity advisories remain in transitive dev dependencies (SVGO, postcss, webpack-dev-server). These run only at build time and do not affect production code. They’ll be fixed upstream in a future Create-React-App release.

