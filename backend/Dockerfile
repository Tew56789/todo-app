# ===== Build Stage =====
FROM node:18 AS builder

WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .

# ===== Runtime Stage =====
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app ./

EXPOSE 5000
CMD ["node", "index.js"]
