const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();

const protect = async(req, res, next) =>{
  try {
    let token;
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
      token = req.headers.authorization.split(' ')[1]
    };
    if(!token){
      return res.status(401).json({ ok: false, msg: 'No tiene acceso' })
    }
    
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN, async(err, data) =>{
      if(err) return res.status(401).json({ ok: false, msg: 'No tiene acceso' });
      const user = await User.findById(data.id)
      if(!user) return res.status(401).json({ ok: false, msg: 'No tiene acceso' });
      if(user.changedPasswordAfter(data.iat)){
        return res.status(401).json({ ok: false, msg: 'No tiene acceso' });
      }
      req.user = user;
      next();
    })
  } catch (error) {
    return res.status(500).json({ error })
  }
};

const restricTo = (...roles) =>{
  return (req, res, next) => {
    if(!roles.includes(req.user.role)){
      return res.status(403).json({ msg: 'No tiene permisos' })
    };
    next();
  }
}

module.exports = { protect, restricTo }