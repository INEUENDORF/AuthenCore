// assets/js/register.js

document.getElementById('registerForm').addEventListener('submit', async function (e) {
  e.preventDefault();

  const form = e.target;
  const formData = new FormData(form);

  const isProfessional = document.getElementById('isProfessional').checked;
  formData.set('isProfessional', isProfessional);

  const title = document.getElementById('title').value;
  const license = document.getElementById('license').value;
  if (isProfessional) {
    formData.set('title', title);
    formData.set('license', license);
  }

  try {
    const res = await fetch('http://localhost:3000/api/register', {
      method: 'POST',
      body: formData
    });

    const data = await res.json();
    const messageDiv = document.getElementById('message');

    if (res.ok) {
      messageDiv.innerHTML = `<p style="color:green">✅ ${data.message}</p>`;
      form.reset();
      document.getElementById('title').style.display = 'none';
      document.getElementById('license').style.display = 'none';
    } else {
      messageDiv.innerHTML = `<p style="color:red">❌ ${data.error}</p>`;
    }
  } catch (err) {
    console.error(err);
    document.getElementById('message').innerHTML = `<p style="color:red">❌ Error al conectar con el servidor</p>`;
  }
});

// Mostrar campos profesionales si se marca el checkbox
document.getElementById('isProfessional').addEventListener('change', function () {
  const show = this.checked;
  document.getElementById('title').style.display = show ? 'block' : 'none';
  document.getElementById('license').style.display = show ? 'block' : 'none';
});
