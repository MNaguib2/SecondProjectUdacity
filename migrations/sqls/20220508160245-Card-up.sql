/* Replace with your SQL commands */
Create table Cards (Id_user integer REFERENCES users(id),
id serial primary key, TotalPrice numeric(9,3));