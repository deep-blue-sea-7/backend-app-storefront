import { Order, OrderStore } from '../../models/order';
import { User, UserStore } from '../../models/user';

const store = new OrderStore();
const userStore = new UserStore();

const testOrder: Order = {
  status: 'active',
  user_id: 0,
};

const testUser: User = {
  firstname: 'tester',
  lastname: 'testing',
  password: 'password123',
};

let resultOrder: Order;
let resultUser: User;

describe('Testing the Order Model', () => {
  beforeAll(async () => {
    // Create test user
    resultUser = await userStore.create(testUser);

    if (resultUser.id) testOrder.user_id = resultUser.id;
  });

  it('should have an index method', () => {
    expect(store.index).toBeDefined();
  });

  it('should have a show method', () => {
    expect(store.show).toBeDefined();
  });

  it('should have a create method', () => {
    expect(store.create).toBeDefined();
  });

  it('should have a delete method', () => {
    expect(store.delete).toBeDefined();
  });

  it('create method should add an order', async () => {
    resultOrder = await store.create(testOrder);

    expect(resultOrder.status).toEqual(testOrder.status);
    expect(Number(resultOrder.user_id)).toEqual(testOrder.user_id);

    // Assign the ID of the newly created order to the test order
    testOrder.id = resultOrder.id;
  });

  it('index method should return a list of orders', async () => {
    const result = await store.index();

    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct order for a specific user', async () => {
    const resultOrder = await store.showForUser(
      testOrder.user_id as unknown as number
    );

    expect(resultOrder.id).toEqual(testOrder.id);
  });

  it('updates an order with a new value', async () => {
    testOrder.status = 'completi';

    const resultOrder = await store.update(testOrder);

    expect(testOrder.status).toEqual(resultOrder.status);
  });

  // Deleting a specific row using the row that was created above
  it('deletes an order with the delete method', async () => {
    await store.delete(testOrder.id as number);

    const result = await store.index();

    expect(result).not.toContain(testOrder);
  });
});
