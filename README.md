# EcoHaul — Waste Transport (Web Programming II Homework)

Node.js / Express / EJS / Mongoose seminar homework based on the Authentication lesson.

## Team

| Member | Neptun | GitHub |
|--------|--------|--------|
| Tanvir Hasan | C0FMUG | tanvir-pr |
| Islam Md Tariqul | WEP2KE | tariqul71 |

Repository: https://github.com/tanvir-pr/web-lab

## Suggested ownership

- **Tanvir:** theme, auth menus, Contact, Messages, documentation
- **Tariqul:** DB models/seed, Graph, Admin CRUD, Render + MongoDB Atlas

## Local setup

```bash
npm install
# edit .env (copy from .env.example)
npm run seed
npm start
```

Open http://localhost:3000

### Seeded login

- Admin: `admin` / `admin123`
- Registered visitor: `demo` / `user123`

## Menus (as in the homework task)

- Not logged in: Mainpage, Database, Contact, Login, Registration
- Graph: public (task does not set a role for Graph)
- Messages: only logged-in users
- CRUD: only admin (`services` table)

## Theme

Free responsive HTML5/CSS3 theme adapted from **[HTML5 UP](https://html5up.net/)** free template patterns (EcoHaul waste-transport look). Name this theme in the PDF documentation.

## Deploy (Render + MongoDB Atlas) — mandatory

1. Create a free cluster on [MongoDB Atlas](https://www.mongodb.com/cloud/atlas), DB name e.g. `waste_transport`, Network Access `0.0.0.0/0`.
2. Run locally once against Atlas: set `MONGO_URI` / `SESSION_MONGO_URI` in `.env`, then `npm run seed`.
3. Push this repo to GitHub (public).
4. On [Render](https://render.com): New → Web Service → this repo.
   - Build: `npm install`
   - Start: `node app.js`
   - Env vars: `MONGO_URI`, `SESSION_MONGO_URI`, `SESSION_SECRET`
5. Open the Render URL and test guest / demo / admin.

## Data source

Homework database **08-Waste transport** (`services`, `calendar`, `resdems`).
