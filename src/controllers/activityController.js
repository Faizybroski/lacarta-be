import Activity from "../models/activity.js";


export const createActivity = async (req, res) => {
  try {
    const { title, description, image, category } = req.body;

    if (!title || !description || !image || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const activity = await Activity.create({
      title,
      description,
      image,
      category
    });

    res.status(201).json({
      message: "Activity created successfully",
      activity
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getActivities = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 8;
    const skip = (page - 1) * limit;

    const totalActivities = await Activity.countDocuments();
    const activities = await Activity.find()
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalActivities / limit),
      totalActivities,
      activities
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getActivityById = async (req, res) => {
  try {
    const activity = await Activity.findById(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.status(200).json(activity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


/* UPDATE ACTIVITY */
export const updateActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json(activity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/* DELETE ACTIVITY */
export const deleteActivity = async (req, res) => {
  try {
    const activity = await Activity.findByIdAndDelete(req.params.id);

    if (!activity) {
      return res.status(404).json({ message: "Activity not found" });
    }

    res.json({ message: "Activity deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};