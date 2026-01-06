import Gastronomy from "../models/gastronomy.js";

/* GET ALL */
export const getGastronomy = async (req, res) => {
  const data = await Gastronomy.find({ isActive: true });
  res.json(data);
};

/* GET BY ID */
export const getGastronomyById = async (req, res) => {
  const item = await Gastronomy.findById(req.params.id);
  res.json(item);
};

/* CREATE (ADMIN) */
export const createGastronomy = async (req, res) => {
  const item = await Gastronomy.create(req.body);
  res.status(201).json(item);
};

/* UPDATE */
export const updateGastronomy = async (req, res) => {
  const item = await Gastronomy.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(item);
};

/* DELETE */
export const deleteGastronomy = async (req, res) => {
  await Gastronomy.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted successfully" });
};