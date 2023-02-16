# Smart Bank

Smart Bank is a full-stack application which is similar to financial software that is used in professional banking institutions. This banking application includes a frontend user interface, and backend services with a database. The frontend of the application is built using React framework, backend server is implemented with Express.js and a Mongo database to store transaction and account information. This application also includes Docker implementation which allows it to make it easy to deploy and run on any platform.

The main functionality of the application includes the ability for users to log in with a username and password, as well as create a new account. Once logged in, users can deposit and withdraw funds, and view their transaction history. The transaction history includes the account number and has the option to show or hide it. Each time a user deposits or withdraws funds, a unique transaction number is automatically generated.

## Technologies Used

React | JavaScript | Express | MongoDB | HTML5 | CSS | JSON API | Git | DigitalOcean

## Getting Started
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

## Features

### Home Page
![image](https://user-images.githubusercontent.com/97779778/219510533-8c278d9f-ad69-4a38-8815-25773f3220e5.png)

### Create Account Page
![image](https://user-images.githubusercontent.com/97779778/219510435-64de4bf1-083f-4e36-8637-284519e89dfe.png)

### Login Page
![image](https://user-images.githubusercontent.com/97779778/219510614-14e52fbe-aba5-47e2-bf95-a4efe1e4009d.png)

### Deposit Page
![image](https://user-images.githubusercontent.com/97779778/219511356-2b6f3367-b91e-424a-a259-f901f5e007f9.png)

### Withdraw Page
![image](https://user-images.githubusercontent.com/97779778/219511433-5293b1de-29b1-43fb-acb7-5e06e156f64c.png)

### Transaction History Page
![image](https://user-images.githubusercontent.com/97779778/219511471-e41ab6f1-1f23-49e4-84ad-6cbaf4453c38.png)


