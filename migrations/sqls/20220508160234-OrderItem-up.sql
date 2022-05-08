/* Replace with your SQL commands */
Create table OrderItem (Id_Order integer REFERENCES Orders(id), Id_Product integer REFERENCES Products(id),
id serial primary key  , createAt TIMESTAMP);