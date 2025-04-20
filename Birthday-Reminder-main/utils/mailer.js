require('dotenv').config()
const nodemailer = require('nodemailer')
const User = require('../models/User')

// Create email transporter
const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST,
//   port: process.env.SMTP_PORT,
//   secure: false,
service:'gmail',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

// Function to send birthday emails
const sendBirthdayEmails = async () => {
  try {
    const today = new Date()

    const users = await User.find({
      $expr: {
        $and: [
          { $eq: [{ $month: '$dateOfBirth' }, today.getMonth() + 1] },
          { $eq: [{ $dayOfMonth: '$dateOfBirth' }, today.getDate()] },
        ],
      },
    })

    if (users.length === 0) {
      console.log('No users found with birthday today')
      return { message: 'No users found with birthday today' }
    }

    let sentEmails = 0

    for (const user of users) {
      const mailOptions = {
        from: process.env.SMTP_USER,
        to: user.email,
        subject: 'Happy Birthday! 🎉 🎂 🎁',
        html: `
          <div style="text-align: center; padding: 20px; font-family: Arial, sans-serif;">
            <h1 style="color: #ff6b6b;">Happy Birthday, ${user.username}! 🎂</h1>
            <p style="font-size: 18px;">Wishing you a day filled with joy andyears ahead of wonderful adventure!</p>
            <p style="font-size: 16px;">May your birthday be as wonderful as you are, ENJOY YOUR DAY!!</p>
            <img src="https://media3.giphy.com/media/v1.Y2lkPTc5MGI3NjExd2g3dDNubXNsZDVmdG55ajh3OWd1eGdoajJtMDkzbW9wd29xOGxsciZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/kMI3z7b9RWrYQbsXd2/giphy.gif" alt="Birthday Celebration" style="max-width: 300px; margin: 20px 0;">
          </div>
        `,
      }

      await transporter.sendMail(mailOptions)
      console.log(`✅ Birthday email sent to ${user.email}`)
      sentEmails++
    }

    return { message: `${sentEmails} birthday email(s) sent successfully` }
  } catch (error) {
    console.error('❌ Error in sending birthday emails:', error)
    return { error: 'Error in sending birthday emails' }
  }
}

module.exports = sendBirthdayEmails
