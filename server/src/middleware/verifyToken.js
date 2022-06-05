const jwt = require('jsonwebtoken');
const User = require('../models/User');
const verifyToken = async (req, res, next) => {
    const token = req.headers.token;
    if (token) {
        let accessToken = token.split(" ")[1];
        if (accessToken && accessToken.length < 500) {
            jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
                if (err) {
                    if (err.name === "TokenExpiredError") {
                        return res.status(401).json('accessToken is expired!!!');
                    }
                    return res.status(403).json('Token is not valid!!!');
                }
                req.userId = user?.id;
                next();
            });
        }
        else {
            const decodedData = jwt.decode(token.split(" ")[1]);
            const googleId = decodedData?.sub.toString();
            const user = await User.findOne({ googleId });
            req.userId = user?._id;
            next();
        }
    }
    else {
        return res.status(401).json("You are not authenticated!");
    }
}

module.exports = {verifyToken};