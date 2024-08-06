# Tailwebs Frontend

## Dear Developer,

Thank you for reviewing this assignment. It has been a great experience building this project using Vite and modern frontend technologies. I hope you find the project functional and well-structured. I look forward to your feedback and hope it meets your expectations.

## Overview

Tailwebs Frontend is a modern web application built with Vite, React, and Tailwind CSS. It provides a dynamic and responsive user interface for managing student records, integrating with the backend APIs to offer a seamless user experience.

## Features

- **Login Functionality**:

  - Users can log in via a dedicated login screen.
  - Authenticates users and handles errors appropriately.

- **Teacher Portal Home & Student Listing Screen**:

  - Displays a list of students with their names, subject names, and marks.
  - Includes functionality to edit and delete student records.

- **New Student Entry**:

  - Allows users to add new students via a popup/modal.
  - Checks for existing records and updates or creates new entries accordingly.

- **Error Handling and Loading States**:

  - Includes error screens and loading indicators to manage and display different states of the application.

## Additional Features

- **Debounce Search Functionality**:

  - Search students by name, roll number, or subject name to quickly find records.

- **Pagination and Sorting**:

  - Supports pagination to navigate through large datasets.
  - Allows sorting of student records by roll number.

- **User Functionality**:

  - Features for updating user details, including password management.

- **Private Routes**:

  - Private routes for better access control and data authentication.

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14 or higher)

## Setup

### Clone the Repository

Start by cloning the repository:

```bash
git clone https://github.com/your-username/tailwebs-frontend.git
cd tailwebs-frontend
```

### Install Dependencies

Install the necessary dependencies using npm or yarn:

```bash
npm install
```

or

```bash
yarn install
```

### Configure Environment Variables

Create a `.env` file in the root directory of the project (if it doesn’t already exist) and add the following environment variables:

```env
VITE_API_URL= your_backend_url
```

### Run the Development Server

Start the development server:

```bash
npm run dev
```

or

```bash
yarn dev
```

Visit `http://localhost:5173` in your browser to view the application.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for more details.

## Contact

For any questions or further information, please reach out to [adityarastogi1801@gmail.com](mailto:adityarastogi1801@gmail.com).
