// Menú móvil
const toggle = document.getElementById('navToggle');
const nav = document.getElementById('nav');

toggle.addEventListener('click', () => {
  const open = nav.classList.toggle('is-open');
  toggle.setAttribute('aria-expanded', String(open));
  toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
});

// Cerrar el menú al hacer clic en un enlace (móvil)
nav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
  });
});

// Año dinámico en el footer
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Formulario de contacto =====
// Sin backend: compone un correo a contacto@systembe.tech con los datos.
// Para envío directo (sin abrir el cliente de correo), crea un endpoint en
// https://formspree.io y ponlo aquí:
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/xlgqezvr';
const CONTACT_EMAIL = 'contacto@systembe.tech';

const form = document.getElementById('contactForm');
const note = document.getElementById('formNote');

if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    note.className = 'form__note';

    const data = {
      nombre: form.nombre.value.trim(),
      email: form.email.value.trim(),
      telefono: form.telefono.value.trim(),
      empresa: form.empresa.value.trim(),
      mensaje: form.mensaje.value.trim(),
    };

    if (!data.nombre || !data.email || !data.mensaje) {
      note.textContent = 'Por favor completa nombre, correo y mensaje.';
      note.classList.add('is-err');
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
      note.textContent = 'El correo no parece válido.';
      note.classList.add('is-err');
      return;
    }

    // Opción A: envío directo con Formspree (si hay endpoint configurado)
    if (FORMSPREE_ENDPOINT) {
      try {
        note.textContent = 'Enviando…';
        const payload = new FormData(form);
        // Asunto personalizado que verás en tu bandeja de entrada
        const conEmpresa = data.empresa ? ` (${data.empresa})` : '';
        payload.set('_subject', `🚀 Nuevo proyecto desde systembe.tech — ${data.nombre}${conEmpresa}`);

        const res = await fetch(FORMSPREE_ENDPOINT, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: payload,
        });
        if (res.ok) {
          form.reset();
          // Redirige a la página de agradecimiento
          window.location.href = 'gracias.html';
        } else {
          throw new Error('bad response');
        }
      } catch {
        note.textContent = 'No se pudo enviar. Escríbenos a ' + CONTACT_EMAIL + '.';
        note.classList.add('is-err');
      }
      return;
    }

    // Opción B (por defecto): abrir el cliente de correo con el mensaje listo
    const asunto = `Nuevo proyecto — ${data.nombre}`;
    const cuerpo =
      `Nombre: ${data.nombre}\n` +
      `Correo: ${data.email}\n` +
      `Teléfono: ${data.telefono || '—'}\n` +
      `Empresa: ${data.empresa || '—'}\n\n` +
      `Mensaje:\n${data.mensaje}\n`;
    window.location.href =
      `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(asunto)}&body=${encodeURIComponent(cuerpo)}`;
    note.textContent = 'Abrimos tu correo para enviar el mensaje. ¡Gracias!';
    note.classList.add('is-ok');
  });
}
