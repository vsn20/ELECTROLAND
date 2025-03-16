const {getuser} = require("../service/auth");


async function restrictlogedinuser(req,res,next){
    const userid= req.cookies?.uid;

    if (!userid) return res.redirect("/login");
    
    const user = await getuser(userid);

    if (!user) return res.redirect("/login");

    req.user = user;
    next();
}

function restrict(usertype) {
    return (req, res, next) => {
        
        if (req.user && req.user.type === usertype) {
            next(); // Allow access
        } else {
            res.status(403).send(`
                <html>
                <head>
                    <title>Access Denied</title>
                </head>
                <body>
                    <h1 style="color: red; text-align: center;">Not an Authorized Request</h1>
                </body>
                </html>
            `);
        }
    };
}

function employeerestrict()
{
    return (req, res, next) => {
        next();
    };
}



module.exports={restrictlogedinuser,restrict,employeerestrict
    
};