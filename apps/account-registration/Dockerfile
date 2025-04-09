FROM node:alpine as builder
WORKDIR /app
COPY pnpm-lock.yaml pnpm-workspace.yaml package.json ./
COPY apps/account-registration/package.json ./apps/account-registration/
COPY packages ./packages
RUN npm install pnpm -g
RUN pnpm install
COPY apps/account-registration/ ./apps/account-registration/
WORKDIR /app/apps/account-registration
RUN pnpm run build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/apps/account-registration/.next /app/apps/account-registration/.next
COPY --from=builder /app/apps/account-registration/public /app/apps/account-registration/public
COPY --from=builder /app/apps/account-registration/package.json /app/apps/account-registration/package.json
COPY --from=builder /app/apps/account-registration/node_modules /app/apps/account-registration/node_modules
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/pnpm-lock.yaml ./pnpm-lock.yaml
WORKDIR /app/apps/account-registration
EXPOSE 3000
CMD ["npm", "run", "start"]