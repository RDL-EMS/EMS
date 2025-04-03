import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];  // Extract token from "Bearer <token>"

    if (!token) {
        return res.status(401).json({ message: "❌ Unauthorized: No token provided" });
    }

    try {
        const decoded = jwt.verify(token, "your-secret-key");  // ✅ Verify token
        req.user = decoded;  // Attach decoded user data to request
        next();  // ✅ Continue to next middleware/route
    } catch (error) {
        res.status(403).json({ message: "❌ Forbidden: Invalid token" });
    }
};

export default authenticate;
