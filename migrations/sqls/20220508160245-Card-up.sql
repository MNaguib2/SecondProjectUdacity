/* Replace with your SQL commands */
Create table Cards (
        id_user integer REFERENCES users(id),
        id serial primary key, 
        totalprice numeric(9,3));