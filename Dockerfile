FROM node:8.11.0

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 80

CMD ["npm", "start"]
