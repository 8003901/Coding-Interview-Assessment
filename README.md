# Coding Interview Assessment

## Project Structure

```
├── A/                  # Exercise A — Mystic Waves
├── B/                  # Exercise B — CargoCraft Fleet
├── C/                  # Exercise C — API questions
└── frontend/           # Exercise D — Frontend Coding Test
```

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

### Assumptions
- Input `t` is between 1 and 100
- Each test case is exactly two integers separated by a space
- Output is `x` when `n` is odd, `0` when `n` is even

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

### Assumptions
- Input `t` is between 1 and 1000
- `n` can be up to 10^18 (uses Python big integers)
- If `n` is odd or `n == 2`, no valid configuration exists → outputs `-1`
- Each spacecraft uses at least 2 wings (+ 2 body = 4 units minimum), so `n` must be ≥ 4 and even
- If no valid b_max is found, the program naturally handles edge cases through integer constraints

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

| Command | Description |
|---------|-------------|
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

### Assumptions
- The product data and cart API are mocked (see `src/api/mockApi.ts`)
- The mock API has a 10% failure rate to demonstrate error handling
- Cart count resets on page reload (no persistent backend)
- Product images use `placehold.co` placeholder URLs
