import supertest from 'supertest';
import app from '../../server';
import { Order } from '../../models/order';
import { User } from '../../models/user';
import { Product } from '../../models/product';

const request = supertest(app);

const testOrder: Order = {
  status: 'active',
  user_id: 0,
};

const testProduct: Product = {
  name: 'Chamomille',
  price: 15,
  category: 'Organic',
  description: 'Herbal tea. Helps with sleep.',
};

const testUser: User = {
  firstname: 'tester',
  lastname: 'testing',
  password: 'password123',
};

let userId: number;
let token: string;

describe('Testing the API calls for Orders', (): void => {
  beforeAll(async () => {
    // Create test user
    const userResponse = await request.post('/users').send(testUser);

    userId = userResponse.body.id;

    testOrder.user_id = userId;

    // Login/Authenticate the test user to get a token
    const authResponse = await request.post('/users/login').send(testUser);

    token = authResponse.body as string;
  });

  it('gets the api endpoint that creates an order', async () => {
    const createdOrder = await request
      .post('/orders')
      .send(testOrder)
      .set('Authorization', `Bearer ${token}`);

    expect(createdOrder.status).toBe(200);

    // Assign the newly created 'id' to the test object to be used in below tests
    testOrder.id = createdOrder.body.id;
  });

  it('gets the api endpoint that lists all orders', async () => {
    const response = await request
      .get('/orders')
      .set('Authorization', `Bearer ${token}`);
    expect(response.status).toBe(200);
  });

  it('gets the api endpoint that shows an order for a user', async () => {
    const response = await request
      .get(`/orders/${testOrder.user_id}/users`)
      .send({ userId: testOrder.user_id })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('gets the api endpoint that shows an order by its id', async () => {
    const response = await request
      .get(`/orders/${testOrder.id}`)
      .send({ id: testOrder.id })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it('gets the api endpoint that updates an order', async () => {
    testOrder.user_id = userId;
    testOrder.status = 'complete';
    const updatedOrder = await request
      .put('/orders')
      .send(testOrder)
      .set('Authorization', `Bearer ${token}`);

    expect(updatedOrder.status).toBe(200);
    expect(updatedOrder.body.status).toEqual(testOrder.status);
  });

  it('add a product to an order', async () => {
    // Create a product
    const response = await request
      .post('/products')
      .send(testProduct)
      .set('Authorization', `Bearer ${token}`);

    testProduct.id = response.body.id;

    // Add that product to an order
    await request
      .post(`/orders/${testOrder.id}/products`)
      .set('Authorization', `Bearer ${token}`)
      .send({ quantity: 3, order_id: testOrder.id, product_id: testProduct.id })
      .expect(200);
  });

  it('gets the api endpoint that deletes an order by its id', async () => {
    const deletedOrder = await request
      .delete(`/orders/${testOrder.id}`)
      .send({ id: testOrder.id })
      .set('Authorization', `Bearer ${token}`);

    expect(deletedOrder.status).toBe(200);
  });
});
