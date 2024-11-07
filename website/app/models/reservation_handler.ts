const mysql = require('mysql2/promise');
import dotenv from "dotenv";

dotenv.config();

const databaseHost: string = process.env.DATABASE_HOST!;
const databaseUser: string = process.env.DATABASE_USER!;
const databasePassword: string = process.env.DATABASE_PW!;
const databaseDB: string = process.env.DATABASE_DB!;
const databasePort: string = process.env.DATABASE_PORT!;

// Database configuration
// const dbConfig = {
//   host: databaseHost, // Change this to your database host
//   user: databaseUser, // Change this to your database username
//   password: databasePassword, // Change this to your database password
//   database: databaseDB, // Your database name
//   port: databasePort,
// };
const dbConfig = {
  host: "192.168.10.3", // Change this to your database host
  user: "root", // Change this to your database username
  password: "Test", // Change this to your database password
  database: "Reservierungen", // Your database name
  port: "3306",
};

// Function to check if all 2-seated tables are reserved
async function areAll2SeatedTablesReserved(floor: string, startDate: string, endDate: string) {
  const connection = await mysql.createConnection(dbConfig);
  
  try {
    const [rows] = await connection.execute(`
      SELECT COUNT(tables.id) AS total_tables,
             COUNT(reservations.id) AS reserved_tables
      FROM Tische AS tables
      JOIN TischTyp AS table_types ON tables.tischtyp_id = table_types.id
      JOIN Gebäude AS buildings ON tables.gebäude_id = buildings.id
      LEFT JOIN Reservierungen AS reservations ON tables.id = reservations.tisch_id
        AND reservations.reserv_start < ?
        AND reservations.reserv_end > ?
      WHERE table_types.plätze = 2
        AND buildings.name = ?;
    `, [endDate, startDate, floor]);

    const totalTables = rows[0].total_tables;
    const reservedTables = rows[0].reserved_tables;

    return totalTables > 0 && totalTables === reservedTables;
  } finally {
    await connection.end();
  }
}

// Export the function so it can be used in other files
module.exports = {
  areAll2SeatedTablesReserved,
};
