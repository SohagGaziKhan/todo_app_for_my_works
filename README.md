# MERN Todo App

একটা full MERN stack (MongoDB, Express, React, Node) Todo application।

## Structure

```
mern-todo/
├── server/    # Express + MongoDB backend
└── client/    # React + Vite + Tailwind frontend
```

## Backend Setup (server/)

```bash
cd server
npm install
cp .env.example .env
```

`.env` ফাইলে তোমার MongoDB connection string বসাও:
```
MONGO_URI=mongodb://localhost:27017/todo_app
PORT=5000
```

MongoDB local এ না থাকলে [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) থেকে ফ্রি cluster বানিয়ে সেই connection string ব্যবহার করতে পারো।

Server চালাও:
```bash
npm run dev
```
Server চলবে: `http://localhost:5000`

## Frontend Setup (client/)

```bash
cd client
npm install
cp .env.example .env
```

Frontend চালাও:
```bash
npm run dev
```
App চলবে: `http://localhost:3000`

## API Endpoints

| Method | Endpoint          | কাজ                          |
|--------|-------------------|-------------------------------|
| GET    | /api/todos         | সব todo আনা (query: ?completed=true/false) |
| GET    | /api/todos/:id      | একটা নির্দিষ্ট todo আনা      |
| POST   | /api/todos          | নতুন todo তৈরি                |
| PUT    | /api/todos/:id      | todo update করা               |
| DELETE | /api/todos/:id      | todo delete করা               |

## Features

- Add, edit (double-click on text), delete, complete/incomplete toggle
- Priority levels: low / medium / high
- Filter: All / Active / Completed
- Loading এবং error states handle করা
- Clean separation: controllers, routes, models (backend) এবং components, hooks, services (frontend)

## Next Steps (deployment practice এর জন্য)

1. MongoDB Atlas দিয়ে production database সেটআপ করো
2. Backend কে Render/Railway/AWS EC2-তে deploy করো
3. Frontend কে Vercel/Netlify-তে deploy করো (অথবা EC2 + Nginx দিয়ে নিজে)
4. Environment variables production-এ ঠিকমতো সেট করো
5. CORS origin production URL অনুযায়ী restrict করো
