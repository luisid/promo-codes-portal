# Promo Codes Portal

# Instructions

## 1. Install Packages.

The project uses yarn workspaces. To install dependencies it require to run:

```
yarn
```

## 2. Database

Postgres is required to run the application. It is recomended to use docker with the following command which contain development variables already set up

```
docker run --name postgres -p 5432:5432 -e POSTGRES_USER=promos_portal_admin -e POSTGRES_PASSWORD=password -e POSTGRES_DB=promos_portal -d postgres
```

Navigate to `back-end` and run:

```
npx prisma init
```

This will create the tables on the docker instance

## 3. Back-End

First create a `.env` file on the `back-end` directory. You can use the values from `.env.example`

To run the `back-end` run:

```
yarn workspace @promo-codes/portal-api run start
```

## 4. Front-End 

First create a `.env` file on the `front-end` directory. You can use the values from `.env.example` as a starting point. 

To run the `front-end` run:

```
yarn workspace @promo-codes/portal run start
```
