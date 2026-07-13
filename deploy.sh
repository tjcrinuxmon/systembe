#!/usr/bin/env bash
#
# deploy.sh — Publica el sitio estático de SystemBe en el servidor de producción.
#
# Uso:
#   ./deploy.sh
#
# Copia SOLO los archivos del sitio (no .git, ni scripts) al servidor vía rsync
# sobre SSH. NO usa --delete, por lo que NO borra archivos de otros sistemas que
# ya vivan en el servidor.
#
# Ajusta las variables de abajo con los datos de tu servidor.
# ---------------------------------------------------------------------------
set -euo pipefail

# ===== Configuración (EDITA ESTO) =====
SSH_HOST="TU_IP_O_DOMINIO"            # p.ej. 200.1.2.3  o  systembe.tech
SSH_USER="TU_USUARIO"                 # el usuario con el que entras por SSH
SSH_PORT="22"                         # tu puerto SSH (cámbialo si no es el 22)
REMOTE_DIR="/var/www/html/systembe"   # destino: subcarpeta propia (no toca otros sitios)
# SSH_KEY="$HOME/.ssh/id_ed25519"     # (opcional) si algún día usas llave privada
# ======================================

# Archivos/carpetas a publicar (lista blanca: solo lo del sitio)
INCLUDE=(index.html gracias.html assets README.md)

# Excluir siempre lo que no debe ir al servidor
EXCLUDES=(--exclude ".git" --exclude ".gitignore" --exclude ".gitattributes" \
          --exclude "deploy.sh" --exclude "*.md")

SSH_OPTS="-p ${SSH_PORT}"
if [[ -n "${SSH_KEY:-}" ]]; then
  SSH_OPTS="${SSH_OPTS} -i ${SSH_KEY}"
fi

echo "▶ Publicando en ${SSH_USER}@${SSH_HOST}:${REMOTE_DIR} (puerto ${SSH_PORT})"
echo "  Archivos: ${INCLUDE[*]}"
echo

rsync -avz --human-readable \
  -e "ssh ${SSH_OPTS}" \
  "${EXCLUDES[@]}" \
  "${INCLUDE[@]}" \
  "${SSH_USER}@${SSH_HOST}:${REMOTE_DIR}/"

echo
echo "✔ Listo. Verifica en el navegador tu dominio o http://${SSH_HOST}/"
