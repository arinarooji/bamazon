DROP DATABASE IF EXISTS bamazon;
CREATE DATABASE bamazon;

USE bamazon;

CREATE TABLE products(
  ID INT NOT NULL AUTO_INCREMENT,
  Product VARCHAR(45) NULL,
  Price DECIMAL(10,2) NULL,
  Department VARCHAR(45) NULL,
  Stock INT NULL,
  PRIMARY KEY (ID)
);

INSERT INTO products (Product, Price, Department, Stock)
VALUES ("Refrigerator", 599.99, "Appliances", 1000);

INSERT INTO products (Product, Price, Department, Stock)
VALUES ("Toaster Oven", 29.99, "Appliances", 5000);

INSERT INTO products (Product, Price, Department, Stock)
VALUES ("Bamazon Echo", 59.99, "Electronics", 1000000);

INSERT INTO products (Product, Price, Department, Stock)
VALUES ("Lightsaber", 199.99, "Electronics", 5000);

INSERT INTO products (Product, Price, Department, Stock)
VALUES ("Samsung 8K TV", 1299.99, "Electronics", 5000);

INSERT INTO products (Product, Price, Department, Stock)
VALUES ("Protein Bar", 0.89, "Nutrition", 5000);

SELECT * FROM products;