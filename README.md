Project Overview
ProjectHub is a full-stack web application built with MongoDB, Express.js, React.js, and Node.js. It allows users to sign up, create teams, and manage projects with assigned product owners, managers, and teams.

Prerequisites
Node.js version 18+ 
MongoDB Community Server running locally on port 27017
npm

How to Run
Step 1- Start MongoDB
Make sure MongoDB is running locally. 
Use the command line prompt: "mongod --dbpath /data/db"

Step 2- Install & Start the Backend
On the command line:
cd Backend
npm install 
npm start

Step 3 - Install & Start the Frontend
cd Frontend
npm install 
npm start

Step 4 - Use the Application
Navigate to http://localhost:3000
Got to Signup User and register 5 users 
Go to Create Team and Create at least one team
Go to Create Project - Select a product owner, manager, and team from dropdowns
View Projects shows a full table of all projects with populated names
View Teams shows a card grid of all created teams.

Additional Modules
bcryptjs - Password hashing
dotenv - Environment variable management
cors- Cross-Origin Resource Sharing middleware
mongoose- MongoDB ODM for schema definition and queries
axios - HTTP client for frontend API Calls
react-router-dom - client-side routing in React
