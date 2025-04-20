import jwt from "jsonwebtoken";

const authMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ success: false, message: "No token provided" });
        }

        const token = authHeader.split(" ")[1];
        //console.log("Received Token:", token);  // Log token

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.body.userId = decoded.id;
        next();
    } catch (error) {
        console.error("Token verification failed:", error);
        res.status(401).json({ success: false, message: "Invalid or expired token" });
    }
};

export default authMiddleware;

