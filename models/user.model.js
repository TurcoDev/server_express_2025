import { initDB } from "../connectDB.mjs";

class UserModel {
  constructor() {
    this.connection = null;
    this.initConnection();
  }

  async initConnection() {
    this.connection = await initDB();
  }

  async getAllUsers() {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [results, fields] = await this.connection.execute("SELECT * FROM `users`");
    return results;
  }

  async createUser(userData) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const { username, role, created_at } = userData;
    const [result] = await this.connection.execute(
      `INSERT INTO \`users\` (username, role, created_at) VALUES (?, ?, ?)`,
      [username, role, created_at]
    );
    return result;
  }

  async updateUser(userId, userData) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const { username, role, created_at } = userData;
    const [result] = await this.connection.execute(
      `UPDATE \`users\` SET username = ?, role = ?, created_at = ? WHERE id = ?`,
      [username, role, created_at, userId]
    );
    return result;
  }

  async deleteUser(userId) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [result] = await this.connection.execute(
      `DELETE FROM \`users\` WHERE id = ?`,
      [userId]
    );
    return result;
  }

  async getUserById(userId) {
    if (!this.connection) {
      throw new Error("Database connection not established");
    }
    const [result] = await this.connection.execute(
      `SELECT * FROM \`users\` WHERE id = ?`,
      [userId]
    );
    return result[0];
  }
}

export default new UserModel();