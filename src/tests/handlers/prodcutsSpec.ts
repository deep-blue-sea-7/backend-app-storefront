import supertest from 'supertest';
import app from '../../server';
import { Product } from '../../models/product';
import { User } from '../../models/user';

const request = supertest(app);

const testProduct: Product = {
  name: 'Chamomille',
  price: 15,
  category: 'Organic',
  description: 'Herbal tea. Helps with sleep.',
};

const user: User = {
  firstname: 'tester',
  lastname: 'testing',
  password: 'password123',
};

let token: string;

describe('Testing the API calls for Products', (): void => {
  beforeAll(async () => {
    // Create test user
    await request.post('/users').send(user);

    // Login/Authenticate the test user to get a token
    const authResponse = await request.post('/users/login').send(user);

    token = authResponse.body as string;
  });

  it('gets the api endpoint that creates a product', async () => {
    const response = await request
      .post('/products')
      .send(testProduct)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.name).toEqual('Chamomille');

    // Assign the newly created 'id' to the test object to be used in below tests
    testProduct.id = response.body.id;
  });

  it('gets the api endpoint that lists all products', async () => {
    const response = await request.get('/products');
    expect(response.status).toBe(200);
    expect(response.text).toContain('Chamomille');
  });

  it('gets the api endpoint that shows a product by its id', async () => {
    const response = await request
      .get(`/products/${testProduct.id}`)
      .send({ id: testProduct.id });

    expect(response.status).toBe(200);
    expect(response.text).toContain('Chamomille');
  });

  it('gets the api endpoint that updates a product', async () => {
    testProduct.price = 17;
    const response = await request
      .put('/products')
      .send(testProduct)
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.price).toEqual(17);
  });

  it('gets the api endpoint that deletes a product by its id', async () => {
    const response = await request
      .delete(`/products/${testProduct.id}`)
      .send({ id: testProduct.id })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toContain('Chamomille');
  });
});
