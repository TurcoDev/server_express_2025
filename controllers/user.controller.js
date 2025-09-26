import UserModel from "../models/user.model.js";

class UserController {
  async getAllUsers(req, res) {
    try {
      const users = await UserModel.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      res.status(500).json({ error: "Database connection not established" });
    }
  }

  async createUser(req, res) {
    try {
      const newUser = req.body;
      
      // Validación básica
      if (!newUser.username || !newUser.role) {
        return res.status(400).json({ error: "Username and role are required" });
      }

      const result = await UserModel.createUser(newUser);
      res.status(201).json(result);
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Database connection not established" });
    }
  }

  async updateUser(req, res) {
    try {
      const userId = parseInt(req.params.id);
      const updatedUser = req.body;

      // Validación básica
      if (!updatedUser || !userId) {
        return res.status(400).json({ error: "Invalid user data" });
      }

      const result = await UserModel.updateUser(userId, updatedUser);
      
      if (result.affectedRows > 0) {
        res.status(200).json(updatedUser);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error updating user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async deleteUser(req, res) {
    try {
      const userId = parseInt(req.params.id);

      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const result = await UserModel.deleteUser(userId);
      
      if (result.affectedRows > 0) {
        return res.status(200).end();
      } else {
        return res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error deleting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }

  async getUserById(req, res) {
    try {
      const userId = parseInt(req.params.id);

      if (!userId) {
        return res.status(400).json({ error: "Invalid user ID" });
      }

      const user = await UserModel.getUserById(userId);
      
      if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    } catch (error) {
      console.error("Error getting user:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  }
}

export default new UserController();