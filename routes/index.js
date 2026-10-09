const express = require('express');
const router = express.Router();
const passport = require('passport');

router.use('/', require('./swagger'));
router.use('/exercises', require('./exercises'));
router.use('/users', require('./users'));
router.use('/workouts', require('./workouts'));
router.use('/workoutLogs', require('./workoutLogs'));

// OAuth Routes
router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function(req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

router.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs', session: false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  }
);

module.exports = router;