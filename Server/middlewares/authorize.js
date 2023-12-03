const authorize = (requiredRole) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (allowedRoles.includes(userRole)) {
      next();
    } else {
      res.status(403).json({ error: "Forbidden" });
    }
  };
};
export default authorize;
