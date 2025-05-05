// backend/routes/auth.js

const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const router = express.Router();
const usersFile = path.join(__dirname, '../db/users.json');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Cargar usuarios desde archivo JSON
function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

// Guardar usuarios
function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

// Ruta para registrar usuarios
router.post('/register', upload.fields([
  { name: 'photo', maxCount: 1 },
  { name: 'document', maxCount: 1 },
  { name: 'credential', maxCount: 1 }
]), (req, res) => {
  const {
    id, fullName, birthdate, bio, password,
    isProfessional, title, license
  } = req.body;

  const users = loadUsers();
  if (users.find(u => u.id === id)) {
    return res.status(409).json({ error: 'El ID ya está registrado.' });
  }

  const user = {
    id,
    fullName,
    birthdate,
    bio,
    password,
    isProfessional: isProfessional === 'true',
    title,
    license,
    photo: req.files['photo']?.[0]?.filename || null,
    document: req.files['document']?.[0]?.filename || null,
    credential: req.files['credential']?.[0]?.filename || null
  };

  users.push(user);
  saveUsers(users);

  res.status(201).json({ message: 'Identidad registrada correctamente.' });
});

// Ruta para iniciar sesión
router.post('/login', (req, res) => {
  const { id, password } = req.body;
  const users = loadUsers();
  const user = users.find(u => u.id === id && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Credenciales inválidas.' });
  }

  res.json({
    id: user.id,
    fullName: user.fullName,
    birthdate: user.birthdate,
    bio: user.bio,
    isProfessional: user.isProfessional,
    title: user.title,
    license: user.license,
    photo: user.photo ? `/uploads/${user.photo}` : null,
    document: user.document ? `/uploads/${user.document}` : null,
    credential: user.credential ? `/uploads/${user.credential}` : null
  });
});

module.exports = router;
