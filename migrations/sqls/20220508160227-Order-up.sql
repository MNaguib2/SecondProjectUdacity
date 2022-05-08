/* Replace with your SQL commands */
Create table Orders (Id_user integer REFERENCES users(id),
id serial primary key  , createAt TIMESTAMP);