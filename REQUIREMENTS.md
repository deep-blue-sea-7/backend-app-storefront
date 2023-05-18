# API and Database Requirements

The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application.

___Table of Contents___

- [API and Database Requirements](#api-and-database-requirements)
  - [API Endpoints](#api-endpoints)
    - [Users](#users)
    - [Products](#products)
    - [Orders](#orders)
  - [Data Schema](#data-schema)
    - [Products Schema](#products-schema)
    - [Users Schema](#users-schema)
    - [Orders Schema](#orders-schema)
    - [Products per Order Schema](#products-per-order-schema)
  - [Data Shapes](#data-shapes)
    - [User](#user)
    - [Product](#product)
    - [Order](#order)
    - [Order Products](#order-products)

## API Endpoints

### Users

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/users/`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    [
        {
        "id": 1,
        "firstname": "Johnny",
        "lastname": "smith"
        },
        {
        "id": 2,
        "firstname": "Janet",
        "lastname": "Doe"   
        }
    ```

- Show **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/users/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    {
        "id": 2,
        "firstname": "Janet",
        "lastname": "Doe"   
    }
    ```

- Create
  - HTTP verb `POST`
  - Endpoint: `/users`
  - Request Body

    ```json
      {
        "firstname": "Johnny",
        "lastname": "Smith",
        "password": "cantguess"
      }
    ```

  - Response Body

    ```json
      {
        "id": 3,
        "firstname": "Johnny",
        "lastname": "Smith",
        "password": "$2b$10$0da31Y2qHH9TA5mXo4Ca3OWjQbOM92FJpMc2dIwBsDiS.o7YuoZV"
      }
    ```

- Update **`token required`**
  - HTTP verb `PUT`
  - Endpoint: `/users`
  - Request Body

    ```json
      {
        "id": 3,
        "firstname": "Johnny",
        "lastname": "Bart",
        "password": "cantguess"
      }
    ```

  - Response Body

    ```json
      {
        "id": 3,
        "firstname": "Johnny",
        "lastname": "Bart",
        "password": "$2b$10$m/yy8Cxk6.MTLtlo.FzihOxwwn/ESNVnywR0SKjVx5tGCFkjZ9umy"
      }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint: `/users/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    {
      "id": 1,
      "firstname": "Johnny",
      "lastname": "Smith",
      "password": "cantguess"
    }
    ```

- Authenticate
  - HTTP verb `POST`
  - Endpoint: `/users/login`
  - Request Body

    ```json
      {
        "firstname": "Johnny",
        "lastname": "Smith",
        "password": "cantguess"
      }
    ```

  - Response Body

    ```json
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJmaXJzdG5hbWUiOiJKb2hubnkiLCJsYXN0bmFtZSI6IlNtaXRoIiwicGFzc3dvcmRfZGlnZXN0IjoiJDJiJDEwJHpUT2EvR1FPMU85U0NlTTdEOHhldWV4dmcwQ2d0TUFoMlBHUlZYOFYzc2M5WmIuV0FBYW5lIn0sImlhdCI6MTY4MDg4NTUwMX0.EzMDronTU9aAp79UEXIfej9aSqC_y9QOLMw5vb5eXvE"
    ```

### Products

- Index
  - HTTP verb `GET`
  - Endpoint: `/products`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    [
        {
            "id": 1,
            "name": "Matcha",
            "price": 30,
            "category": "Organic",
            "description": "Powdered Green Tea"
        },
        {
            "id": 2,
            "name": "Sencha",
            "price": 20,
            "category": "Organic",
            "description": "Green Tea Leaves"
        }
    ]
    ```

- Show
  - HTTP verb `GET`
  - Endpoint: `/products/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    {
        "id": 2,
        "name": "Sencha",
        "price": 20,
        "category": "Organic",
        "description": "Green Tea Leaves"
    }
    ```

- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint: `/products`
  - Request Body

    ```json
    {
        "name": "Sencha",
        "price": 20,
        "category": "Organic",
        "description": "Green Tea Leaves"
    }
    ```

  - Response Body

    ```json
    {
        "id": 2,
        "name": "Sencha",
        "price": 20,
        "category": "Organic",
        "description": "Green Tea Leaves"
    }
    ```

- Update **`token required`**
  - HTTP verb `PUT`
  - Endpoint: `/products`
  - Request Body

    ```json
    {
        "id": 2,
        "name": "Sencha Tea",
        "price": 22,
        "category": "Organic",
        "description": "Green Tea Leaves"
    }
    ```

  - Response Body

    ```json
    {
        "id": 2,
        "name": "Sencha Tea",
        "price": 22,
        "category": "Organic",
        "description": "Green Tea Leaves"
    }
    ```

- Delete **`token required`**
  - HTTP verb `DELETE`
  - Endpoint: `/products/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
    {
        "id": 2,
        "name": "Sencha",
        "price": 20,
        "category": "Organic",
        "description": "Green Tea Leaves"
    }
    ```


### Orders

- Index - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/orders`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
        [
            {
                "id": 1,
                "status": "active",
                "user_id": 1
            },
            {
                "id": 10,
                "status": "active",
                "user_id": 33
            }
        ]
    ```

- Show - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/orders/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
      {
        "id": 10,
        "status": "active",
        "user_id": 33
      }
    ```


- showForUser - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/orders/:user_id/users`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
      {
        "id": 8,
        "status": "active",
        "user_id": "1",
        "items": [
            {
                "name": "Matcha Powder",
                "price": 20,
                "category": "Organic",
                "quantity": 7,
                "productId": 20,
                "description": "Powdered reen tea leaves"
            }
        ]
      }
    ```


- Create **`token required`**
  - HTTP verb `POST`
  - Endpoint: `/orders`
  - Request Body

    ```json
      {
        "user_id": 1,
        "status": "active"
      }
    ```

  - Response Body

    ```json
      {
        "id": 11,
        "status": "active",
        "user_id": 1
      }
    ```

- Update **`token required`**
  - HTTP verb `PUT`
  - Endpoint: `/orders`
  - Request Body

    ```json
      {
        "id": 3,
        "status": "completed",
        "user_id": 1,
      }
    ```

  - Response Body

    ```json
      {
        "id": 3,
        "status": "completed",
        "user_id": 1
      }
    ```

- addProduct **`token required`**
  - HTTP verb `POST`
  - Endpoint: `/orders/:id/products`
  - Request Body

    ```json
      {
          "quantity": 7,
          "order_id": 8,
          "product_id": 20
      }
    ```

  - Response Body

    ```json
      {
          "id": 3,
          "quantity": 7,
          "order_id": "8",
          "product_id": "20"
      }
    ```


- Delete **`token required`**
  - HTTP verb `PUT`
  - Endpoint: `/orders/:id`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
      {
        "id": 3,
        "status": "active",
        "user_id": 1
      }
    ```

### Dashboard Service: Queries

- fiveMostPopular - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `five-most-popular`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
      [
          {
              "name": "Matcha Powder",
              "count": "111"
          },
          {
              "name": "Green Tea Leaves",
              "count": "90"
          },
          {
              "name": "Black Tea",
              "count": "67"
          },
          {
              "name": "Lavender",
              "count": "54"
          },
          {
              "name": "Chamomille Tea",
              "count": "45"
          }                                        
      ]
    ```

- fiveMostExpensive - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `five-most-expensive`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
      [
          {
              "name": "Matcha",
              "price": 45
          },
          {
              "name": "Japanese Green Tea",
              "price": 25
          },
          {
              "name": "Flower Tea",
              "price": 20
          },
          {
              "name": "Jasmine Tea",
              "price": 19
          },
          {
              "name": "Lavender Tea",
              "price": 18
          }                    
      ]                                       
    ```


- productsInOrders - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/products-in-orders`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
        [
            {
                "name": "Lavender Tea",
                "price": 18,
                "order_id": "8"
            },
            {
                "name": "Flower Tea",
                "price": 20,
                "order_id": "8"
            }
        ]
    ```

- usersWithOrders - **`token required`**
  - HTTP verb `GET`
  - Endpoint: `/users-with-orders`
  - Request Body

    ```json
      N/A
    ```

  - Response Body

    ```json
        [
          {
              "firstname": "Johnny",
              "lastname": "Smith"
          },
          {
              "firstname": "Janet",
              "lastname": "Doe"
          }          
        ]
    ```


## Data Schema


### Users Schema

```sql
CREATE TABLE users(
  id SERIAL PRIMARY KEY,
  firstname VARCHAR(50) NOT NULL,
  lastname VARCHAR(50) NOT NULL,
  password_digest VARCHAR(255) NOT NULL
);
```

### Products Schema

```sql
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    price integer,
    category VARCHAR(100),
    description text
);
```

### Orders Schema

```sql
CREATE TABLE orders(
  id SERIAL PRIMARY KEY,
  status VARCHAR(50),
  user_id BIGINT REFERENCES users(id) NOT Null
);
```

### Products per Order Schema

```sql
CREATE TABLE orders_products(
  id SERIAL PRIMARY KEY,
  quantity INT,
  order_id BIGINT REFERENCES orders(id) NOT NULL,
  product_id BIGINT REFERENCES products(id) NOT NULL
);
```

## Data Shapes

### User

```typescript
type User = {
  id?: number;
  firstname: string;
  lastname: string;
  password?: string;
}
```

### Product

```typescript
type Product = {
  id?: number;
  name: string;
  price: number;
  category: string;
  description: string;
};
```

### Order

```typescript
type Order = {
  id?: number;
  status: string; 
  user_id: string;
}
```

### Order Products

```typescript
type OrdersProducts = {
  id?: number;
  quantity: number; 
  order_id: number;
  product_id: number;
}
```