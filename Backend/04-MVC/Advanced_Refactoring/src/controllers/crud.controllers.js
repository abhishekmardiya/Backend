//get method controller
const get = (model) => async (req, res) => {
  try {
    const item = await model.find().lean().exec();

    return res.status(200).send({ item: item });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};

//post method controller
const post = (model) => async (req, res) => {
  try {
    const item = await model.create(req.body);

    return res.status(201).send({ item: item });
  } catch (err) {
    return res.status(500).send({ message: err.message });
  }
};
//method 1 for export
module.exports = {
  get,
  post,
};
