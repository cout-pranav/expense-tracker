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

This is a plain Vite + React (v19) app with no router, no state management library, and no backend — everything lives in one component:

- [src/main.jsx](src/main.jsx) — entry point, mounts `<App />` into `#root` in `StrictMode`.
- [src/App.jsx](src/App.jsx) — the entire application. All transaction state, derived totals, add-transaction form logic, and filtering logic live here as local `useState` hooks; there is no persistence (transactions reset on reload) and no component decomposition (table, form, and summary cards are all inlined in one JSX tree).
- [src/App.css](src/App.css) / [src/index.css](src/index.css) — styling.

Because the whole app is one component, most changes (new fields, new filters, bug fixes) will touch `App.jsx` directly rather than requiring changes across a module boundary.

ESLint config ([eslint.config.js](eslint.config.js)) uses the flat-config format with `js.configs.recommended`, `eslint-plugin-react-hooks`, and `eslint-plugin-react-refresh` (Vite preset).
