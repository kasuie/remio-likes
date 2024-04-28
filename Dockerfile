FROM node:20-alpine AS base

FROM base AS deps

RUN apk add --no-cache libc6-compat

WORKDIR /web-likes

COPY . .
RUN set -eux; \
    npm install -g pnpm && pnpm i --frozen-lockfile;

FROM base AS builder

WORKDIR /web-likes

COPY --from=deps /web-likes/ .
RUN npm install -g pnpm
RUN pnpm run build

FROM base AS runner
WORKDIR /web-likes

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

RUN mkdir .next
RUN chown nextjs:nodejs .next

ENV NODE_ENV production

COPY --from=builder /web-likes/public ./public
COPY --from=builder --chown=nextjs:nodejs /web-likes/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /web-likes/.next/static ./.next/static

USER nextjs

CMD ["node", "server.js"]