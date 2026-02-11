const db = require('../config/database');

class User {
    static async findAll() {
        const result = await db.query('SELECT * FROM users');
        return result.rows;
    }

    static async findById(id) {
        const result = await db.query('SELECT * FROM users WHERE id = $1', [id]);
        return result.rows[0];
    }

    static async create(user) {
        const { name, email } = user;
        const result = await db.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );
        return result.rows[0];
    }
}

module.exports = User;
