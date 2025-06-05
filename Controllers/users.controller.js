const { selectUsers } = require("../Models/users.model");

exports.getUsers = (req, res, next) => {
  selectUsers()
    .then((users) => {
      res.status(200).send({ users });
      console.log(users)
    })
    .catch((err) => {
      next(err)
    });
};
  