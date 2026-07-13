# SystemBe — Sitio web

Sitio institucional de **SystemBe**, fábrica de software. Página estática (HTML, CSS y JavaScript, sin dependencias ni build).

## Estructura

```
systembe/
├── index.html          # Página principal
├── gracias.html        # Página de agradecimiento tras enviar el formulario
└── assets/
    ├── css/styles.css  # Estilos (paleta de marca: azul marino + naranja)
    ├── js/main.js      # Menú móvil, formulario y utilidades
    └── img/            # Logo e íconos
```

## Desarrollo local

Al ser estático, basta con abrir `index.html` en el navegador, o servirlo con cualquier servidor estático:

```bash
# Opción con Python
python3 -m http.server 8080
# luego abre http://localhost:8080
```

## Formulario de contacto

El formulario usa [Formspree](https://formspree.io). El endpoint se configura en
`assets/js/main.js` (`FORMSPREE_ENDPOINT`). Datos de contacto:

- Correo: contacto@systembe.tech
- Teléfono / WhatsApp: 55 5106 7741
- Web: https://systembe.tech

## Despliegue

El sitio se publica en `/var/www/html` del servidor de producción (Linux).
Ver `deploy.sh` para el script de despliegue vía `rsync` sobre SSH.
