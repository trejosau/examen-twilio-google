import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../utils/jwt";

interface AuthenticatedRequest extends Request {
    user?: { userId: string; role: string };
}

export const authMiddleware = (allowedRoles: string[]) => {
    return (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
        const token = req.headers.authorization?.split(" ")[1];

        if (!token) {
            res.status(401).json({ message: "Acceso denegado. Token no proporcionado." });
            return;
        }

        const decoded = verifyToken(token);
        if (!decoded) {
            res.status(401).json({ message: "Token inválido o expirado." });
            return;
        }

        req.user = decoded as { userId: string; role: string };

        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({ message: "Acceso denegado. No tienes permisos." });
            return;
        }

        next();
    };
};
