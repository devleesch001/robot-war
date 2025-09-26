FROM node:18 AS build

WORKDIR /usr/src/app

COPY package*.json ./

ENV NODE_ENV=production

RUN rm -f .eslintrc.json
RUN npm ci

COPY . ./

RUN npm run build

FROM node:18 AS production

WORKDIR /usr/src/app

COPY --from=build /usr/src/app/build ./build

RUN npm install -g serve

EXPOSE 80

CMD ["serve", "-s", "build", "-l", "80"]
