# Use Node 20 for both build and runtime to match Vite 8 requirements
FROM node:20-alpine AS builder
WORKDIR /app

COPY package.json ./
COPY Backend/package.json Backend/package-lock.json Backend/
COPY Frontend/package.json Frontend/package-lock.json Frontend/
COPY Backend ./Backend
COPY Frontend ./Frontend

RUN npm install --prefix ./Backend && npm install --prefix ./Frontend
RUN npm run build --prefix ./Frontend && npm run build --prefix ./Backend

FROM node:20-alpine AS runner
WORKDIR /app

COPY --from=builder /app/Backend ./Backend
COPY --from=builder /app/Backend/node_modules ./Backend/node_modules
COPY --from=builder /app/Frontend/dist ./Frontend/dist

ENV NODE_ENV=production
EXPOSE 3000
CMD ["node", "Backend/src/server.js"]