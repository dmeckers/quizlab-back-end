const jwt = require('jsonwebtoken');
const {secret} = require('../jwt_config');

module.exports = function (req,res,next){

    if(req.method === "OPTIONS"){
        next();
    }

    try {
        const token = req.headers.authorization.split(' ')[1];

        if(!token)
            return res.status(403).json({message:"User is not authorized"});

        const decodedData = jwt.verify(token , secret );

        req.user = decodedData;

        next();

    } catch (error) {
        console.log(error);
        return res.status(403).json({message:"User is not authorized"})
    }
};