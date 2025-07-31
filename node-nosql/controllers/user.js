import User from '#models/user.js';

export async function createUser(req, res) {
  try {
    const user = new User(req.body);
    await user.save();

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: `Error creating user: ${error}` });
  }
}

export async function getUsers(_, res) {
  try {
    const users = await User.find();

    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: `Error fetching users: ${error}` });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const updatedUser = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found ' });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(400).json({ error: `Error updating user: ${error}` });
  }
}

export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    res.status(500).json(`Error deleting user: ${error}`);
  }
}
