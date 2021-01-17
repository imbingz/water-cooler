# Water Cooler
## Deployed Heroku Link
[WaterCooler](https://water-cooler-main.herokuapp.com/) https://water-cooler-main.herokuapp.com/
## Description

This is a full-stack web application that utilizes MongoDB, Express JS, Node JS, and React JS and allows users to create a Room and/or Social Space where they can walk around and socialize as if they would in real life, message (both public and private) and video others. The app also enables users to send friend requests, invite others to Room and Social Space, accept/decline requests and invitations and block others. 


## Table of Contents
* [Technologies](#Technologies)
* [Usage](#Usage)
* [Development](#Development)
* [Server](#Server)
* [Client](#Client)
* [Tests](#Tests)
* [Bugs](#Bugs)
* [Future Development](#Future-Development)
* [License](#License)
* [Contributors](#Contributors)

## Technologies

```
Frontend – React, socket.io-client, Bootstrap, React-icons, React-Toastify, use-sound, uuid 
Backend – Node, express, socket.io	
Database – Mongodb, Mongoose
Authentication – Express-session, passport-local, bcrypt
Testing – react-testing-library, jest, supertest

```
## Usage

 ## Installation
  Access to GitHub.com and a code editor such as vscode is necessary. Click the GitHub link provided above to the APP REPO. Click on the green button that says Clone or Download and Choose how you would like to download: using the SSH/HTTPS keys or download the zip file. If using SSH/HTTPS Key: You will copy the link shown and open up either terminal (mac: pre-installed) or gitbash (pc: must be installed). Once the application is open, you will type git clone paste url here. If using Download ZIP: Click on Download Zip. Locate the file and double click it to unzip the file. Locate the unzipped folder and open it. 

  ## How to Use
  In order to use this APP, you need terminal (mac: pre-installed) or gitbash (pc: must be installed). You also need to download and install [node.js](https://nodejs.org/en/) and [npm](www.npmjs.com) or [yarn](https://yarnpkg.com/) package manager. Open the cloned REPO in your favorite code editor, and then in terminal, enter the command “npm install“ or “yarn install”  to install the dependencies. You will also need to signup for a free account at [mongodb.com](https://www.mongodb.com/) or a mongodb local datase such as [Robo3T](https://robomongo.org/download). Now you are ready to start using  the app by entering “npm start” on your terminal or gitbash. If you just want to try how the app works, you can go to the link [here](https://water-cooler-main.herokuapp.com/)


## Development

* [Available Scripts](#Available-Scripts)
* [Dependencies/Packages](#Dependencies/Packages)


### Available Scripts

These are some of the key scripts used during development. Linting rules and test must pass, as we use Travis CI to run these scripts before a PR can be merged.

| Plugin | README |
| ------ | ------ |
| npm start:server | begins server using nodemon |
| npm start:client | begin React server in dev mode |
| npm lint | uses eslint to check for linting errors |
| npm lint:fix | if an issue occurs with eslint, this script can resolve the issue |
| npm test:server | run tests for the server |
| npm test:client | run tests for the client |

&NewLine;
&NewLine;

### Dependencies/Packages

&NewLine;
&NewLine;

#### Dependencies

```sh
[bcryptjs](https://www.npmjs.com/package/bcryptjs)

[bootstrap](https://www.npmjs.com/package/bootstrap)

[concurrently](https://www.npmjs.com/package/concurrently)

[dotenv](https://www.npmjs.com/package/dotenv)

[express](https://www.npmjs.com/package/express)

[express-session](https://www.npmjs.com/package/express-session)

[jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

[mongoose](https://www.npmjs.com/package/mongoose)

[passport](https://www.npmjs.com/package/passport)

[passport-local](https://www.npmjs.com/package/passport-local)

[react-bootstrap](https://www.npmjs.com/package/react-bootstrap)

[react-icons](https://www.npmjs.com/package/react-icons)

[socket.io](https://www.npmjs.com/package/socket.io)

[socket.io-client](https://www.npmjs.com/package/socket.io-client)

[uuid](https://www.npmjs.com/package/uuid)

[yarn](https://www.npmjs.com/package/yarn)
```

#### Dev Dependencies

```sh
[eslint](https://www.npmjs.com/package/eslint)

[jest](https://www.npmjs.com/package/jest)

[nodemon](https://www.npmjs.com/package/nodemon)

[supertest](https://www.npmjs.com/package/supertest)
```
> [Back To Development](#Development)

## Server

* [Database](#Database)
* [Routes](#Routes)
* [Authentication](#Authentication)
* [GUI](#GUI)
* [Video and Chat](#Video-and-Chat)

### Database

&NewLine;
&NewLine;

![Database Map](../assets/DB_Map-01.png)

#### Models

#### Seeds

### Routes

#### Managing Friends

### Authentication

#### Express-session, Passport, Passport-Local Strategy, bcryptjs

We started with JWT for its simplicity and then switched to Passport and Passport-Local Strategy with Express-session mainly because one cannot manually expire a token after it has been created. Therefore, we cannot log out with JWT on the server-side as with sessions and bcryptjs, a hashing node library. In addition to setting up Express-session, Passport and Passport-local middlewares and config (in server.js and server/config/passport.js), we also added a Mongoose-Schema pre-hook and  password verification method (in server/models/users.js) so that when a new user signs up, the password will be automatically hashed before saving the user data to our database and when a user login, our database  will compare the hashed passwords to validate the user. We created another authentication middleware for pages to which only an authorized user can access (see server/middlewares/authRequired.js). When a user logs out, we will destroy the session and use logout( )  method from passport-local strategy. The setup takes a little  extra time in comparison to JWT;  however, it works well for the scope and purpose of our project and we don’t need to re-issue tokens on the front end.

### GUI

Initially we started to test how to use socket for multiple player(sprite) separate from the main socket used for Rooms and Social Space so that our team members can work paralle and move the project faster. Basically when the client socket connects with the server, there is a player object created on the server with socket.id as key and then emit to the client through the socket chanel and the front side renders a new player. Then the front end emits the players movement back to the server where we placed the logic to set the boundaries of the movement and check the approximity of each player(sprite). When two players are close enough, there is a message (key, value pair) attached to the players obj and then emit the data back to client side where the messages are rendered.

## Client

* [PWA](#PWA)
* [App.jsx](#App.jsx)
* [Components](#Components)

### PWA

### App.jsx

### Utilities and Data

### Components

![Component Map](../assets/component_map-02.jpg)


* [GUI Components](#GUI-Components)
* [Sidebar](#Sidebar)

#### GUI Components

After researching and testing different options (phaser, React 3D and HTML5 canvas), we feel a 2D RPG like game is sufficient for this project. With the help of great online resources (see Reference Section below) we put an initial map(tileset) with a moving sprite together in vanilla Javascript (nested arrays), React and CSS. From there, we started to fine tune things such as making sure there is no crash if a non-arrow key is pressed, the sprite faces the same direction as the one it walks towards, adding boundaries so that it does not walk off the map. Then the next thing is to figure out how to use Socket (on and emit) to spawn (render) sprites and record the position of movements. Originally, we had a Dropdown menu for users to choose a map(tileset), and as our app develops, we need that map to be set from a user when creating a room, and React state management and hooks such as useContext and useReducer have made that pretty easy. When it comes to make it a multi-player app, we changed the position to dynamic user control through socket. The structure for RPG related components (see src/components/GUIComponents) is that the GameRPG hosts Map, Map renders Player, and Player passes props to Sprite.

#### Sidebar

> [Back To Components](#Components) || [Back To Client](#Client) || [Back To Table of Contents](#Table-of-Contents)

## Tests

### How to run tests

For server side test, on the root directory level, run `npm run test:server` and then press `a`  on your keyboard. When the test is done, press keyboard  `q` will exit.
For client side test, `cd client` and then `npm run test` and then `q` will exit.

### React-Testing- Login Form

We chose React-Testing-Library because this library is relatively easy to use and  comes pre-packaged with create-react-app. It is also specifically designed to test application behavior and avoid testing implementation. There are multiple ways regarding the test files organization and structure. For this application, we organized all the test related files inside _tests_ directories for in the client and server folder.

The Login form has two input fields Email and Password and a submit-button. As you can see the test is to test the behavior of the app from the user’s perspective. We care about what’s in the DOM. Which DOM elements the user can interact with and so on. To simulate as close as possible to the real-world user experience when using Input with a type=‘email’,  there is a validator function validating the proper email format and  the user will see an error message. The fireEvent from react-testing-library is used here to mock the DOM event using the ‘change’ function to change the input fields. When the email input value does not contain the symbol @, the Error Message will be displayed and when @ symbol is included in the email input, there is no Error Message.  To test form submission upon button-click, jest mock function helper jest.jn() along with .toHaveBeenCalled to make sure the submit function has been called. A data-testId is added as an attribute to the form.

### Server side testing- user Schema and validation tests Using Jest and Supertest  

Because almost all of our backend logics involve interactions with the database, it makes sense to make sure the database and schemas are set up and function correctly. Mongoose has great tools such as setting up schemas and validating data. The challenge is how to set up a test database and connect mongoose with jest. I read through a bunch of resources and followed these steps from the linked articles in the Reference Section.  

The test/seeds/index will look for the  seed file of the specific scheme /model you want to test, in our case the User Model. If you want to adapt this setup to your own application, be sure to have the first part before .seed same as the model you intend to test, and follow the naming convention in order for the index.js to work correctly.  Once the “seeds” directory is correctly set up, the next step is to set up mongoose in the test environment, see _tests_/test-setup.js.

We first test to make sure Jest works as intended (see initial.test.js). Then we test if userSchema works by first to see if the returned number of users is the same as the test data. Then we test if the hashing password pre-hood works when saving a new user to the database. Then we test mongoose ‘toLowerCase’ and ‘required’ options to make sure that the errors return when there is a missing field.

## Bugs

* If a user creates a room without entering in the required info for the database the room is not entered into the db but the user is still routed to a room using the uuid

TabFriends passes prop data to ProfileModal that triggers a react warning

## Future Development

## Contributors
[Diego Hernandez](https://github.com/Diegopiehttps://github.com/Diegopie) <br>
[Diana Schull](https://github.com/dianalynshull)<br>
[Bing Z](https://github.com/imbingz)
### About Us

### Reference
[Github](github.com)
[vscode editor]()
[React JS](https://reactjs.org/)
[socket.io](https://socket.io/)
[socket.io - client](https://socket.io/docs/v3/client-api/)
[Raect-Bootstrap](https://react-bootstrap.github.io/)
[passport and passport-local](http://www.passportjs.org/packages/passport-local/)
[express session](https://www.npmjs.com/package/express-session)
[bcryptjs](https://www.npmjs.com/package/bcryptjs)
[React-Testing-Library](https://testing-library.com/docs/react-testing-library/intro/) 
[Jest Testing Library](https://jestjs.io/docs/en/getting-started)
[Supertest Testing Library](https://www.npmjs.com/package/supertest)
[Mongoose Testing Document](https://mongoosejs.com/docs/jest.html)
[Connecting Jest and Mongoose](https://zellwk.com/blog/jest-and-mongoose/)
[React-Toastify](https://www.npmjs.com/package/react-toastify)
[Raect-icons](https://react-icons.github.io/react-icons/)
[Use-sound](https://www.npmjs.com/package/use-sound)
[canva.com](https://www.canva.com/)
[Heroku](https://dashboard.heroku.com/apps)
[Youtube - Socket.io Chat](https://youtu.be/tBr-PybP_9c)
[Youtube - RPG Game](https://www.youtube.com/watch?v=DqpPgK13oEM&t=127s)
[Article - Use Socket for Multiplayer-Games](https://theinternetbutton.asciinaut.sh/blog/how-to-use-socket-io-not-the-chat)
[Atlassian-Jira](https://www.atlassian.com/software/jira)
[MongoDB Atlas](https://www.mongodb.com/)

## License
