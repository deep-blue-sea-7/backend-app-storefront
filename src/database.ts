import dotenv from 'dotenv';
import Pool = require('pg-pool');

/* eslint-disable @typescript-eslint/no-var-requires */
const log = require('debug')('storefront:database');

dotenv.config();

const {
  POSTGRES_HOST,
  DB_PORT,
  POSTGRES_DB,
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_TEST_DB,
  ENV,
} = process.env;

let client;
log(`Currently using the ${ENV} environment!`);

if (ENV === 'test') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_TEST_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: Number(DB_PORT),
  });
}

if (ENV === 'dev') {
  client = new Pool({
    host: POSTGRES_HOST,
    database: POSTGRES_DB,
    user: POSTGRES_USER,
    password: POSTGRES_PASSWORD,
    port: Number(DB_PORT),
  });
}

export default client;
