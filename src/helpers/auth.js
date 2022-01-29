const jwt = require('jsonwebtoken');
const { secretToken } = require('../config');
const { admin, user } = require('../models');

module.exports = {
  userAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'You are not logged in!' });
      }
      const decodedData = jwt.verify(token.split(' ')[1], secretToken);
      const userInfo = await user.findOne({ _id: decodedData.id });
      const userCheck = await user.findOne({
        _id: req.url.match(/[0-9]{3}[a-z0-9]{21}$/)
      });

      if (!userInfo) {
        return res.status(403).json({ message: 'You are not a user!' });
      } else if (userCheck == null) {
        return res.status(404).json({ message: 'User not found!' });
      } else if (decodedData.email !== userCheck.email) {
        return res.status(403).json({ message: 'You have no access!' });
      }
      next();
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .json({ message: 'Invalid token or user no found!' });
    }
  },
  adminAuth: async (req, res, next) => {
    try {
      const token = req.headers.authorization;
      if (!token) {
        return res.status(401).json({ message: 'You are not logged in!' });
      }
      const decodedData = jwt.verify(token.split(' ')[1], secretToken);

      const userInfo = await admin.findOne({ _id: decodedData.id });
      if (!userInfo) {
        return res.status(403).json({ message: 'You have no access!' });
      }
      next();
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .json({ message: 'Invalid token or You are not logged in!' });
    }
  }
};
