// @ts-ignore
import Client from '../database';

export type Order = {
  id?: number;
  status: string;
  user_id: number;
  items?: [] | [null];
};

export class OrderStore {
  // Show all active orders for all users
  async index(): Promise<Order[]> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql =
        "SELECT o.id, o.status, o.user_id, json_agg(jsonb_build_object('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS items FROM orders AS o FULL JOIN orders_products AS op ON o.id = op.order_id FULL JOIN products AS p ON op.product_id = p.id WHERE o.status='active' GROUP BY o.id, o.status, p.name, p.price, op.quantity";

      const result = await conn.query(sql);

      conn.release();

      return result.rows;
    } catch (err) {
      throw new Error(`Could not get the orders. Error: ${err}`);
    }
  }

  async show(id: number): Promise<Order> {
    try {
      const sql = 'SELECT * FROM orders WHERE id=($1)';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [id]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(`Could not find the order with id: ${id}. Error: ${err}`);
    }
  }

  // Show all active orders for a specific user
  async showForUser(userId: number): Promise<Order> {
    try {
      const sql =
        "SELECT o.id, o.status, o.user_id, json_agg(jsonb_build_object('productId', p.id, 'name', p.name, 'description', p.description,'category', p.category, 'price', p.price, 'quantity', op.quantity)) AS items FROM orders AS o FULL JOIN orders_products AS op ON o.id = op.order_id FULL JOIN products AS p ON op.product_id = p.id WHERE o.user_id=($1) AND o.status='active' GROUP BY o.id, o.status, p.name, p.price, op.quantity";
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [userId]);

      conn.release();

      return result.rows[0];
    } catch (err) {
      throw new Error(
        `Could not find the order for user id: ${userId}. Error: ${err}`
      );
    }
  }

  async create(o: Order): Promise<Order> {
    try {
      const sql =
        'INSERT INTO orders (status, user_id) VALUES($1, $2) RETURNING *';
      // @ts-ignore
      const conn = await Client.connect();

      const result = await conn.query(sql, [o.status, o.user_id]);

      const product = result.rows[0];

      conn.release();

      return product;
    } catch (err) {
      throw new Error(`Could not add the new order. Error: ${err}`);
    }
  }

  async update(o: Order): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql = 'UPDATE orders SET status=($2) WHERE id=($1) RETURNING *';

      const result = await conn.query(sql, [o.id, o.status]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(`Could not update product ${o.id}, ${error}`);
    }
  }

  async addProduct(
    quantity: number,
    orderId: string,
    productId: string
  ): Promise<Order> {
    try {
      // @ts-ignore
      const conn = await Client.connect();

      const sql =
        'INSERT INTO orders_products (quantity, order_id, product_id) VALUES($1, $2, $3) RETURNING *';

      const result = await conn.query(sql, [quantity, orderId, productId]);

      conn.release();

      return result.rows[0];
    } catch (error) {
      throw new Error(
        `Unable to add product ${productId} to order ${orderId}: ${error}`
      );
    }
  }

  async delete(id: number): Promise<Order> {
    try {
      // Delete from the Orders Products table so we don't have any orphan records
      const sqlForeign =
        'DELETE FROM orders_products WHERE order_id=($1) RETURNING *';

      // @ts-ignore
      const conn = await Client.connect();

      await conn.query(sqlForeign, [id]);

      // Delete from the Orders table
      const sql = 'DELETE FROM orders WHERE id=($1) RETURNING *';

      const result = await conn.query(sql, [id]);

      const deletedOrder = result.rows[0];
      conn.release();

      return deletedOrder;
    } catch (err) {
      throw new Error(`Could not delete order ${id}. Error: ${err}`);
    }
  }
}
