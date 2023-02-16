# Smart Bank

Smart Bank is a full-stack application which is similar to financial software that is used in professional banking institutions. This banking application includes a frontend user interface, and backend services with a database. The frontend of the application is built using React framework, backend server is implemented with Express.js and a Mongo database to store transaction and account information. This application also includes Docker implementation which allows it to make it easy to deploy and run on any platform.

The main functionality of the application includes the ability for users to log in with a username and password, as well as create a new account. Once logged in, users can deposit and withdraw funds, and view their transaction history. The transaction history includes the account number and has the option to show or hide it. Each time a user deposits or withdraws funds, a unique transaction number is automatically generated.

### How to run this app
- Clone this repository

- Set Up environment variable
  - Create a *.env* file in backend folder
  ```
  MONGO_URL="mongodb://localhost:27017" # if running using npm method
  # MONGO_URL="mongodb://mongodb:27017" # if running using docker compose
  ORIGIN_URL="http://localhost:3000"
  ```
  - Create a *.env* file in frontend folder
  ```
  REACT_APP_API_BACKEND_URL=http://localhost:8080
  ```

- This project can be run in two ways:
#### 1. Using npm
**Frontend**
- Change directory to frontend
```
cd frontend
```
- Install node libraries
```
npm install
```
- Run the frontend server on the port 3000.
```
npm start
```

**Backend**
- Change the directory to backend.
```
cd backend
```
- Install node libraries
```
npm install
```
- Run the backend server on the port 8080
```
npm run dev
```

**Database**
- Running the Docker Desktop application
- Run the docker command to initiate the mongo db container from mongodb image.
```
docker run -d -p 27017:27017 –name=bank-app-mongodb mongo:latest
```

#### 2. Using docker compose
- Running the Docker Desktop application
- Build the docker container

On the directory where *docker-compose.yml* file is present, 
```
docker compose build
```

Run the docker container
```
docker compose up
```



