import Boating from "../models/boating.js";

/* GET WITH FILTER */
export const getBoats = async (req, res) => {
  const { type } = req.query;

  let filter = { isActive: true };
  if (type) filter.type = type;

  const boats = await Boating.find(filter);
  res.json(boats);
};

/* GET BY ID */
export const getBoatById = async (req, res) => {
  const boat = await Boating.findById(req.params.id);
  res.json(boat);
};

/* CREATE */
export const createBoat = async (req, res) => {
  const boat = await Boating.create(req.body);
  res.status(201).json(boat);
};

/* UPDATE */
export const updateBoat = async (req, res) => {
  const boat = await Boating.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });
  res.json(boat);
};

/* DELETE */
export const deleteBoat = async (req, res) => {
  await Boating.findByIdAndDelete(req.params.id);
  res.json({ message: "Boat deleted" });
};