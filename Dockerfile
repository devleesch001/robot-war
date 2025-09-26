FROM node:18 AS build-ui

WORKDIR /usr/src/ui

COPY ui/package*.json ./

RUN npm ci

COPY ui ./

RUN npm run build

# ==========================================================
FROM node:18 AS production

WORKDIR /usr/src/app

COPY api/package*.json ./

ENV NODE_ENV=production
ENV PORT=80

RUN npm ci --only=production

COPY api/src ./

COPY --from=build-ui /usr/src/ui/build ui

EXPOSE 80

CMD ["node", "index.js"]

