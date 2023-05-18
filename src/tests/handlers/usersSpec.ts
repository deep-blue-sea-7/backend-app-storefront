import supertest from 'supertest';
import app from '../../server';
import { User } from '../../models/user';

const request = supertest(app);

const testUser: User = {
  firstname: 'tester',
  lastname: 'testing',
  password: 'password123',
};

let token: string;

describe('Testing the API calls for Users', (): void => {
  it('gets the api endpoint that creates a user', async () => {
    const response = await request.post('/users').send(testUser);

    expect(response.status).toBe(200);

    // Assign the newly created 'id' to the test object to be used in below tests
    testUser.id = response.body.id;
  });

  it('gets the api endpoint that authenticates a user', async () => {
    // Login/Authenticate the test user to get a token
    const authResponse = await request.post('/users/login').send(testUser);

    token = authResponse.body as string;
  });

  it('gets the api endpoint that lists all users', async () => {
    const response = await request
      .get('/users')
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toContain('tester');
  });

  it('gets the api endpoint that shows a user by its id', async () => {
    const response = await request
      .get(`/users/${testUser.id}`)
      .send({ id: testUser.id })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.text).toContain('tester');
  });

  it('gets the api endpoint that updates a user', async () => {
    testUser.password = 'password456';
    const response = await request
      .put('/users')
      .set('Authorization', `Bearer ${token}`)
      .send(testUser);

    expect(response.status).toBe(200);
  });

  it('gets the api endpoint that deletes a user by its id', async () => {
    const response = await request
      .delete(`/users/${testUser.id}`)
      .send({ id: testUser.id })
      .set('Authorization', `Bearer ${token}`);

    expect(response.status).toBe(200);
  });
});
