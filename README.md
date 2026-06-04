## Next-Gen Learning Dashboard Prototype

A futuristic, highly animated, dark-mode student dashboard prototype built as a high-fidelity frontend engineering challenge. This application leverages cutting-edge web architecture to stream real-time learning metrics with zero layout shifts and buttery-smooth performance.

---

## Tech Stack

| Layer       | Technology                                |
|-------------|-------------------------------------------|
| Framework   | Next.js 14 — App Router                   |
| Database    | Supabase (PostgreSQL + anon key)          |
| Styling     | Tailwind CSS 3                             |
| Animations  | Framer Motion 11                          |
| Icons       | Lucide React                              |
| Language    | TypeScript (strict)                       |
| Deployment  | Vercel                                    |

---

## Core Features & Technical Implementation

* **Data Architecture (Next.js RSC + Supabase):** Implemented a secure client-server split. Course payloads are streamed natively through Next.js Server Components (RSC) straight from the remote database instance, avoiding exposed browser-side API cycles and keeping client-side script allocations lean.
* **Bento Grid Layout:** Fully custom, semantic, and responsive 12-column Bento Grid structure that degrades gracefully from standard desktops down to collapsible tablet strips and mobile bottom-nav stacks.
* **Zero-Repaint Animation Engine:** Built on top of Framer Motion using strict spring physics configurations (`stiffness: 300`, `damping: 20`) for natural, organic motion design. Every layout transition, hover glow, and cascade entrance scales exclusively via `transform` and `opacity` properties to eliminate browser repaints and layout shifts.
* **Kinetic Micro-interactions:** Built utilizing Framer Motion's shared `layoutId` engine properties, giving navigational active highlights the ability to glide smoothly between nodes upon user interaction.

---

## Project Structure

```
student-dashboard/
├── app/
│   ├── globals.css         # CSS custom properties + base styles
│   ├── layout.tsx          # Root layout — fonts, metadata
│   ├── page.tsx            # Server Component — fetches courses via RSC
│   ├── loading.tsx         # Next.js page-level skeleton (navigation)
│   └── error.tsx           # Error boundary (Client Component)
│
├── components/
│   ├── BentoGrid.tsx       # Client Component — staggered grid + all tiles
│   ├── sidebar/
│   │   └── Sidebar.tsx     # Collapsible sidebar, tablet icons, mobile bottom nav
│   ├── tiles/
│   │   ├── HeroTile.tsx    # Greeting + streak + daily goal bar
│   │   ├── CourseCard.tsx  # Dynamic course tile (icon, title, progress bar)
│   │   ├── StatsCard.tsx   # Quick-stat tile (value + change badge)
│   │   └── ActivityTile.tsx # Contribution heatmap + weekly bar chart
│   └── ui/
│       ├── AnimatedProgressBar.tsx  # Framer Motion width animation
│       ├── SkeletonTile.tsx         # Pulsing shimmer skeleton grid
│       └── IconRenderer.tsx         # Maps icon_name strings → Lucide icons
│
├── lib/
│   ├── types.ts            # TypeScript interfaces (Course, Student, Stat)
│   ├── supabase.ts         # createClient + getCourses() with fallback
│   ├── mock-data.ts        # Fallback courses when Supabase is unconfigured
│   └── utils.ts            # cn(), getGreeting(), clamp()
│
├── supabase/
│   └── schema.sql          # CREATE TABLE + RLS + seed INSERT
│
├── .env.example            # Required env var template
└── README.md
```

---

## Architectural Choices

### Server / Client Component Split

```
app/page.tsx  ← Server Component
  └─ <Suspense fallback={<DashboardSkeleton />}>
       └─ <DashboardContent />  ← async Server Component, calls getCourses()
            └─ <BentoGrid courses={...} />  ← "use client" — handles animations
```

- Data fetching happens **on the server** using `@supabase/supabase-js` directly (no cookie-based auth needed for public reads).
- `BentoGrid` is a Client Component so it can use Framer Motion hooks.
- Individual tiles are also Client Components for hover/entrance animations.
- `loading.tsx` activates during Next.js page navigation (the `<Suspense>` boundary catches data-fetch suspension).

---

### Animation Architecture

- **Staggered entrance** — `motion.section` with `staggerChildren` variant propagates to each `TileWrapper > motion.div`.
- **Card hover** — `whileHover` with `type: "spring", stiffness: 300, damping: 20` on every tile — zero layout shifts (only `scale` + `boxShadow`, never width/height/margin).
- **Progress bars** — `useInView` triggers a width animation from `0%` → `value%` when the bar enters the viewport.
- **Sidebar highlight** — `layoutId="sidebar-highlight"` on the active state indicator lets Framer Motion smoothly morph between nav items.
- **Contribution heatmap** — each cell staggers in with `scale: 0 → 1` using a tiny `delay = index * 0.003`.

### Zero Layout Shifts

All hover animations use only `transform` (`scale`, `translateY`) and `opacity` — never `width`, `height`, `padding`, or `margin`. This avoids browser repaints and CLS.

---

## Responsive Architecture Specs

The viewport behaves gracefully across all strict hardware layout breakpoints:

* **Desktop (`> 1024px`):** Implements a comprehensive, expanded 12-column bento configuration with a sticky, fully descriptive navigational left sidebar panel.
* **Tablet (`768px - 1024px`):** The navigation sidebar transitions gracefully into a compact icon strip, expanding real estate for the central bento layout to restack into a clean, double-column viewport distribution.
* **Mobile (`< 768px`):** Navigation scales into a fixed bottom action bar utility. The grid automatically maps into a singular, high-performance vertical scrolling column track to accommodate single-hand operations.

---

## Responsive Behaviour

| Breakpoint  | Sidebar                        | Grid          |
|-------------|--------------------------------|---------------|
| `< 768px`   | Fixed bottom navigation bar    | 1 column      |
| `768–1024px`| Icon-only sidebar (64 px wide) | 2 columns     |
| `> 1024px`  | Full sidebar (240 px, collapsible) | 4 columns |

---

## Challenges & Notes

- **Framer Motion + RSC** — Framer Motion requires a browser runtime, so every component that uses it must be a Client Component (`"use client"`). The solution is a clean Server → Client handoff: RSC fetches data, passes it as props to the root Client Component (`BentoGrid`), which renders everything animated.
- **Fallback data** — `getCourses()` returns `mockCourses` when env vars are missing. This means the UI is always functional during local development and CI.
- **Grain texture** — Implemented as an inline SVG `feTurbulence` filter injected via CSS `background-image` on `.bento-tile::before` — zero extra network requests.
