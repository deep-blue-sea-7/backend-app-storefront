// @ts-ignore
import Client from '../database';
import bcrypt from 'bcrypt';

const pepper = process.env.BCRYPT_PASSWORD;
const saltRounds = process.env.SALT_ROUNDS;

export type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password: string;
};

export class UserStore {
  async index(): Promise<User[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql = 'SELECT * FROM users';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the users. Error: ${err}`);
    }
  }

  async show(id: number): Promise<User> {
    try {
      const sql = 'SELECT * FROM users WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find the user with id: ${id}. Error: ${err}`);
    }
  }

  async create(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();
      const sql =
        'INSERT INTO users (firstname, lastname, password_digest) VALUES($1, $2, $3) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(String(saltRounds))
      );

      const result = await conn.query(sql, [u.firstname, u.lastname, hash]);
      const user = result.rows[0];

      conn.release();

      return user;
    } catch (err) {
      throw new Error(
        `unable create user (${u.firstname} ${u.lastname} ): ${err}`
      );
    }
  }

  async update(u: User): Promise<User> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql =
        'UPDATE users SET firstname=($2), lastname=($3), password_digest=($4) WHERE id=($1) RETURNING *';

      const hash = bcrypt.hashSync(
        u.password + pepper,
        parseInt(String(saltRounds))
      );

      const result = await conn.query(sql, [
        u.id,
        u.firstname,
        u.lastname,
        hash,
      ]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update user ${u.id}, ${error}`);
    }
  }

  async delete(id: number): Promise<User> {
    try {
      const sql = 'DELETE FROM users WHERE id=($1) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      const deletedUser = result.rows[0];

      conn.release();

      return deletedUser;
    } catch (err) {
      throw new Error(`Could not delete user ${id}. Error: ${err}`);
    }
  }

  async authenticate(
    firstname: string,
    lastname: string,
    password: string
  ): Promise<User | null> {
    // @ts-ignore
    const conn = await Client.connect();
    const sql = 'SELECT * FROM users WHERE firstname=($1) AND lastname=($2)';
    const result = await conn.query(sql, [firstname, lastname]);

    if (result.rows.length) {
      const user = result.rows[0];
      if (bcrypt.compareSync(password + pepper, user.password_digest)) {
        return user;
      }
    }
    return null; // No such user found
  }
}
