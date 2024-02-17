const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET || "Kunal$190"; 

function setUser(user) {
    try {
        return jwt.sign({
            _id:user._id,
            email:user.email,
            role:user.role,
        }, secret, { expiresIn: '1d' }); 
    } catch (error) {
        console.error('Error signing JWT:', error);
        throw new Error('Error signing JWT');
    }
}

function getUser(token) {
    if (!token) return null;
    try {
        return jwt.verify(token, secret);
    } catch (error) {
        console.error('Error verifying JWT:', error);
        return null; 
    }
}

module.exports = {
    setUser,
    getUser,
};
