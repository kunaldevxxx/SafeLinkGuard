const {getUser} = require("../service/auth");

function checkForAuthentication(req,res,next){
    const tokencookie = req.cookies?.token;
    req.user=null;
    if(!tokencookie) return next();
    const token=tokencookie;
    const user = getUser(token);
    req.user=user;
    return next();
}

//Admin / User
function restrictTo(role) {
    return function(req, res, next) {
        if (!req.user) return res.redirect("/login");
        
        console.log("Role:", role);
        console.log("User Role:", req.user.role);

        if (!role.includes(req.user.role)) return res.end("Unauthorized");
        return next();
    }
}


// async function restrictToLoggedinUserOnly(req,res,next){
//     const userUid=req.headers["Authorization"];
//     console.log(req.headers);
//     if(!userUid) return res.redirect("/login");
//     const token = userUid?.split("Bearer ")[1];
//     const user=getUser(token);
//     if(!user) return res.redirect("/login");
//     req.user=user;
//     next();
// }
// async function checkAuth(req,res,next){
//     console.log(req.headers);
//     const userUid=req.headers["authorization"];
//     const token = userUid?.split("Bearer ")[1];
   
//     const user=getUser(token);
//     req.user=user;
//     next();
// }
module.exports={
    // restrictToLoggedinUserOnly,
    // checkAuth,
    checkForAuthentication,
    restrictTo
};