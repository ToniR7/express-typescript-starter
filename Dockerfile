# ----------- STAGE 1: Build -----------
FROM node:24.14.1-alpine3.23 AS base
WORKDIR /app

# ----------- STAGE 2: Deps -----------
FROM base AS dependencies

COPY package*.json ./
RUN npm ci --omit=dev --ignore-scripts

# ----------- STAGE 3: Production -----------
FROM base AS production

RUN apk add --no-cache dumb-init

COPY --from=dependencies /app/node_modules ./node_modules
COPY package*.json ./
COPY src ./src

RUN addgroup -S appgroup -g 1001 \
 && adduser -S appuser -u 1001 -G appgroup \
 && chown -R appuser:appgroup /app
 
USER appuser

EXPOSE 5010

CMD ["dumb-init", "node", "src/app.ts"]