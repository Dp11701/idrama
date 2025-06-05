
FROM node:23.11.1-slim AS builder
WORKDIR /app

COPY ./ ./



FROM node:23.11.1-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production

COPY --from=builder /app/.next/standalone/node_modules ./node_modules
COPY --from=builder /app/.next/standalone/ ./
COPY --from=builder /app/.next/static ./.next/static

# copy public files
COPY --from=builder /app/public ./public




WORKDIR /app

EXPOSE 3000

CMD [ "node", "server.js" ]




