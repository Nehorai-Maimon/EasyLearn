/**
 * Health check controller
 * Verifies system availability and uptime
 */
export const getHealthStatus = (req, res) => {
  res.status(200).json({
    status: 'OK',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    service: 'EasyLearn Backend API'
  });
};
