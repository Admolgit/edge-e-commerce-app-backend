const dotenv  = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

const Auth = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer ")) {
    token = req.headers.authorization.split(' ')[1];

    try {
      // Using Config module to read token validities.
      const decoded = jwt.verify(token, `${process.env.JWT_SECRET}`)

      // req.user = decoded;

      return decoded;


    } catch (error) {

     return res.status(400).json('Invalid token')

    }

  }
  
  if(!token) {
    return res.status(401).json('You are not authorized');
  }

  // next()
}

export default Auth;