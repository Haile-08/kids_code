const jwt=require('jsonwebtoken');

//to verify the user has access to the request resource based on his/her access token
const verifyToken = async (req, res, next) => {
  try {
    
    let { token } = req.body;

    if (!token) {
      return res.status(403).send("Access Denied");
    }
    const verified = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verified;
    next();
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = verifyToken;