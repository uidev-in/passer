# Employee Management System

## Overview

This project is an Employee Management System built with React and TailwindCSS, Redux Toolkit, MOCKAPI. It provides an interface for managing employees, including features like viewing employee details, creating new employees, updating employee information, and managing user profiles.
Home screen contain Login form , credentail are :
username : admin
password: admin

## Features

- **Login and Logout**: Secure authentication flow allowing users to log in and log out of the system.
- **Employee List**: View all employees in a paginated list, making it easier to navigate large datasets.
- **Create Employee**: Add new employees to the system.
- **Update Employee**: Edit existing employee details.
- **User Profiles**: View and manage individual user profiles.
- **Pagination**: Navigate through employee records with ease, displaying a set number of records per page.
- **Toast Notifications**: Display real-time feedback to users with toast notifications for actions like creation, updates, or errors.
- **Protected Routes**: Restrict access to certain routes based on user authentication, ensuring that only authorized users can access specific pages.
- **Responsive Design**: The application is optimized for mobile and desktop views, providing a seamless user experience across devices.
- **404 Error Handling**: Users are redirected to a 404 page if they try to access a non-existent route or resource, improving user experience and navigation.

## Technologies Used

- **Frontend**: React, React Router, TailwindCSS
- **State Management**: Redux Toolkit
- **API Integration**: Hypothetical API calls for user data
- **Authentication**: Default username and password Authentication with protected routes
- **Notifications**: react-hot-toast for toast notifications

## Folder Structure

```plaintext
├── public/
├── src/
│   ├── api/                  # Hypothetical API calls
│   ├── components/           # Reusable UI components
│   │   ├── Header/           # Header component
│   │   ├── Footer/           # Footer component
│   │   ├── ProtectedRoute/   # Component for protecting routes
│   ├── pages/                # Pages of the application
│   │   ├── Home.jsx          # Home page
│   │   ├── Create.jsx        # Create Employee page
│   │   ├── Update.jsx        # Update Employee page
│   │   ├── Employee.jsx      # Employee list page
│   │   ├── User.jsx          # User Profile page
│   │   ├── NotFound.jsx      # 404 Error page
│   ├── App.jsx               # Main application component
│   ├── index.css             # Global styles
│   ├── index.js              # Entry point
├── .gitignore
├── package.json
├── README.md


## Available Scripts

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


```
