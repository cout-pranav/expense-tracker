# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## About this project

This is the starter project for a Claude Code course (codewithmosh.com). It's a small React expense/finance tracker that **intentionally contains a bug, poor UI, and messy code** — these are meant to be found and fixed incrementally, so don't assume unusual patterns here are accidental unless asked to investigate them.

## Commands

```bash
npm install       # install dependencies
npm run dev       # start Vite dev server at http://localhost:5173
npm run build     # production build
npm run preview   # preview the production build locally
npm run lint      # run ESLint over the project
```

There is no test suite configured in this repo.

## Architecture

This is a plain Vite + React (v19) app with no router, no state management library, and no backend. State and rendering are split across a few components, all under `src/`:

- [src/main.jsx](src/main.jsx) — entry point, mounts `<App />` into `#root` in `StrictMode`.
- [src/App.jsx](src/App.jsx) — owns the `transactions` array and the `filterType`/`filterCategory` state (all local `useState`, no persistence — transactions reset on reload). Composes `Summary`, `TransactionForm`, and `TransactionList`, passing `transactions` down and handling new transactions via a `handleAddTransaction` callback passed to `TransactionForm`.
- [src/Summary.jsx](src/Summary.jsx) — takes `transactions` as a prop and derives `totalIncome`/`totalExpenses`/`balance` to render the summary cards.
- [src/TransactionForm.jsx](src/TransactionForm.jsx) — owns its own form-local state (description, amount, type, category) and calls the `onAddTransaction` prop with a new transaction object on submit.
- [src/TransactionList.jsx](src/TransactionList.jsx) — owns the type/category filtering logic and renders the filter controls plus the transactions table, driven by `filterType`/`filterCategory` state lifted into `App`.
- [src/App.css](src/App.css) / [src/index.css](src/index.css) — styling.

Because state is passed via props rather than context or a store, adding new transaction fields typically touches `App.jsx`, `TransactionForm.jsx`, and `TransactionList.jsx` together.

ESLint config ([eslint.config.js](eslint.config.js)) uses the flat-config format with `js.configs.recommended`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (Vite preset).
