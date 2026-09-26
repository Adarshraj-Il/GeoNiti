export const requirePermission = (permissionName) => {
  return (req, res, next) => {
    if (!req.user?.permissions?.includes(permissionName)) {
      return res.status(403).json({ message: 'Forbidden: missing permission' });
    }
    next();
  };
};
