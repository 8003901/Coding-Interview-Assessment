# Coding Interview Assessment

## Project Structure

```
├── A/                  # Exercise A — Mystic Waves
├── B/                  # Exercise B — CargoCraft Fleet
├── C/                  # Exercise C — API questions
└── frontend/           # Exercise D — Frontend Coding Test
```

---

## Requirements

| Runtime  | Required      | Tested with |
|----------|---------------|-------------|
| Python   | ≥ 3.6         | 3.9.6       |
| Node.js  | ≥ 20.19.0     | v24.1.0     |

---

## A — Mystic Waves

### How to run

```bash
cd A
python main.py
```

Then follow the interactive prompts:
1. Enter the number of test cases (1–100)
2. For each test case, enter two space-separated integers (e.g., `5 3`)


---

## B — CargoCraft Fleet

A script that calculates the minimum and maximum number of spacecraft that can be built given `n` propulsion units. Each spacecraft requires an even number of units split across wings and body.

### How to run

```bash
cd B
python main.py
```

Then follow the interactive prompts:
1. Enter the number of test cases (1–1000)
2. For each test case, enter the total propulsion units `n` (1–10^18)


---

## C — API questions

Written answers covering Xero API integration patterns: connection verification, error diagnosis, pagination, rate limiting, and circuit breaker strategies. No code to run.

### How to read

Open [answer.md](C/answer.md) with your preferred Markdown editor.

---

## D — Frontend Coding Test

A Vue 3 + TypeScript + Vite single-page application showing a product detail page with variant selection, quantity control, add-to-cart functionality, and toast notifications.

### How to run

```bash
cd frontend
npm install
npm run dev
```

Then open the URL shown in the terminal (default: `http://localhost:5173`).

**Quick preview (after build):**

```bash
cd frontend
npm install
npm run build
open dist/index.html
```

**Other commands:**

| Command         | Description                         |
|-----------------|-------------------------------------|
| `npm run build` | Type-check and build for production |
| `npm run dev`   | For dev                             |
| `npm run lint`  | Run ESLint                          |

