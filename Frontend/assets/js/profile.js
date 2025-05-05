// assets/js/profile.js

document.addEventListener('DOMContentLoaded', () => {
  const profileDiv = document.getElementById('profileData');
  const qrDiv = document.getElementById('qrCode');
  const storedUser = localStorage.getItem('authencore_user');

  if (!storedUser) {
    profileDiv.innerHTML = '<p style="color:red">No se encontró una sesión activa.</p>';
    return;
  }

  const user = JSON.parse(storedUser);
  profileDiv.innerHTML = `
    <p><strong>ID:</strong> ${user.id}</p>
    <p><strong>Nombre:</strong> ${user.fullName}</p>
    <p><strong>Nacimiento:</strong> ${user.birthdate}</p>
    <p><strong>Bio:</strong> ${user.bio}</p>
    <p><strong>Profesional:</strong> ${user.isProfessional ? 'Sí' : 'No'}</p>
    ${user.isProfessional ? `<p><strong>Título:</strong> ${user.title}</p>
    <p><strong>Matrícula:</strong> ${user.license}</p>` : ''}
    ${user.photo ? `<p><img src="http://localhost:3000${user.photo}" style="max-width:120px;border-radius:6px;" /></p>` : ''}
    ${user.document ? `<p><a href="http://localhost:3000${user.document}" target="_blank">📄 Ver documento</a></p>` : ''}
    ${user.credential ? `<p><a href="http://localhost:3000${user.credential}" target="_blank">📑 Ver credencial</a></p>` : ''}
  `;

  const sharedData = {
    id: user.id,
    fullName: user.fullName,
    birthdate: user.birthdate,
    isProfessional: user.isProfessional
  };

  QRCode.toCanvas(JSON.stringify(sharedData), { width: 220 }, (err, canvas) => {
    if (!err) qrDiv.appendChild(canvas);
  });
});
