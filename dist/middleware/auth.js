"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticated = void 0;
const isAuthenticated = (req, res, next) => {
    var _a;
    if ((_a = req === null || req === void 0 ? void 0 : req.session) === null || _a === void 0 ? void 0 : _a.userId) {
        next();
    }
    else {
        res.status(401).json({ error: 'Unauthorized' });
    }
};
exports.isAuthenticated = isAuthenticated;
