FROM node:12 as buildModules

WORKDIR /app/backend
COPY package.json ./
RUN yarn install

FROM buildModules as buildCode
WORKDIR /app/backend/
COPY . .
RUN yarn build

FROM buildCode as runner
EXPOSE 3000
CMD ["yarn", "start"]

