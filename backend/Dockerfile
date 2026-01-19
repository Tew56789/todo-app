# ===== Build Stage =====
FROM node:18-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install --only=production

COPY . .

# ===== Runtime Stage =====
FROM node:18-alpine

WORKDIR /app

COPY --from=builder /app ./

EXPOSE 5000

CMD ["node", "src/index.js"]
