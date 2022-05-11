/* Replace with your SQL commands */
Create table cards (
        id_user integer REFERENCES users(id),
        id serial primary key, 
        totalprice numeric(9,3)
        );