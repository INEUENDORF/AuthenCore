// backend/controllers/authController.js

const path = require('path');
const fs = require('fs');

const usersFile = path.join(__dirname, '../db/users.json');

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

exports.registerUser = (req, res) => {
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
};

exports.loginUser = (req, res) => {
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
};
