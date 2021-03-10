# Readme

## 1. Database (Dockerized)

run `docker-compose up -d` in the roor directory to create the postgres and pgAdmin containers

to import the db file run `docker cp seamo.sql postgres_container:/seamo.sql` to copy the file to the container

and then `docker exec -i postgres_container psql -U admin postgres < seamo.sql`

to export the data run `docker exec -it postgres_container pg_dump -U admin -h localhost postgres >> seamo.sql`

## 2. Server

there are 2 options for the api, one Node.js based and one FastApi

### a. Node.js

make sure you have node version 14 installed \
run `npm install` in the `server` directory to install all the dependencies \
run `npm run dev` in the `server` directory to start the server \
the server is accessible at `http://localhost:4000`

### b. FastApi

run `uvicorn fastapi_server.main:app --reload` in the root directory
the server is accessible at `http://127.0.0.1:8000`

## 3. Client (Next.js)

run `npm install` in the `client` directory to install all the dependencies

### a. Node.js back-end

run `npm run dev` in the `client` directory to start the dev server

### b. FastApi back-end

run `npm run fastapi` in the `client` directory to start the dev server

the app runs at `http://localhost:3000`

## Notes

to export the db file run `docker exec -it postgres_container pg_dump -U admin -h localhost postgres >> seamo.sql`
