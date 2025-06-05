const handlePostgressErrors = (err, req, res, next) => {
  if (
    err.code === '22P02' ||
    err.code === '23502' ||
    err.code === '23503'
  ) {
    res.status(400).send({ msg: 'bad request' })
  } else {
    next(err);
  }
};

const handleCustomErrors = (err, req, res, next) => {
  if (
    err.status
  ) {
    res.status(err.status).send({ msg: err.msg })
  } else {
    next(err);
  }
};

const handleServerErrors = (err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error' });
};

module.exports = { handlePostgressErrors, handleCustomErrors, handleServerErrors }