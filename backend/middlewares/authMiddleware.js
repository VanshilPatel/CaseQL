import jwt from "jsonwebtoken";
const JWT_SECRET = process.env.JWT_SECRET;

function authMiddleware(req, res, next) {
    let token = req.headers.authorization;

    if (!token) {
        return res.status(401).json({ message: "Token not found" });
    }

    try {
        if (!token.startsWith("Bearer ")) {
            throw new Error("Invalid token format");
        }

        token = token.replace("Bearer ", "");
        jwt.verify(token, JWT_SECRET);
        next();
    } catch (error) {
        if (error.name === "JsonWebTokenError") {
            return res.status(401).json({ message: "Invalid token" });
        } else if (error.name === "TokenExpiredError") {
            return res.status(401).json({ message: "Token expired" });
        } else {
            return res.status(500).json({ message: "Server Error" });
        }
    }
}

module.exports = authMiddleware;
