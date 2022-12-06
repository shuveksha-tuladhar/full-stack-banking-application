# Banking Application using MERN Stack

This project was developed using React JS, Express, Node JS and Mongo DB. This is a banking application where you can deposit, withdraw and view transaction history of a logged in user. This project is a part of capstone project for course "Professional Certificate in Coding: Full Stack Development with MERN" at MIT. 

### Objective
Build, test, and deploy a React application
Design and build UI components using React
Deploy a React application using Digital Ocean. 

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



