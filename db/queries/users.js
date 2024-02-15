const db = require('../connection');

const getUsers = () => {
  return db.query('SELECT * FROM users;')
    .then(data => {
      return data.rows;
    });
};

const getUserByEmail = async (email) => {
  const query = {
    text: 'SELECT * FROM users WHERE email = $1',
    values: [email]
  };

  try {
    const result = await db.query(query);
    return result.rows[0]; // Assuming email is unique, return the first user found
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  const query = {
    text: 'SELECT * FROM users WHERE id = $1',
    values: [userId]
  };

  try {
    const result = await db.query(query);
    return result.rows[0]; // Assuming user ID is unique, return the first user found
  } catch (error) {
    throw error;
  }
};

function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;

}

//create a user

const createUser = async (user) => {
  const { name, email, password, status, phone } = user;

  const query = {
    text: 'INSERT INTO users(name, email, password, status, phone) VALUES($1, $2, $3, $4, $5)',
    values: [name, email, password, status, phone]
  };

  try {
    await db.query(query);
  } catch (error) {
    throw error;
  }
};

async function getOrderById(orderID) {
  try {
    // Perform a database query to fetch the order data based on the provided orderId
    const query = 'SELECT * FROM orders WHERE id = $1';
    const values = [orderID];
    const result = await db.query(query, values);

    // Return the fetched order data
    return result.rows[0]; // Assuming you expect only one order with the provided ID
  } catch (error) {
    // Handle any errors that occur during the database query
    console.error('Error fetching order by ID:', error);
    throw error; // Rethrow the error to be handled by the caller
  }
}

//current order for userID

const queryCurrentOrder = (userID) => {
  const queryCurrent = `SELECT *
  FROM orders
  WHERE user_id = $1 AND order_placed IS NOT NULL AND order_ready IS NULL
  `;
  return db.query(queryCurrent, [userID])
  .then((data) => {
    return data.rows;
  })
}

const createNewOrderQuery = (userID) => {
  const queryCreate = `INSERT INTO orders (user_id) VALUES ($1)
  RETURNING *;
  `;
  return db.query(queryCreate, [userID])
  .then((data) => {
    return data.rows;
  })
}

const queryAllFoodItems = () => {
  const querymenu = `SELECT id, name, description, price, photo_url
  FROM menu;
  `;
  return db.query(querymenu)
};

const addToCart = (orderID, menuItemID, quantity) => {
  const insertQuery = `
  INSERT INTO ordered_items (order_id, menu_item_id, quantity) VALUES ($1, $2, $3)
  `;
  return db.query(insertQuery, [orderID, menuItemID, quantity || 1])
  .then((data) => {
    return data.rows;
  })
  .catch((err) => {
    console.log(err.message);
  })
}


module.exports = { getUsers, getUserByEmail, generateRandomString, createUser, queryCurrentOrder, createNewOrderQuery, queryAllFoodItems, getOrderById, getUserById, addToCart};
