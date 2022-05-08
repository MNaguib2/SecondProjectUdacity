/* Replace with your SQL commands */
Create table CardItem (Id_Card integer REFERENCES Cards(id), Id_Product integer REFERENCES Products(id),
id serial primary key  , createAt TIMESTAMP);