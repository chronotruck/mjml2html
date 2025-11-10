# Base
FROM node:24-alpine AS base

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci --only=production

# Release
FROM node:24-alpine as release

COPY --from=base /app/node_modules ./node_modules

COPY . .

EXPOSE 80

CMD ["npm", "start"]
