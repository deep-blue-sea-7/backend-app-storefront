import { Product, ProductStore } from '../../models/product';

const store = new ProductStore();
const testProduct: Product = {
  name: 'Matcha',
  price: 30,
  category: 'Organic',
  description: 'Japanese powdered green tea',
};
let resultProduct: Product;

describe('Testing the Product Model', () => {
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

  it('create method should add a product', async () => {
    resultProduct = await store.create(testProduct);

    expect(resultProduct.name).toEqual(testProduct.name);
    expect(resultProduct.price).toEqual(testProduct.price);
    expect(resultProduct.category).toEqual(testProduct.category);
    expect(resultProduct.description).toEqual(testProduct.description);

    // Assign the ID of the newly created product to the test product
    testProduct.id = resultProduct.id;
  });

  it('index method should return a list of products', async () => {
    const result = await store.index();

    expect(result.length).toBeGreaterThan(0);
  });

  it('show method should return the correct product', async () => {
    const result = await store.show(testProduct.id as number);

    expect(result).toEqual(testProduct);
  });

  it('updates a product with the new values', async () => {
    testProduct.price = 33;

    const updatedProduct = await store.update(testProduct);

    expect(testProduct.price).toEqual(updatedProduct.price);
  });

  // Deleting a specific row using the row that was created above
  it('deletes a product with the delete method', async () => {
    await store.delete(testProduct.id as number);

    const result = await store.index();

    expect(result).not.toContain(testProduct);
  });
});
