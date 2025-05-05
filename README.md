# AuthenCore

**Identidad digital soberana, segura y portátil. Para siempre.**

AuthenCore es una plataforma innovadora que permite a cualquier persona crear, almacenar y compartir su identidad digital única, validada mediante documentos y verificada profesionalmente. Diseñada para un mundo descentralizado, brinda a los usuarios el control total sobre su información personal.

## ✨ Características principales

- Registro de identidad con ID digital exclusivo (ej: `AUTH-XXXX-XXXX`)
- Carga de foto de perfil y documento de identidad
- Modo profesional opcional con credenciales (título, matrícula, diploma)
- Inicio de sesión con ID y contraseña
- Visualización de perfil completo con QR interoperable
- Almacenamiento seguro en el backend
- Diseño adaptable y minimalista

## 🔍 Casos de uso

- Validación de identidad digital ante bancos, hospitales, gobiernos
- Centralización de datos personales y profesionales
- Acceso a servicios con solo mostrar un QR seguro

## 🌎 Tecnologías utilizadas

### Frontend
- HTML, CSS, JavaScript (Vanilla)
- Estructura modular con archivos separados
- Librería QRCode.js

### Backend
- Node.js + Express
- CORS habilitado para desarrollo
- Multer para gestión de archivos (foto, documentos, credenciales)
- Base de datos simulada en `users.json` para MVP

## ⚙️ Estructura del proyecto

```
AuthenCore/
├── backend/
│   ├── server.js
│   ├── db/
│   │   └── users.json
│   └── uploads/
├── frontend/
│   ├── index.html
│   ├── register.html
│   ├── login.html
│   ├── profile.html
│   ├── .nojekyll
│   └── assets/
│       ├── css/
│       │   └── style.css
│       ├── js/
│       │   ├── register.js
│       │   ├── login.js
│       │   └── profile.js
│       └── img/
│           └── AuthenCore.png
```

## 🔄 Futuro del proyecto

- Firma digital descentralizada
- Validación cruzada entre profesionales verificados
- Historial médico no editable
- Integración con blockchains para trazabilidad absoluta
- App móvil
- Sistema de cuenta freemium y suscripciones premium accesibles

## ⚡ Misión
Crear la infraestructura de identidad digital más confiable del mundo.

## 📈 Estado actual
Este proyecto se encuentra en su fase **MVP funcional**, con frontend y backend operativos en entorno local.

---

**Autenticidad y control para todos. AuthenCore es el nuevo estándar.**
