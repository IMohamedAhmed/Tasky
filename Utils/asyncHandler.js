const asyncHandler = (callBack) => {
  return async (req, res, next) => {
    try {
      await callBack(req, res, next);
    } catch (error) {
      return res.status(500).json({ message: error.message, success: true });
    }
  };
};

module.exports = asyncHandler;
