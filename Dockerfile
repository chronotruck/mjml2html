# Base
FROM node:lts-alpine as base

WORKDIR /app

COPY package.json .

COPY package-lock.json .

RUN npm ci --only=production

# Release
FROM node:lts-alpine as release

COPY --from=base /app/node_modules ./node_modules

COPY . .

EXPOSE 80

CMD ["npm", "start"]
