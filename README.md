# JMT (존맛탱)

A mobile-first food discovery app for finding and rating restaurants in Seoul. Browse the feed, filter by cuisine, and vote on spots with a like/love/dislike system.

## Stack

- **Next.js** (Pages Router)
- **Supabase** — database + magic link auth
- **Tailwind CSS**

## Getting Started

1. Clone the repo and install dependencies:

```bash
npm install
```

2. Create a `.env.local` file based on `.env.example` and fill in your Supabase credentials:

```bash
cp .env.example .env.local
```

3. Run the dev server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Supabase Schema

The app expects a `restaurants` table with the following columns:

| Column         | Type    | Description                     |
|----------------|---------|---------------------------------|
| id             | int     | Primary key                     |
| name           | text    | Restaurant name                 |
| cuisine        | text    | e.g. Korean, Italian, Cafe      |
| district       | text    | Neighborhood in Seoul           |
| image          | text    | Image URL                       |
| queue          | int     | Current wait time in minutes    |
| likes          | int     | Like count                      |
| double_likes   | int     | Love count                      |
| dislikes       | int     | Dislike count                   |
| visits         | int     | Total visit count               |

## Project Structure

```
src/
  components/
    FeedCard.js      # Restaurant card with vote buttons
    FilterBar.js     # Search input + cuisine filter chips
    Navbar.js        # Top nav with logo and profile link
  lib/
    db.js            # Supabase client
    algo.js          # Net likes formula, wait time formatter
  pages/
    index.js         # Main feed
    login.js         # Magic link login
    profile.js       # User profile + sign out
    restaurant/
      [id].js        # Restaurant detail page
```
