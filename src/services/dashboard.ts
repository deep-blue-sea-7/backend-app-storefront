// @ts-ignore
import Client from '../database';

export class DashboardQueries {
  // Get all users that have made orders
  async fiveMostPopular(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();

      const sql =
        'SELECT name, COUNT(product_id) FROM products INNER JOIN orders_products on products.id = orders_products.product_id GROUP BY name ORDER BY name DESC LIMIT 5';
      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }

  // Get the five most expensive products
  async fiveMostExpensive(): Promise<{ name: string; price: number }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();

      const sql =
        'SELECT DISTINCT name, price FROM products ORDER BY price DESC LIMIT 5';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products by price: ${err}`);
    }
  }

  // Get all users that have made orders
  async usersWithOrders(): Promise<{ firstname: string; lastname: string }[]> {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT firstname, lastname FROM users INNER JOIN orders ON users.id = orders.user_id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get users with orders: ${err}`);
    }
  }

  // Get all products that have been included in orders
  async productsInOrders(): Promise<
    { name: string; price: number; order_id: string }[]
  > {
    try {
      //@ts-ignore
      const conn = await Client.connect();
      const sql =
        'SELECT name, price, order_id FROM products INNER JOIN orders_products ON products.id = orders_products.id';

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`unable get products and orders: ${err}`);
    }
  }
}
