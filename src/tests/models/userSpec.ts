import { User, UserStore } from '../../models/user';

const store = new UserStore();

const testUser: User = {
  firstname: 'Johnny',
  lastname: 'Smith',
  password: 'cantguess',
};

let resultUser: User;

describe('Testing the User Model', () => {
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

  it('create method should add a user', async () => {
    resultUser = await store.create(testUser);

    expect(resultUser.firstname).toEqual(testUser.firstname);
    expect(resultUser.lastname).toEqual(testUser.lastname);

    // Assign the ID of the newly created user to the test user
    testUser.id = resultUser.id;
  });

  it('index method should return a list of users', async () => {
    const result = await store.index();

    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct user', async () => {
    const resultUser = await store.show(testUser.id as number);

    expect(resultUser.id).toEqual(testUser.id);
  });

  it('updates a user with the new values', async () => {
    testUser.lastname = 'Chang';

    const resultUser = await store.update(testUser);

    expect(testUser.lastname).toEqual(resultUser.lastname);
  });

  it('authenticates a user', async () => {
    const resultUser = await store.authenticate(
      testUser.firstname,
      testUser.lastname,
      testUser.password
    );

    expect(resultUser?.firstname).toEqual(testUser.firstname);
    expect(resultUser?.lastname).toEqual(testUser.lastname);
  });

  // Deleting a specific row using the row that was created above
  it('deletes a user with the delete method', async () => {
    await store.delete(testUser.id as number);

    const result = await store.index();

    expect(result).not.toContain(testUser);
  });
});
