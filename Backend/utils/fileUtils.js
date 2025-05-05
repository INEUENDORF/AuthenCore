// backend/utils/fileUtils.js

const fs = require('fs');
const path = require('path');

const usersFile = path.join(__dirname, '../db/users.json');

function loadUsers() {
  if (!fs.existsSync(usersFile)) return [];
  const data = fs.readFileSync(usersFile);
  return JSON.parse(data);
}

function saveUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

module.exports = {
  loadUsers,
  saveUsers
};
