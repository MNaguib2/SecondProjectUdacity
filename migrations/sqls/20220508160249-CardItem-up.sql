/* Replace with your SQL commands */
Create table carditem (
    id_card integer REFERENCES Cards(id), 
    id_product integer REFERENCES Products(id),
    id serial primary key  , 
    totalprice numeric(9, 3),
    quantity integer not null
    );