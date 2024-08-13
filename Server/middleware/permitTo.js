const permitTo = (...allowedRoles) => {
    
    return (req, res, next) => {

        // Check if the user's role is in the list of allowed roles
        const hasPermission = allowedRoles.includes(req.user.role);

        if (!hasPermission) {
            return res.status(403).json({
                message: 'Forbidden. You do not have the required permissions.'
            });
        }

        // If user has permission, proceed to the next middleware or route handler
        next();
    };
};

module.exports = permitTo;
