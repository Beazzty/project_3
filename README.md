# VivaLinga

**VivaLinga** is a MERN stack single-page application designed to help users learn and practice Spanish vocabulary through progressive difficulty levels. Users can create an account, take vocabulary quizzes, and track their progress through beginner, intermediate, and advanced stages.

---

## 🚀 Live Demo

🌐 [Deployed App on Render](https://project-3-k2nt.onrender.com)  
📂 [GitHub Repository](https://github.com/Beazzty/project_3)

---

## 🧠 Motivation

Learning a new language can be difficult without structure and progression. VivaLinga offers a gamified experience to help users build and test their vocabulary knowledge at increasing levels of difficulty — all within a responsive and engaging user interface.

---

## 🛠️ Technologies Used

- **Frontend**: React, TypeScript, Vite
- **Backend**: Node.js, Express.js, GraphQL, Apollo Server
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT
- **CI/CD**: GitHub Actions, Render
- **Other Tools**: dotenv, ts-node-dev

---

## 📷 Screenshots

> *(Insert screenshots)*

---

## 📂 Installation

1. Clone the repo:
   ```bash
   git clone https://github.com/Beazzty/project_3.git
   cd project_3
   ```

2. Install client and server dependencies:
   ```bash
   npm install --prefix client
   npm install --prefix server
   ```

3. Build the client:
   ```bash
   npm run build --prefix client
   ```

4. Create a `.env` file in the `server/` folder:
   ```env
   MONGODB_URI=your-mongodb-uri
   JWT_SECRET_KEY=your-secret-key
   ```

5. Start the server (after building):
   ```bash
   npm run build --prefix server
   node server/dist/server.js
   ```

---

## 🔐 Environment Variables

Inside your `server/.env` file:
```env
MONGODB_URI=your-mongodb-uri
JWT_SECRET_KEY=your-jwt-secret
```

---

## 📈 Future Development

- Add vocabulary progress tracking by user
- Admin panel for uploading new word sets
- Audio-based pronunciation quizzes
- Leaderboard to encourage competition

---

## 👥 Team

- Iliana Peña  
- Isse Farah
- Quinn Brown  
- Byron Tobe
- Obi Mazagri

---

## 📜 License

This project is for educational purposes only. All rights reserved.
