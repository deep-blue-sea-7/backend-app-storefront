import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';
import { Order } from '../../models/order';
import { Product } from '../../models/product';

const request = supertest(app);

const testUser: User = {
  firstname: 'tester',
  lastname: 'testing',
  password: 'password123',
};

let token: string;
const productIds: number[] = [];
const orderIds: number[] = [];
type OrdersProducts = {
  quantity: number;
  order_id: number;
  product_id: number;
};

describe('Testing the Dashboard API calls', () => {
  //---------------  Create the test Data  ----------------

  beforeAll(async () => {
    // Create User(s)
    const response = await request.post('/users').send(testUser);

    expect(response.status).toBe(200);

    // Assign the newly created 'id' to the test object to be used in below tests
    testUser.id = response.body.id;

    // Login/Authenticate the test user to get a token
    const authResponse = await request.post('/users/login').send(testUser);

    token = authResponse.body as string;

    // Create Product(s)
    const products: Product[] = [
      {
        name: 'Matcha Tea',
        price: 30,
        category: 'Organic',
        description: 'Green powder tea',
      },
      {
        name: 'Red Tea',
        price: 15,
        category: 'Conventional',
        description: 'Red tea bags',
      },
      {
        name: 'Black Tea',
        price: 21,
        category: 'Organic',
        description: 'Black tea bags',
      },
      {
        name: 'Chamomille Tea',
        price: 18,
        category: 'Organic',
        description: 'Herbal caffeine free tea bags',
      },
      {
        name: 'Lavender',
        price: 17,
        category: 'Organic',
        description: 'Herbal caffeine free tea bags',
      },
      {
        name: 'Sencha Tea',
        price: 25,
        category: 'Organic',
        description: 'Japanese green loose tea leaves',
      },
    ];

    for (const product of products) {
      await request
        .post('/products')
        .set('Authorization', `Bearer ${token}`)
        .send(product)
        .then((response) => {
          productIds.push(response.body.id);
        });
    }

    // Create Order(s)
    const orders: Order[] = [
      { user_id: testUser.id as number, status: 'active' },
      { user_id: testUser.id as number, status: 'active' },
      { user_id: testUser.id as number, status: 'active' },
    ];

    for (const order of orders) {
      await request
        .post('/orders')
        .set('Authorization', `Bearer ${token}`)
        .send(order)
        .then((response) => {
          orderIds.push(response.body.id);
        });
    }

    // Create Order(s)' Products

    const OrdersProducts: OrdersProducts[] = [
      { quantity: 2, order_id: orderIds[0], product_id: productIds[0] },
      { quantity: 1, order_id: orderIds[0], product_id: productIds[1] },
      { quantity: 3, order_id: orderIds[0], product_id: productIds[2] },
      { quantity: 5, order_id: orderIds[1], product_id: productIds[3] },
      { quantity: 2, order_id: orderIds[1], product_id: productIds[4] },
      { quantity: 4, order_id: orderIds[2], product_id: productIds[5] },
    ];

    for (let i = 0; i < OrdersProducts.length; i++) {
      await request
        .post(`/orders/${OrdersProducts[i].order_id}/products`)
        .set('Authorization', `Bearer ${token}`)
        .send(OrdersProducts[i])
        .expect(200);
    }
  });

  // ---------- Test the Dashboard queries -------------

  it('get the 5 most expensive products', async () => {
    await request
      .get('/five-most-expensive')
      .expect(200)
      .then((response) => {
        for (let i = 0; i < response.body.length; i++) {
          expect(response.body[i].name).not.toContain('Red Tea');
        }
      });
  });

  it('get a list of users with orders', async () => {
    await request.get('/users-with-orders').expect(200);
  });

  it('get the 5 most popular products', async () => {
    await request
      .get('/five-most-popular')
      .expect(200)
      .then((response) => {
        for (let i = 0; i < response.body.length; i++) {
          expect(response.body[i].name).not.toContain('Black Tea');
        }
      });
  });

  it('get a list of products with orders', async () => {
    await request.get('/products-in-orders').expect(200);
  });
});
