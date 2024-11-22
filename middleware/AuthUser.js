require('dotenv').config
const jwt = require('jsonwebtoken');

const authMiddleware = async(req, res, next) => {
    try {
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            return res.status(401).json({ error: "Athirization token  required" });
        const secret = process.env.JWT_SECRET;

        // @ts-ignore
        const decoded = jwt.verify(token, secret);
        req.user = decoded;

        next();
    } catch (error) {
        console.error(error);
        return res.status(403).json({ error: "Invalid or expired token" });
    }
}

module.exports = authMiddleware;