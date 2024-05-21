import passport from 'passport';
import User from '../models/user/user.repository.js';

const UserController = {
  async createUser(req, res, next) {
    try {
      const newUser = await User.createUser(req.body);
      if (!newUser?.success) {
        return res.status(409).json(newUser);
      }
      const { _id, firstName, lastName, email, phoneNumber, role } = newUser;
      res.status(201).json({
        success: true,
        data: { _id, firstName, lastName, email, phoneNumber, role },
      });
    } catch (error) {
      next(error);
    }
  },
  async login(req, res, next) {
    passport.authenticate('local', (err, user, info) => {
      if (err) {
        return res.status(500).json({ success: false, error: err.message });
      }
      if (!user) {
        return res.status(401).json({ success: false, error: info.message });
      }
      req.login(user, async (err) => {
        if (err) {
          return res.status(500).json({ success: false, error: err.message });
        }
        try {
          // Generate JWT token
          const token = user.createJWT();
          // If login is successful, user data is stored in req.user
          const { _id, firstName, lastName, email, phoneNumber, role } = user;
          return res.json({
            success: true,
            message: 'Login successful',
            data: { _id, firstName, lastName, email, phoneNumber, role },
            token, // Include the token in the response
          });
        } catch (tokenError) {
          return res.status(500).json({ success: false, error: tokenError.message });
        }
      });
    })(req, res, next);
  },
  logout(req, res, next) {
    req.logout(function (err) {
      if (err) {
        return next(err);
      }
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ success: false, error: 'Logout failed' });
        }
        res.clearCookie('connect.sid'); // Clear session cookie
        res.json({ success: true, message: 'Logout successful' });
      });
    });
  },
};

export default UserController;
