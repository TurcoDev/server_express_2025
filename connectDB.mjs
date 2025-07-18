import mysql from "mysql2/promise";

function connectDB() {
  return mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1234", // replace with your MySQL password
    database: "followers",
  });
}

async function initDB() {
  try {
    // Create a MySQL connection
    const connection = await connectDB();
    console.log("Connected to the database successfully! 👍");
    const [results, fields] = await connection.execute("SELECT * FROM `users`");
    console.log("Users in the database:", results);
    console.log("Database fields:", fields);
    return connection;
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
}

export { connectDB, initDB };