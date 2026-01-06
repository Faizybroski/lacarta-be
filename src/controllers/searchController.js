import Activity from "../models/activity.js";
import Boating from "../models/boating.js";
import Tour from "../models/tour.js";
import Gastronomy from "../models/gastronomy.js";
import Trip from "../models/trip.js";
import HotelBooking from "../models/hotelBooking.js";
import restaurant from "../models/restaurant.js";

export const globalSearch = async (req, res) => {
  try {
    const { q, page = 1, limit = 8, type } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const skip = (page - 1) * limit;
    const searchQuery = { $text: { $search: q } };

    let results = [];

    if (!type || type === "activities") {
      const activities = await Activity.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "activities", data: activities });
    }

    if (!type || type === "boating") {
      const boats = await Boating.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "boating", data: boats });
    }

    if (!type || type === "tours") {
      const tours = await Tour.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "tours", data: tours });
    }

    if (!type || type === "gastronomy") {
      const food = await Gastronomy.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "gastronomy", data: food });
    }

    if (!type || type === "hotelBooking") {
      const food = await Gastronomy.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "hotelBooking", data: food });
    }

    if (!type || type === "trips") {
      const food = await Gastronomy.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "trips", data: food });
    }

     if (!type || type === "restaurants") {
      const food = await Gastronomy.find(searchQuery)
        .limit(limit)
        .skip(skip);
      results.push({ type: "restaurants", data: food });
    }

    res.json({
      query: q,
      page: Number(page),
      results,
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};