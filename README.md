# Storefront Backend Project

<br>


## Summary
<P>

This is a backend code for a storefront application. It includes endpoints to create users with encrypted passwords and uses JWT for authetication. The main functionality includes endpoints to create, query, update, and delete users, products, and orders.
For a complete list and usage for each endpoint and the database structure overview, please refer to the `REQUIREMENTS.md` document.

<br>


## Required Technologies

- Postgres for the database
- Node/Express for the application logic
- dotenv from npm for managing environment variables
- db-migrate from npm for database migrations
- bcrypt to encrypt the passwords
- jsonwebtoken from npm for working with JWTs
- Jasmine from npm for testing
- Eslint for code linting
- Prettier for code formatting

<br>


## Setup Steps

<br>

### 1.  Installation

Install the required packages using the following command:
```
yarn
```

Run Prettier:
```
npm run prettier
```

Run Lint:
```
npm run lint
```


### 2.  Database Setup

Create a `.env` file for the database connection using and update the values to your own data:

```
# Server Connection Information:
SERVER_PORT=3000
# Database Connection Information:
POSTGRES_HOST=127.0.0.1
DB_PORT=5432
POSTGRES_DB=DB_NAME_HERE
POSTGRES_TEST_DB=UNIT_TEST_DB_NAME_HERE
POSTGRES_USER=DB_USER
POSTGRES_PASSWORD=DB_USER_PASSWORD
BCRYPT_PASSWORD=YOUR_PEPPER_HERE
TOKEN_SECRET=YOUR_JWT_SECRET
SALT_ROUNDS=10
ENV=dev
```

Create a Docker Container (which will use the `.env` file):

```
docker-compose up -d
```

Then use the following command to create the tables:

```
db-migrate up
```


### 3.  Usage


You can then use the following command to start the server:

```
yarn watch
```

To check if the server is running, either in a browser or Postman, open:

```
0.0.0.0:3000
```

<br>


## Testing

1. Set the `ENV` variable to `test` in the `.env` file.

<br>

2. Login to the database in the Docker Terminal:
```
psql -h 127.0.0.1 -U tea_user postgres
```
<br>

3. Create the test database manually:

```
CREATE DATABASE teas_test;
```
<br>

4. Running the tests

There are two ways of running the unit tests:

Option 1: To run the tests multiple times without deleting the database:

```
npm run test
```

Option 2: To run the unit tests only once and delete the database:
```
npm run test-db-drop
```

<br>


## Structure


```
|---migrations
|   |   20230329183818-products-table.js
|   |   20230405200912-users-table.js
|   |   20230405200929-orders-table.js
|   |   20230405201120-orders-products-table.js
|   |
|   |---sqls
|           20230329183818-products-table-down.sql
|           20230329183818-products-table-up.sql
|           20230405200912-users-table-down.sql
|           20230405200912-users-table-up.sql
|           20230405200929-orders-table-down.sql
|           20230405200929-orders-table-up.sql
|           20230405201120-orders-products-table-down.sql
|           20230405201120-orders-products-table-up.sql
|
|---spec
|   |---support
|           jasmine.json
|
|---src
    |   database.ts
    |   server.ts
    |
    |---handlers
    |       dashboard.ts
    |       orders.ts
    |       products.ts
    |       users.ts
    |
    |---middleware
    |       authorize.ts
    |    
    |---models
    |       order.ts
    |       product.ts
    |       user.ts
    |
    |---services
    |       dashboard.ts
    |
    |---tests
        |---handlers
        |       dashboardSpec.ts
        |       ordersSpec.ts
        |       productsSpec.ts
        |       usersSpec.ts
        |
        |---helpers
        |       reporter.ts
        |
        |---models
                orderSpec.ts
                productSpec.ts
                userSpec.ts
|---.env
|---.eslintrc
|---.prettierrc

```
