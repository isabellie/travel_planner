# Travel Planner AI

A lightweight app where the user enters:

- destination
- number of days
- interests
- budget

The app generates with OpenAI:

- day-by-day plan
- activities
- restaurants
- hidden gems
- packing list

## Project structure

```text
travel_planner/
  server/
    src/
      index.js
      routes/
        plan.js
      services/
        openai.js
      prompts/
        travelPlannerPrompt.js
      utils/
        validateTripInput.js
  web/
    vite.config.js
    index.html
    src/
      App.jsx
      main.jsx
      styles.css
  .env.example
  .gitignore
  package.json
  README.md
```

## Quick start

1. Install dependencies:
   npm install
2. Copy env file:
   cp .env.example .env
3. Add your OpenAI API key in `.env`
4. Run app:
   npm run dev
5. Open:
   http://localhost:5173

## Scripts

- `npm run dev`: Starts Express API and React/Vite frontend in parallel.
- `npm run build:web`: Builds the React app to `web/dist`.
- `npm run dev:server`: Starts only backend API server.
- `npm run dev:web`: Starts only React/Vite frontend.
