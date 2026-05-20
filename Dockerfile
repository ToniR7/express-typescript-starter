# ----------- Node version -----------
ARG NODE_VERSION=24.14.1-alpine3.22

# ----------- STAGE 1: Build -----------
FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY package*.json ./
RUN npm ci --ignore-scripts

COPY src ./src
COPY tsconfig.json tsconfig.build.json ./
RUN npm run build

# ----------- STAGE 2: Deps -----------
FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# ----------- STAGE 3: Runtime -----------
FROM node:${NODE_VERSION} AS final
WORKDIR /usr/src/app

COPY --from=builder /app/dist ./dist
COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./

RUN addgroup -S appgroup -g 1001 \
 && adduser -S appuser -u 1001 -G appgroup \
 && chown -R appuser:appgroup /usr/src/app
 
USER appuser

EXPOSE 5010
CMD ["node", "dist/app.js"]