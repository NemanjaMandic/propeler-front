FROM node:8 AS assets

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
COPY package*.json ./
COPY .env.production ./

# Bundle app source
COPY ./src ./src
COPY ./public ./public
COPY ./flow-typed ./flow-typed

RUN npm run build

FROM node:8-alpine

WORKDIR /usr/src/app
RUN npm install serve -g

COPY --from=assets /usr/src/app/package*.json ./
COPY --from=assets /usr/src/app/.env.production ./
COPY --from=assets /usr/src/app/build/ /usr/src/app/build/

EXPOSE 5000
CMD [ "npm", "run", "serve" ]
