// Middelware
// redirects to the admin page if loggin in already
function loggedOut(req, res, next) {
  if (req.user) {
    return res.redirect('/admin');
  }
  return next();
}

// requires login
function isAuthenticated(req, res, next) {
  if (req.user) {
    return next();
  } else {
    // Or redirect to the login page with an error
    var err = new Error('You must be logged in to view this page.');
    err.status = 401;
    return next(err);
  }
}

module.exports.loggedOut = loggedOut;
module.exports.isAuthenticated = isAuthenticated;
