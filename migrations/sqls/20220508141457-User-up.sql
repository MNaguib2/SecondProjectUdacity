/* Replace with your SQL commands */
Create table Users (name varchar(199) not null , username varchar(30) not null UNIQUE , 
id serial primary key , Type integer , statue integer, 
email text not null unique,
password text not null,createAt TIMESTAMP);


/* 
cases Type 
1 - is Admin
2 - is trader
3 - is Client or customer

Case statue in Admin
 online or offline to confirm and purchase 

*/