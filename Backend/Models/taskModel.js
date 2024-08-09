const pool = require("../Config/db");

class Task {
  static async createTask(name) {
    const result = await pool.query(
      "INSERT INTO tasks (name) VALUES ($1) RETURNING *",
      [name]
    );
    return result.rows[0];
  }

  static async getTaskById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async updateTask(id, name) {
    const result = await pool.query(
      "UPDATE tasks SET name = $1 WHERE id = $2 RETURNING *",
      [name, id]
    );
    return result.rows[0];
  }

  static async softDeleteTask(id) {
    const result = await pool.query(
      "UPDATE tasks SET isDeleted = true WHERE id = $1 RETURNING *",
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Task;
