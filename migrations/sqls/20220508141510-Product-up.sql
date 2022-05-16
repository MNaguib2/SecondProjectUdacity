/* Replace with your SQL commands */
Create table products (
    name varchar(199) not null , 
    price NUMERIC(9,3), 
    description text ,
    id serial primary key, 
    Id_user integer REFERENCES users(id)
);