const jwt = require("jsonwebtoken");

const JWT_SECRET = "secretkey";

module.exports = function (req, res, next) {
    try {
        let token = req.header("Authorization");

        if (!token) {
            return res.status(401).json({ message: "No token, authorization denied" });
        }

        // handle both formats
        if (token.startsWith("Bearer ")) {
            token = token.slice(7).trim();
        }

        const decoded = jwt.verify(token, JWT_SECRET);

        req.user = { id: decoded.id };

        next();
    } catch (err) {
        console.error("Auth error:", err.message);
        res.status(401).json({ message: "Token is not valid" });
    }
};