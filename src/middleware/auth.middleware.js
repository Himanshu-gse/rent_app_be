import passport from 'passport';

const authenticateUser = (req, res, next) => {
  passport.authenticate('local', { session: false }, (err, user, info) => {
    if (err) {
      return res.status(500).json({ success: false, error: err.message });
    }
    if (!user) {
      return res.status(401).json({ success: false, error: info.message });
    }
    req.user = user;
    next();
  })(req, res, next);
};

export default authenticateUser;
