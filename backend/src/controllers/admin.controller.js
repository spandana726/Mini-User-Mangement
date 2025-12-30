import User from "../models/User.js";

export const getAllUsers = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = 10;
    const skip = (page - 1) * limit;

    const users = await User.find()
      .select("-password")
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });

    const totalUsers = await User.countDocuments();
    const totalPages = Math.ceil(totalUsers / limit);

    res.status(200).json({
      data: users,
      pagination: {
        totalPages
      }
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch users"
    });
  }
};

export const activateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "active";
    await user.save();

    res.status(200).json({
      message: "User activated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to activate user"
    });
  }
};

export const deactivateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.status = "inactive";
    await user.save();

    res.status(200).json({
      message: "User deactivated successfully"
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to deactivate user"
    });
  }
};
