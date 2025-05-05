// assets/js/login.js

document.getElementById('loginForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const id = form.id.value;
  const password = form.password.value;

  try {
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ id, password })
    });

    const data = await res.json();
    const loginMessage = document.getElementById('loginMessage');

    if (res.ok) {
      loginMessage.innerHTML = `<p style='color:green'>✅ Bienvenido, ${data.fullName}</p>`;
      localStorage.setItem('authencore_user', JSON.stringify(data));
      window.location.href = './profile.html';
    } else {
      loginMessage.innerHTML = `<p style='color:red'>❌ ${data.error}</p>`;
    }
  } catch (err) {
    console.error(err);
    document.getElementById('loginMessage').innerHTML = `<p style='color:red'>❌ Error al conectar con el servidor</p>`;
  }
});
