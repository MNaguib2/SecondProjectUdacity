/* Replace with your SQL commands */
Create table users (
    name varchar(199) not null , 
    id serial primary key , 
    typeuser integer , 
    statue integer, 
    token text,
    email text not null unique,
    password text not null);


/* 
cases Type 
1 - is Admin
2 - is trader
3 - is Client or customer

Case statue in Admin
1- online 
2 - offline to confirm and purchase 

*/