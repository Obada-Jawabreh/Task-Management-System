const pool = require("../Config/db");

class Task {
  static async createTask(taskData) {
    const { title, description, due_date, status = 'Pending', user_id = null } = taskData;
    const result = await pool.query(
      `INSERT INTO tasks (title, description, due_date, status, user_id) 
       VALUES ($1, $2, $3, $4, $5) RETURNING *`,
      [title, description, due_date, status, user_id]
    );
    return result.rows[0];
  }

  static async getTaskById(id) {
    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);
    return result.rows[0];
  }

  static async updateTask(id, taskData) {
    const { title, description, due_date, status } = taskData;
    const result = await pool.query(
      `UPDATE tasks 
       SET title = $1, description = $2, due_date = $3, status = $4, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $5 RETURNING *`,
      [title, description, due_date, status, id]
    );
    return result.rows[0];
  }

  static async softDeleteTask(id) {
    const result = await pool.query(
      `UPDATE tasks 
       SET is_deleted = true, updated_at = CURRENT_TIMESTAMP 
       WHERE id = $1 RETURNING *`,
      [id]
    );
    return result.rows[0];
  }
}

module.exports = Task;