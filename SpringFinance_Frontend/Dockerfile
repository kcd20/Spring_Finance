#syntax=docker/dockerfile:1

FROM node:17.5.0-alpine3.14
ENV NODE_ENV=production
WORKDIR /usr/node/app
COPY --chown=node:node package*.json ./
RUN npm ci --only-production
COPY . .
EXPOSE 3000
ENTRYPOINT ["npm", "start"]
