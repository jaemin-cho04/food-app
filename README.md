# JMT - 존맛탱

**JMT** (존맛탱 — Korean slang for "incredibly delicious") is a Seoul restaurant discovery app built as a social feed. Browse restaurants, rate them with likes or dislikes, filter by cuisine, and check live wait times — all in a clean, mobile-first interface.

---

## Features

- **Restaurant Feed** — Scrollable card feed with restaurant photos, net like scores, and wait time badges
- **Reactions** — Three-tier interaction system: Like, Luv It (double like), and Nah (dislike)
- **Smart Scoring** — Net likes calculated as `(likes + double_likes) - dislikes`; high-rated spots are highlighted in orange
- **Search & Filter** — Search by restaurant name; filter by cuisine (Korean, Italian, Cafe, Western, Japanese)
- **Restaurant Detail Pages** — Full-screen image header, stats (net likes, visit count, wait time), menu highlights, and a waitlist join button
- **Magic Link Auth** — Passwordless sign-in via Supabase email OTP
- **User Profiles** — Account management with liked restaurants and reviews (in progress)

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | [Next.js 16](https://nextjs.org/) (Pages Router) |
| UI Library | [React 19](https://react.dev/) |
| Styling | [Tailwind CSS v3](https://tailwindcss.com/) |
| Database & Auth | [Supabase](https://supabase.com/) |

---

## Project Structure

```
src/
├── components/
│   ├── FeedCard.js      # Restaurant card with image, score, and reaction buttons
│   ├── FilterBar.js     # Sticky search input and cuisine category pills
│   └── Navbar.js        # Top navigation with JMT branding and profile link
├── lib/
│   ├── algo.js          # Net likes calculation and wait time formatting
│   └── db.js            # Supabase client initialization
├── pages/
│   ├── index.js         # Main feed page
│   ├── login.js         # Magic link authentication
│   ├── profile.js       # User account page
│   └── restaurant/
│       └── [id].js      # Dynamic restaurant detail page
└── styles/
    └── globals.css
```

---

## Getting Started

### Prerequisites

- Node.js 18+
- A [Supabase](https://supabase.com/) project with a `restaurants` table

### Supabase Schema

Your `restaurants` table should include these columns:

| Column | Type | Description |
|---|---|---|
| `id` | int8 (primary key) | Unique restaurant ID |
| `name` | text | Restaurant name |
| `cuisine` | text | e.g. Korean, Italian, Cafe |
| `district` | text | Neighborhood in Seoul |
| `image` | text | Image URL |
| `likes` | int4 | Like count |
| `double_likes` | int4 | "Luv It" count |
| `dislikes` | int4 | Dislike count |
| `queue` | int4 | Current wait time in minutes |
| `visits` | int4 | Total visit count |

### Installation

```bash
# Clone the repo
git clone https://github.com/your-username/food-app.git
cd food-app

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
```

Edit `.env.local` with your Supabase credentials:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### Run Locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Design Notes

- Mobile-first layout capped at `max-w-md` to feel native on phones
- Sticky navbar and sticky filter bar keep navigation always accessible
- Orange (`orange-600`) is the primary accent, reflecting food and warmth
- Restaurant cards use a frosted-glass score badge and a queue time overlay on the photo

---

## Roadmap

- [ ] Persist user likes/dislikes to their profile
- [ ] Real menu data from the database
- [ ] Working waitlist / reservation flow
- [ ] Reviews and comments system
- [ ] Map view of Seoul restaurants

---

## License

MIT
