const notfound = (req, res) => {
  const requestedUrl = req.originalUrl;
  const method = req.method;

  return res.status(404).json({
    status: 404,
    message: "Routes not found",
    url: requestedUrl,
    method: method,
  });
};

module.exports = notfound;
