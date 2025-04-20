const Joi = require('joi')

exports.validateUser = (data) => {
  const schema = Joi.object({
    username: Joi.string().required().trim() ,
    email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).required().trim(),
    dateOfBirth: Joi.date().required(),
  })
  const { error } = schema.validate(data)
  if (error) {
    return {error: error.details[0].message}
  }
  return true  
}    

