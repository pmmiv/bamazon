DROP DATABASE IF EXISTS bamazon;
CREATE database bamazon;

USE bamazon;

CREATE TABLE products (
  id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  item VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  price DECIMAL (10, 2) NULL,
  quantity INT (10) NULL
);

INSERT INTO products (item, department, price, quantity)
VALUES ("bat", "baseball", 22.17, 20), ("glove", "baseball", 19.21, 14), ("stick", "hockey", 37.64, 30), ("cleats", "soccer", 27.82, 25);
INSERT INTO products (item, department, price, quantity)
VALUES ("gatorade", "miscellaneous", 2.75, 118), ("water bottle", "miscellaneous", 7.10, 50), ("net", "hockey", 220.98, 3), ("basketball hoop", "basketball", 85.43, 10);
INSERT INTO products (item, department, price, quantity)
VALUES ("helmet", "football", 42.21, 16), ("shoulder pads", "football", 32.61, 13);

SELECT * FROM products;
