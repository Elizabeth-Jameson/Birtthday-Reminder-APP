# Birthday Reminder App

A simple application that helps you keep track of birthdays and automatically sends birthday wishes via email.

## Features

- Simple and intuitive user interface
- Input validation for username, email, and date of birth
- Automated birthday email notifications
- MongoDB database for storing birthday information
- Cron job that runs daily at 7 AM to check for birthdays

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Gmail account (for sending emails)

## Setup

1. Clone the repository
2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory with the following variables:

   ```
   MONGODB_URI=mongodb://localhost:27017/birthday_reminder
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASS=your-app-password
   PORT=3000
   ```

4. For Gmail, you'll need to:
   - Enable 2-factor authentication
   - Generate an App Password
   - Use the App Password in the EMAIL_PASS environment variable

## Running the Application

1. Start MongoDB if not already running
2. Start the application:

   ```bash
   npm start
   ```

   For development with auto-reload:

   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:3000`

## Usage

1. Fill in the form with:

   - Username
   - Email address
   - Date of birth

2. Click "Add Birthday" to save the information

3. The system will automatically send birthday wishes via email at 7 AM on the person's birthday

## Technologies Used

- Node.js
- Express.js
- MongoDB
- Nodemailer
- Cron
- HTML/CSS/JavaScript

## License

ISC
