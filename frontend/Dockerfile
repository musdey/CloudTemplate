FROM node:12 as buildModules

WORKDIR /app/frontend
COPY package.json ./
RUN yarn install

FROM buildModules as buildCode
WORKDIR /app/frontend/
COPY . .
RUN yarn build

FROM buildCode as runner
EXPOSE 3001
CMD ["./node_modules/.bin/serve", "build", "-l", "3000"]

