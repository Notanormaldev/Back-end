## 🐳 Docker Setup (Production)

### Step 1 — Create `.dockerignore`

Create this file at the project root:

```
node_modules
Frontend/node_modules
Backend/node_modules
.env
*.env
.git
```

---

### Step 2 — Create `Dockerfile`

Create this file at the project root:

```dockerfile
# Stage 1 — Frontend build
FROM node:20-alpine AS frontend-build

WORKDIR /app
COPY ./Frontend/package*.json /app
RUN npm install
COPY ./Frontend /app
RUN npm run build

# Stage 2 — Final image
FROM node:20-alpine

WORKDIR /app
COPY ./Backend/package*.json /app
RUN npm install
COPY ./Backend /app
COPY --from=frontend-build /app/dist /app/public
EXPOSE 3000
CMD ["node", "server.js"]
```

---

### Step 3 — Setup `server.js`

Add this in your `server.js` to serve the React build:

```js
import path from 'path';
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
```

Then add these lines after all your API routes:

```js
app.use(express.static(path.join(__dirname, 'public')))
app.get('*name', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'))
})
```

---

### Step 4 — Build & Run

```bash
# Build image
docker build . -t myfullstackapp

# Run container
docker run -p 8080:3000 myfullstackapp
```

App live at `http://localhost:8080`