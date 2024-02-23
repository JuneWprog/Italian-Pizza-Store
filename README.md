# Pizza-Resturant

**Name:**  Jun Wang, Komal Shah

**Email:**  wang.jun6@northeastern.edu, shah.koma@northeastern.edu

### About/Overview

This is a "Software as a Service" web application performing CRUD operations based on the MERN stack.
MERN(Mongodb, Express, React.js, Node.js). The client-side application allows users to connect with a chain restaurant, browse its menu, and place orders. The administrator-side application allows administrators to maintain the menu. When signing up users are assisted to save the address in the correct format using Google Maps API.

### Application URL
Version 1.0
[Pizza Joint](https://pizza-joint.herokuapp.com/)

Version 2.0 Adding Category feature, Search Order feature
[Italian Pizza](https://italian-pizza.herokuapp.com/)

### Demo URL

[YouTube Video](https://youtu.be/Un7_Cd1dY30)

### List of Features

The application has 2 major components.

First one is the Restaurant side component which allows admin user to manage the menu by adding, editing, and removing dishes that the restaurant serve.

The second component is the client or the user component. This provides users the functionality to browse the menu, search dishes according to their criteria and look at individual dishes and place an order for one or more dish.

All the users need to login before they can place an order. Once logged in they can place an order, view their history orders, and make amends to their profile. New users can sign-up and gain access to the application.

### Iteration 0 - UI Design

![image](https://user-images.githubusercontent.com/77699526/173201218-a1ea4a91-d4e3-48ac-b870-b5638778779e.png)

### Iteration 1

1. Built project structure
2. Created React components (Header, Footer, Navigation(Links), Menu DishList, DishDetail)
3. Defined React Routes
4. Defined Mongodb Schema for collections
5. Build Modules to fulfill CRUD operations

### Iteration1 Contributions

1. Setup initial server and client project structure - Komal Shah
2. Setup react components, routes, links - Jun Wang
3. Setup backend routes and DB connections - Komal Shah
4. Add functional code to components - Jun Wang
5. Setup db schema models and controller - Komal Shah
6. Setup Auth0 - Jun Wang
7. Define layout and style - Jun Wang
8. Final Deployment - Komal Shah

### Quick Peek On Iteration1

![image](https://user-images.githubusercontent.com/77699526/173995461-ac70e67c-4b76-4903-b7bb-22b1a1784ce3.png)

### Iteration2

1. Created React components of user profile, shopping cart and orders
2. Defined React Routes for orders and users
3. Built database schemas for orders and users
4. Setup CRUD functions for 4 collections (category, dish, user and order)  
5. Setup authentication and authorization for users
6. Style components for responsive design and accessibility
7. Added Checkout feature.
8. Integrated Google places API for address input.

### Iteration2 Contributions

1. Responsive design - Jun Wang
2. Build shopping cart function (CRUD)- Jun Wang
3. Fulfill CRUD functions for Dishes Components - Jun Wang
4. Build components for orders - Jun Wang
5. Setup db schema models and controller for users and orders - Komal Shah
6. Build user register login and profile components - Komal Shah
7. Build user authentication and authorization (tokens, password encryption) - Komal Shah
8. Implement Google API for address input - Komal Shah
9. Deployment to Heroku - Komal Shah

### Quick Peek On Iteration2

1. Responsive design
![image](https://user-images.githubusercontent.com/77699526/174471167-eea532e5-869e-471a-9ce3-10f188984a17.png)

2. Shopping cart
![image](https://user-images.githubusercontent.com/77699526/174687918-cccc2921-89e5-40dd-9d46-41acd372babf.png)

3. Payment
![image](https://user-images.githubusercontent.com/77699526/175199330-eb07d325-16d0-493e-8241-8c82b2211638.png)

### Iteration3 Features

1. Added errors for the user's invalid input
2. Tested react components
3. Improved Accessibility
4. Added Search Feature for searching dishes

### Contribution to Iteration3

1. Built Error check for user input - Komal Shah
2. Tested react components - Jun Wang & Komal Shah
3. Improved accessibility and Accessibitlity Report - Jun Wang
4. Added Search Feature - Komal Shah
5. Final deployment - Komal Shah

### Quick Peek On Iteration3

1. Home Page
![image](https://user-images.githubusercontent.com/98058572/176552952-02c84bbf-8100-4c81-a979-497424eeb1e9.png)

2. Search Feature
![image](https://user-images.githubusercontent.com/98058572/176553172-572bcf71-5b30-4a1f-83b1-3685802bb88f.png)

3. Error Handling
![image](https://user-images.githubusercontent.com/77699526/177221609-55e45d45-cb3b-4180-bda9-b13464997908.png)



### Iteration4 Features

1. Added CRUD operations of categories for administration.-Jun Wang
2. Added Search Orders feature for administration-Jun Wang


### Quick Peek on Iteration 4
1. Add Category
![image](https://user-images.githubusercontent.com/77699526/177221374-bcc11977-ffe1-4cd2-b528-62215fdeddca.png)
2. Edit Category
![image](https://user-images.githubusercontent.com/77699526/177221380-ecc6d429-2e1c-4590-85fb-1f9570dce1ea.png)
3. Search Order
![image](https://user-images.githubusercontent.com/77699526/177221391-f67cb0a0-4a2a-4edb-9a0a-5ad4fc7f571b.png)



### Setup Instruction

1. Clone the [github repo]([https://github.com/JuneWprog/restaurant-ordering]) to install the application.

2. **Setup Client**

a. Open Terminal and ```cd client```.

b. Execute ```npm install```

c. Create .env file ```touch .env```

d. Add following parameters: ```REACT_APP_SECRET="<secret key for encryption>"```

e. To start the UI, execute ```npm start```

f. Application UI is accessible now at [link](http://localhost:3000/).

3. **Setup Server**
 
a. Open Terminal and ```cd server```.

b. Execute ```npm install```

c. Create .env file ```touch .env```

d. Add following parameters: ```DB_URI = "<mongodb URI>"

PORT = 5000
TOKEN_KEY = "<token key for hashing>"
SECRET="<secret key for encryption>"```

e. To start the server, execute ```npm start```

f. The application server is accessible now at [link](http://localhost:5000/).

### Deploy to Heroku
1. Build the frontend(client) <br/>
  a. on Linux <br/>
     ``` cd client && npm run build```
     
     b. on windows<br/>
  
     change client/package.json 
     "build": "rm -rf ../server/public/build; react-scripts build; mv build ../server/public",
     to 
     "build": "rmdir /s ../server/public/build && react-scripts build &&  mv build ../server/public",
     then run
      ```npm run build```
      
 2. go to backend(server)<br/>
     ```cd ..\server```
      
      a. adding a file name as Procifile with content "web: npm start"<br/>
      
      b. login heroku<br/>
      ```heroku login```
  
      c.  create a heroku app<br/>
      ```heroku create app-name```
  
       d. push code to git
       ```git init```
    
       ```heroku git:remote -a app-name ``` 
   
       ```git add .```

       ```git commit -am "itatlian pizza code"```

       ```git push heroku master```


### Assumptions

NA

### Limitations

NA

### Citations

NA
