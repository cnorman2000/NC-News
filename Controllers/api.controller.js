const endpointsJson = require("../endpoints.json");

exports.fetchApi = (req, res) => {
  res.status(200).send({ endpoints: endpointsJson });
};
