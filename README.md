# SecondProjectUdacity
Hellow 



setup Steps
Port-Server : 3000      Port-DataBase : 5432
1- npm i
2- create DataBase in Postgres with name 'storefront'
3- create role or user in postgrest 'mena_udacity' and password 'password123'
4- Repeate step 2 and 3 with Detial test create DB with name 'storefront_test' and user 'Test_Udacity' and password 'password123'
5- install db-migrate -g 
6- write in command db-migrate up
7- write in command db-migrate --env test up to establist db tables test
8- use script 'dev-server'

ENV Variable : - 

POSTGRES_HOST = '127.0.0.1'
POSTGRES_DB = 'storefront'
POSTGRES_USER = 'mena_udacity'
POSTGRES_PASSWORD = 'password123'
POSTGRES_PORT = 5432
PassWordDev = 'TestPasswordStoreFrontAPI'
ENV=dev
POSTGRES_Test_DB = 'storefront_test'
POSTGRES_Test_USER = 'test_udacity'
POSTGRES_Test_PASSWORD = 'password123'

DataBase Schema :- 
CREATE user mena_udacity with encrypted password 'password123' superuser login;

CREATE user test_udacity with encrypted password 'password123' superuser login;

CREATE DATABASE storefront OWNER mena_udacity;

CREATE DATABASE storefront_test OWNER test_udacity;

CREATE TABLE user (
    name varchar(199) not null , 
    id serial primary key , 
    typeuser integer , 
    statue integer, 
    token text,
    email text not null unique,
    password text not null
)
CREATE TABLE products (
    name varchar(199) not null , 
    price NUMERIC(9,3), 
    description text ,
    id serial primary key, 
    Id_user integer REFERENCES users(id)
)

CREATE TABLE carts (
        id_user integer REFERENCES users(id),
        id serial primary key, 
        totalprice numeric(9,3)
)

CREATE TABLE cartitem (
        id_card integer REFERENCES Cards(id), 
    id_product integer REFERENCES Products(id),
    id serial primary key  , 
    totalprice numeric(9, 3),
    quantity integer not null
)

links To work With Api 

http://localhost:3000/Auth/signup   (post)
        this link use when user want registeration new user but must body contain on 1- 'name' 2- 'email' 3- 'password' as asyntex password must contain min 6 charecter 

http://localhost:3000/Auth/signIn   (put)
        this url use when user made login to your account and to get token this url send with body contain 2- 'email' 3- 'password' as asyntex password must contain min 6 charecter after this Api System send "Token" set this in Header to made Authentication


Rul :- First Email will comming Admin this Have more Authorization in API Admin can change statue  to all storefront and change type to any user and can control in all any thing in API after this any register user will become client can't add any product just can purchase and add to cart to change type client to trader just only from Admin Trader can add and delete and edit on his product only


http://localhost:3000/Admin/changestatue    (put)
        this url specialist to Admin only this to can to trader to add edite product in store and can client to made any purchase this url work in vice versa if online made offline 

http://localhost:3000/Admin/upgredUser      (put)
        this url specialist to Admin only this to can convert client to trader and give user more Authentication or pull authentication this send with Header load 'Token' that certainly and body 'id' user you want change and 'typeuser' if 2 trader or 3 client

http://localhost:3000/Admin/Users       (get)
        this url to show all users are already registeration just to admin every url should contain in header 'Token' to sure this email is already login

http://localhost:3000/Client/       (get)
        this url mostlu use to client to show all Products every url should contain in header 'Token' to sure this email is already login

http://localhost:3000/Client/logout     (put)
        this url use to all user to make Logout and delete tokenGen from DB this url must contain in header 'Token' to sure this email already login

http://localhost:3000/Product/addProduct    (post)
        this url available to trader and admin only to can add product but must send with first 'Token' in Header second in body contain on 1- 'name' 2- 'price' 3- 'description' name must contain minimum 4 character and description contain on minimum 15 character and price must be number 

http://localhost:3000/Product/EditProduct/:id      (put)
         this url available to trader and admin only to can add product but must send with first 'Token' in Header second in body contain on 1- 'name' 2- 'price' 3- 'description' name must contain minimum 4 character and description contain on minimum 15 character and price must be number With Very IMPORTANT add NUmber Id specialist to Product you want Edit

http://localhost:3000/Product/deleteProduct/:id      (delete) 
        this url available to trader and admin to can trader control in his product if delete or edite but admin can control in all and From RUL must Store Online From Admin from back url  http://localhost:3000/Admin/changestatue 

http://localhost:3000/Cart/addItemCart/:id      (post)
        this url available to all user to can add any product to your cart 

http://localhost:3000/Cart          (get)   
        this url availabel to all user to show every item in cart ever user if exist this specialist to Each user individually just must send with header 'Token' to sure if already login or no 

http://localhost:3000/Cart/deleteProduct/:id        (delete)
        this url available to all user to can control in his cart if his want delete this from cart

Note: - Every Request Must have 'Token' in Header to sure if user login or not just two url not add token when signin to this url already send you token and signup to Register New User (http://localhost:3000/Auth/signIn  ,  http://localhost:3000/Auth/signup)
Note:- in case Defualt Route or use mistake url already convert to view Products Or show message error  but user not access any action



Errors Numer
1- in Admin Middleware in first confirm key
2- in Admin Middleware in sure if this user Admin or no 
3- in Admin Middleware in error on Data expireTime token terminate
4- in porduct model in function get product by id
5- in Product Handler in side function updateProduct when user not admin or not owner product
6- in porduct model in function Edit product
7- in porduct model in function Delete product Product By ID
8- in Product Handler in function update product if result promise funtion from model is error
9- in Product Handler in function deleted product if result promise funtion from model is error
10- error in Product Model when try get all Detials to Can user purches 
11- error in User Model when try get one user by email
12- error in User Model when try logout user via remove tokenGen from selected user by ID 
13- error in client-Handler when try logout user after made query sql this error in sure result update
14- error in client-Handler when try logout user but check exist user or check tokenGen from DB have error
15- error in Credit Model when try Find Credite spectialist to user 
16- in Credite Model when create New Credit to user
17- in Credite Handler when try get all detials Prduct to save price in credit but Not found product
18- in Credite Model when Add New CreditItem to user
19- in Credite Handler in AddItemToCredit inside function create credite model 
20- in Credite Handler in AddItemToCredit inside function create creditItem model after create new Credite 
21- in Credite Model when try getAllCreditItem specialist to card id and pordid
22- in Credite Handler in AddItemToCredit inside function update in exist item to credit 
23- in Credite Model During Calculate all item Price 
24- in Credite Handler when try get all detials Prduct to save price in credit but Not found product this in function already exist cart
25- in Credite Handler in AddItemToCredit inside function create creditItem model in already exist credit but not item exist
26- in credit Handle after get cards by user in function RemoveItemToCredit
27- in credit Handle when try Deleted Item from Credit during confirm Deleted
28- in credut Model During Delete Item From Card but mostly item not found in this card
29- in Credite Model when try getAllCreditItem specialist to card id
30- in Product Handler when user try Delete function but product want deleted not found or user not admin or user not owner to product