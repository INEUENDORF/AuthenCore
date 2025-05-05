// backend/models/User.js

class User {
  constructor({ id, fullName, birthdate, bio, password, isProfessional, title, license, photo, document, credential }) {
    this.id = id;
    this.fullName = fullName;
    this.birthdate = birthdate;
    this.bio = bio;
    this.password = password;
    this.isProfessional = isProfessional === 'true';
    this.title = title;
    this.license = license;
    this.photo = photo || null;
    this.document = document || null;
    this.credential = credential || null;
  }
}

module.exports = User;
