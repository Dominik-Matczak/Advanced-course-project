# FAZA 1: Build aplikacji (Używamy Node.js do kompilacji)
FROM node:20-alpine AS builder

# Ustaw katalog roboczy
WORKDIR /app

# Kopiuj pliki package.json i package-lock.json
COPY package*.json ./

# Instaluj zależności
RUN npm install

# Kopiuj resztę plików źródłowych
COPY . .

# Build aplikacji (Zmień 'dist' jeśli używasz innego katalogu wynikowego)
RUN npm run build

# FAZA 2: Produkcyjny obraz Nginx (Serwowanie zbudowanej aplikacji)
FROM nginx:stable-alpine

# Kopiuj pliki zbudowanej aplikacji
COPY --from=builder /app/dist /usr/share/nginx/html

# Opcjonalne: kopiuj niestandardową konfigurację Nginx, jeśli jej używasz
# COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Domyślny port Nginx
EXPOSE 80

# Uruchom Nginx
CMD ["nginx", "-g", "daemon off;"]