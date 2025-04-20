const User = require('../models/User')
const { validateUser } = require('../validator/inputValidation')  



// Create a new user
exports.createUser = async (req, res) => {
const {error} = validateUser(req.body)
if (error) {
  return res.status(400).json({ message: error.details[0].message })
}
const { username, email, dateOfBirth } = req.body
const existingUser = await User.findOne({ email:email})
if (existingUser) {
  return res.status(400).json({ message: 'User already exists' })
}

const user = new User({ username, email, dateOfBirth })
await user.save()
res.status(201).json({message: 'User created successfully', user})
}





 
  


