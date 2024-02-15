const db = require('../connection');

const getUserByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE username = $1',
    values: [email]
  };

  try {
    const result = await db.query(query);
    return result.rows[0]; // Assuming email is unique, return the first user found
  } catch (error) {
    throw error;
  }
};

module.exports = { getUserByEmail };
