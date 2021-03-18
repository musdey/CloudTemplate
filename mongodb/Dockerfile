FROM mongo:4.4

COPY ./createUser.sh ./docker-entrypoint-initdb.d/createUser.sh

EXPOSE 27017

CMD ["mongod"]