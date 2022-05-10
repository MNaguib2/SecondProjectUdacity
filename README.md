# SecondProjectUdacity
Hellow 
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