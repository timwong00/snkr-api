exports.sneakers_get_all = (req, res, next) => {
  res.status(200).json({
    message: "got some sneaks?"
  });
};
