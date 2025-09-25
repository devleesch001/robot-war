ARG NODE_VERSION=18
ARG NPM_VERSION=8.6.0

FROM node:${NODE_VERSION}

WORKDIR /usr/src/app
ENV PATH /usr/src/app/node_modules/.bin:$PATH

COPY package*.json ./

ENV NODE_ENV=production

RUN npm install -g npm@${NPM_VERSION}
RUN npm install -g serve
RUN npm install

COPY . ./

EXPOSE 3001

CMD npm run start
