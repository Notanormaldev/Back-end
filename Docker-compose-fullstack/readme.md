# Docker Compose Full Stack Setup (Frontend + Backend)

## 1. Frontend aur Backend ke liye Dockerfile banao

Har project folder (`Frontend` aur `Backend`) ke andar apna Dockerfile rakho.

Backend Dockerfile example:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["node", "server.js"]
```

Frontend Dockerfile example:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

CMD ["npm", "run", "dev"]
```

---

## 2. .dockerignore banao

Frontend aur Backend dono me:

```text
node_modules
npm-debug.log
```

Isse local node_modules image me copy nahi honge.

---

## 3. docker-compose.yml banao

Named volumes use karo taaki container ke node_modules local folder se overwrite na ho.

```yaml
services:
  backend:
    build: ./Backend
    ports:
      - "3000:3000"
    volumes:
      - "./Backend:/app"
      - "backend_node_modules:/app/node_modules"

  frontend:
    build: ./Frontend
    ports:
      - "5173:5173"
    volumes:
      - "./Frontend:/app"
      - "frontend_node_modules:/app/node_modules"

volumes:
  backend_node_modules:
  frontend_node_modules:
```

---

## 4. Vite ko Docker compatible banao

vite.config.js me:

```js
server: {
  host: "0.0.0.0",
  proxy: {
    "/api": {
      target: "http://backend:3000",
      changeOrigin: true,
      secure: false,
    },
  },
},
```

### host: "0.0.0.0" kyu?

Container ke bahar browser se Vite access karne ke liye.

### target: "http://backend:3000" kyu?

Docker Compose me service name hi hostname hota hai.

---

## 5. Nodemon Watch Mode

Backend package.json:

```json
{
  "scripts": {
    "dev": "nodemon -L server.js"
  }
}
```

Frontend package.json:

```json
{
  "scripts": {
    "dev": "vite"
  }
}
```

`-L` Windows + Docker file watching issues solve karta hai.

---

## 6. Project Start Karo

```bash
docker compose up
```

Ab:

* Frontend automatically chalega
* Backend automatically chalega
* Code changes live detect hongi
* Nodemon backend restart karega
* Vite frontend reload karega

Alag se `npm run dev` chalane ki zarurat nahi.

---

## 7. Naya Package Install Karne Par

Example:

```bash
npm install cors
```

Ya koi bhi new dependency install karo.

Important:

Container ke existing node_modules me ye package automatically nahi aayega.

Run:

```bash
docker compose down -v
docker compose up --build
```

### Kyu?

* `-v` old node_modules volumes delete karta hai
* `--build` image rebuild karta hai
* Naye packages container me install ho jate hain

Agar `down -v` nahi karoge to kabhi-kabhi old node_modules volume ki wajah se `MODULE_NOT_FOUND` errors aa sakte hain.

Example:

```text
Cannot find package 'cors'
ERR_MODULE_NOT_FOUND
```

Iska common fix:

```bash
docker compose down -v
docker compose up --build
```

---

## Daily Workflow

Code change:

```bash
Save File
```

Bas. Nodemon aur Vite automatically reload karenge.

New npm package:

```bash
npm install package-name

docker compose down -v
docker compose up --build
```

Bas.
