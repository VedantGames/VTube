const asyncHandeller = (requestHandeller) => {
  return (req, res, next) => {
    Promise.resolve(requestHandeller(req, res, next)).catch((err) => 
      res.status(400).json({
        message: err.message,
        status: err.statusCode,
        data: err.data,
        success: err.success,
        errors: err.errors
      }));
  }
}

module.exports = asyncHandeller;