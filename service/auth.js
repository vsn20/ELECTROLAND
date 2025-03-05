const jwt = require("jsonwebtoken");

const secret ="avula"


function setuser(user){
    return jwt.sign({
        _id: user._id,
        email:user.email,
        type:user.type,
    },secret);
}

function getuser(token){
    if(!token) return null;
    return jwt.verify(token,secret);
}

module.exports ={
    setuser,
    getuser,
};