Employee Management App

This is a simple Employee Management CRUD application made using React and Vite.

Features

Add employee

View employee list

Edit employee details

Delete employee

Form validation

Search employee by name

Filter employee by department

Save data in browser localStorage

Responsive design

Technologies Used

React

Vite

JavaScript

CSS

Local Storage

How to Run

First, make sure Node.js is installed in your system.

Open the project folder in terminal and run:

npm install

After installation is completed, run:

npm start

Then open the URL shown in the terminal. Normally it will be:

http://localhost:5173

Production Build

To create a production build, run:

npm run build

Data Storage

Employee data is saved in browser localStorage, so the data will remain after refreshing the page.

No backend or database is used in this project.

Packages Used

React

React DOM

Vite

@vitejs/plugin-react

1. How did you manage the application state and data?

I used React useState to manage employee data and form state. I used localStorage to save the employee data, so it remains available after refreshing the page.

2. Why did you choose your particular technology and storage approach?

I chose React because it is simple for building reusable components and handling UI updates. I used localStorage because this was a basic CRUD machine test and it doesn't require a backend or database.

3. How did you implement validation?

I added validation before saving the employee. I check that the name is required, email is valid, mobile has 10 digits, department is selected, and salary is a valid number.

4. How would you handle 1,000+ employee records?

For 1,000+ records, I would use a backend database with an API instead of localStorage. I would also use pagination, server-side search and filtering to improve performance.

5. How would you connect this application to a REST API?
I would replace localStorage with API calls using fetch(). For example:

GET    /employees
POST   /employees
PUT    /employees/:id
DELETE /employees/:id

6. How would you improve the application for production?
I would add a backend and database, authentication, better error handling, server-side validation, pagination, testing, security and proper logging.
