# ValoCoach – Valorant Player Performance Dashboard

Modern, responsive single-page application for visualizing and analyzing personal Valorant match history and statistics.

                  SETUP INSTRUCTIONS
Follow these steps to run the project locally:
1. Prerequisites
Make sure you have installed:

Node.js v18.17+ (or higher)
pnpm, npm, or yarn (pnpm recommended for faster installs)

2. Clone the Repository
Bashgit clone https://github.com/your-username/valocoach.git
cd valocoach
3. Install Dependencies
Bash# Recommended (fastest)
pnpm install

# Or with npm
npm install

# Or with yarn
yarn install
4. Run the Development Server
Bash# With pnpm (recommended)
pnpm dev

# Or npm
npm run dev

# Or yarn
yarn dev

Next.js runs on:
http://localhost:3000

### Features

### Core functionality
- Player profile card with avatar, rank progression, leaderboard position
- Aggregated career statistics (K/D, HS%, ACS, win rate)
- Filterable match history (All / Won / Lost)
- Search by map name or agent
- Detailed match modal with combat, accuracy and damage breakdown

### Polish & UX enhancements
- Dark / Light theme toggle (persisted via localStorage – optional extension)
- Staggered card entrance animations
- Responsive grid layout (mobile → tablet → desktop)
- Map performance visualization (win-rate bars + key stats per map)
- Loading state + graceful error handling
- Semantic HTML & good accessibility basics (aria-labels, focus states)

### Technical highlights
- Next.js App Router (App Router + Server Components where appropriate)
- TypeScript end-to-end
- `styled-jsx` + CSS variables for theming
- `useMemo` + `useCallback` optimizations for filtering & stats aggregation
- Custom responsive breakpoints & fluid typography




## Tech Stack

| Category             | Technology                              | Purpose                                      |
|----------------------|-----------------------------------------|----------------------------------------------|
| Framework            | Next.js 14 (App Router)                 | SSR / App routing / image optimization       |
| Language             | TypeScript                              | Type safety across the whole codebase        |
| Styling              | styled-jsx + CSS variables              | Scoped styles + easy dark mode               |
| Icons                | lucide-react                            | Consistent, tree-shakeable icons             |
| Data fetching        | native `fetch`                          | Static JSON in `/public`                     |
| Performance          | useMemo, useCallback                    | Prevent unnecessary re-renders               |
| Deployment target    | Vercel / Netlify                        | Easy previews & CI                           |

## Project Structure (most important folders/files)

```text
app/
├── layout.tsx
├── page.tsx                ← main dashboard
components/
├── PlayerProfile.tsx
├── OverallStats.tsx
├── FilterBar.tsx
├── SearchBar.tsx
├── MatchCard.tsx
├── MatchModal.tsx
├── MapPerformanceChart.tsx
public/
├── player.json             ← static data
├── player_card_link.png    ← avatar (or remote URL)
types/
└── player.ts               ← central type definitions

          CHALLENGES & LEARNING
          
I faced just 3 challengges while building this project and also learnt lots of new things also,
 
 Challenges and how i soved them.

Consistent dark/light theming with styled-jsx
→ Passing isDarkMode prop many levels deep gets cumbersome
→ Next step: CSS variables + class strategy or next-themes.

Creating responsive bar chart without library
→ Learned to use percentage widths + minmax grid + clamp() for fluid typography.

Polish takes time
→ ~40% of total time went into animations, hover states, loading UI, mobile fixes



            TIME SPENT 
I spent a total of 10-13 hours on this project