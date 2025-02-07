


import User from "../model/user.js";

const deleteUser = async (req, res) => {
  const { userId } = req.params;

  try {

    if (!userId) {
      res.status(400).json({ message: "User ID is required" });
      return;
    }

    // Delete the user document
    const deletedUser = await User.findByIdAndDelete(userId);

    if (!deletedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error" });
    console.log(error);
  }
};

export default deleteUser;
