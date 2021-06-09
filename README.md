# KANNON-Gaming-test

This is the repository for KANNON Gaming front-end react developer test  
Deployed app url: https://radiant-citadel-71885.herokuapp.com/

Check ***Production*** branch for code related to the deployment process

## Running in development
#### Installing dependencies:  
In **client** and **server** folders run:  
`npm install`

#### Adding config files  
Add a file `default.json` to the `config` folder in the `server` folder  
You should have: `{rootFolder}/server/config/default.json`  
  
`default.json` must have the following structure:  
```
{
  "mongoURI": "Your mongoDBUri",
  "jwtSecret": "superSecretJWTKey"
}
```
- *mongoUri* : should be a connection string to your MongoDB(project uses MongoDB Atlas)
- *jwtSecret* : is a string which will represent the secret key that the JWT will use to sign the tokens

#### Starting the app in development
As this project uses separate folders for backend and frontend you can run this project by executing  
`npm run start`  
or  
`npm run server`  (to run with hotreloading using nodemon)
**In the "server" folder**  
  
and In the **"client"** folder
`npm run start` (to run the webpack server)  


## All Commands
* These commands are available in **"client"** folder:  
```
npm run start (start webpack dev server)
npm run lint (use eslint to find errors)
npm run format (use prettier to prettify files)
npm run build (to build the React frontend)
```
* These commands are available in **"server"** folder:  
```
npm run start (to run the server)
npm run server (to run the server with hotreloading)
npm run format (use prettier to prettify files)
```



