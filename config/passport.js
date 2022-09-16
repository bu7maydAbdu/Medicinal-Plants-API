const LocalStrategy = require('passport-local').Strategy
const mongoose = require('mongoose')
const Admin = require('../models/Admin')

module.exports = function (passport) {
  passport.use(new LocalStrategy({ usernameField: 'adminEmail' }, (adminEmail, password, done) => {
    Admin.findOne({ adminEmail: adminEmail.toLowerCase() }, (err, admin) => {
      if (err) { return done(err) }
      if (!admin) {
        return done(null, false, { msg: `Email ${adminEmail} not found.` })
      }
      if (!admin.password) {
        return done(null, false, { msg: 'Your account was registered using a sign-in provider. To enable password login, sign in using a provider, and then set a password under your user profile.' })
      }
      admin.comparePassword(password, (err, isMatch) => {
        if (err) { return done(err) }
        if (isMatch) {
          return done(null, admin)
        }
        return done(null, false, { msg: 'Invalid email or password.' })
      })
    })
  }))
  

  passport.serializeUser((admin, done) => {
    done(null, admin.id)
  })

  passport.deserializeUser((id, done) => {
    Admin.findById(id, (err, admin) => done(err, admin))
  })
}
