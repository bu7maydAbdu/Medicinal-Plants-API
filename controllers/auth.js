const passport = require('passport')
const validator = require('validator')
const Admin = require('../models/Admin')


module.exports = {
  postLogin :  (req, res, next) => {
    const validationErrors = []
    if (!validator.isEmail(req.body.adminEmail)) validationErrors.push({ msg: 'Please enter a valid email address.' })
    if (validator.isEmpty(req.body.password)) validationErrors.push({ msg: 'Password cannot be blank.' })
   
  
    if (validationErrors.length) {
      req.flash('errors', validationErrors)
      return res.redirect(`/${process.env.adminLoginPagePath}`)
    }
    req.body.adminEmail = validator.normalizeEmail(req.body.adminEmail, { gmail_remove_dots: false })
  
    passport.authenticate('local', (err, admin, info) => {
      if (err) { return next(err) }
      if (!admin) {
        req.flash('errors', info)
        return res.redirect(`/${process.env.adminLoginPagePath}`)
      }
      req.logIn(admin, (err) => {
        if (err) { 
          return next(err) 
        }

        req.flash('success', { msg: 'Success! You are logged in.' })
        res.redirect(req.session.returnTo || `/${process.env.dashboard}`)

      })
    })(req, res, next)
  },



    postSignup :  (req, res, next) => {
        const validationErrors = []
        if (!validator.isEmail(req.body.adminEmail)) validationErrors.push({ msg: 'Please enter a valid email address.' })
        if (!validator.isLength(req.body.password, { min: 8 })) validationErrors.push({ msg: 'Password must be at least 8 characters long' })
        if (req.body.password !== req.body.confirmPassword) validationErrors.push({ msg: 'Passwords do not match' })
      
        if (validationErrors.length) {
          req.flash('errors', validationErrors)
          return res.redirect('../signup')
        }
        req.body.email = validator.normalizeEmail(req.body.adminEmail, { gmail_remove_dots: false })
      
        const admin = new Admin({
          adminName: req.body.adminName,
          email: req.body.adminEmail,
          password: req.body.password
        })
      
        Admin.findOne({$or: [
          {email: req.body.adminEmail},
          {adminName: req.body.adminName}
        ]}, (err, existingAdmin) => {
          if (err) { return next(err) }
          if (existingAdmin) {
            req.flash('errors', { msg: 'Account with that email address or username already exists.' })
            return res.redirect('')
          }
          admin.save((err) => {
            if (err) { return next(err) }
            req.logIn(admin, (err) => {
              if (err) {
                return next(err)
              }
              res.redirect(`/${process.env.dashboard}`)
            })
          })
        })
      }
}