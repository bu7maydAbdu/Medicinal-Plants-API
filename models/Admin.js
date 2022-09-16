const bcrypt = require('bcrypt')
const mongoose = require('mongoose')

const AdminSchema = new mongoose.Schema({
  adminName: { type: String, unique: true },
  email: { type: String, unique: true },
  password: String
})


// Password hash middleware.
 
 AdminSchema.pre('save', function save(next) {
  const admin = this
  if (!admin.isModified('password')) { return next() }
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err) }
    bcrypt.hash(admin.password, salt, (err, hash) => {
      if (err) { return next(err) }
      admin.password = hash
      next()
    })
  })
})


// Helper method for validating user's password.

AdminSchema.methods.comparePassword = function comparePassword(candidatePassword, cb) {
  bcrypt.compare(candidatePassword, this.password, (err, isMatch) => {
    cb(err, isMatch)
  })
}


module.exports = mongoose.model('Admin', AdminSchema)