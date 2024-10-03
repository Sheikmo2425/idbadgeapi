"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    if (req.session.userId) {
        next();
    }
    else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.isAuthenticated = isAuthenticated;
