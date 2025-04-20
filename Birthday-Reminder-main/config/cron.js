const cron = require('cron')
const sendBirthdayEmails = require('../utils/mailer')

// Create cron job that runs daily at 7 AM
const birthdayJob = new cron.CronJob('0 7 * * *', async () => {
  console.log('Running birthday check...')
  await sendBirthdayEmails()
  console.log('Birthday check completed')
})

module.exports = birthdayJob
