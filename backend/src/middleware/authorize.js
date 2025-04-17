export function authorizeLeader(req, res, next) {
    if (!req.user.roles.includes('leader')) {
      return res.status(403).json({ error: 'Keine Zugriffsrechte' });
    }
    next();
  }
  