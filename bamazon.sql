DROP DATABASE IF EXISTS bamazonDB;

CREATE DATABASE bamazonDB;

USE bamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(100) NULL,
  price DECIMAL(10,2) NULL,
  stock_quantity INT NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Vanilla Extract", 2.50, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Candy Bar", 3.50, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Candy Bar Bag", 20.50, 20);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Candy Bar Bag Carrying Bags", 30.00, 5);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Potatoes", 1.50, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("72 4K TV", 999.99, 10);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Salad Glove", 0.50, 1000);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Neti Pot (used)", .99, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Magic Eye Poster", 0.25, 100);

INSERT INTO products (product_name, price, stock_quantity)
VALUES ("Sisqo's Autograph", 0.01, 1);