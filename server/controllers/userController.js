const User = require('../models/User');

// Create new user
exports.createUser = async (req, res) => {
  try {
    const { clerkId, email, username, firstName, lastName, profileImage } = req.body;
    const user = new User({
      clerkId,
      email,
      username,
      firstName,
      lastName,
      profileImage,
    });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error creating user', error: error.message });
  }
};

// Get user by clerkId
exports.getUser = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const user = await User.findOne({ clerkId });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user', error: error.message });
  }
};

// Update user
exports.updateUser = async (req, res) => {
  try {
    const { clerkId } = req.params;
    const updates = req.body;
    const user = await User.findOneAndUpdate(
      { clerkId },
      { $set: updates },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message });
  }
}; 