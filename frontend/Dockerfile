# ===== Build Stage =====
FROM node:18 AS builder

WORKDIR /app

# ติดตั้ง dependencies
COPY package*.json ./
RUN npm install

# copy source + build
COPY . .
RUN npm run build

# ===== Runtime Stage =====
FROM nginx:alpine

# copy build output ไป nginx
COPY --from=builder /app/dist /usr/share/nginx/html

# expose web port
EXPOSE 80

# nginx start (default)
CMD ["nginx", "-g", "daemon off;"]
