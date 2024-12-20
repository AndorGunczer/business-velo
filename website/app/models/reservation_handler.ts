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

// Function to check if all 2-seated tables are reserved QUERY WORKS
// async function areAll2SeatedTablesReserved(floor: string, startDate: string, endDate: string) {
//   const connection = await mysql.createConnection(dbConfig);
  
//   try {
//     const [rows] = await connection.execute(`
//       SELECT COUNT(tables.id) AS total_tables,
//              COUNT(reservations.id) AS reserved_tables
//       FROM Tische AS tables
//       JOIN TischTyp AS table_types ON tables.tischtyp_id = table_types.id
//       JOIN Gebäude AS buildings ON tables.gebäude_id = buildings.id
//       LEFT JOIN Reservierungen AS reservations ON tables.id = reservations.tisch_id
//         AND reservations.reserv_start < ?
//         AND reservations.reserv_end > ?
//       WHERE table_types.plätze = 2
//         AND buildings.name = ?;
//     `, [endDate, startDate, floor]);

//     const totalTables = rows[0].total_tables;
//     const reservedTables = rows[0].reserved_tables;

//     return totalTables > 0 && totalTables === reservedTables;
//   } finally {
//     await connection.end();
//   }
// }

// Function to check if all 2-seated tables are reserved JSON DEVELOPMENT
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

// Function to check availability and make a reservation
async function makeReservation(floor: string, startDate: string, endDate: string) {

  const connection = await mysql.createConnection(dbConfig);

  try {
    // Step 1: Check if there are any free 2-seated tables for the specified time period and floor
    const [rows] = await connection.execute(`
      SELECT tables.id
      FROM Tische AS tables
      JOIN TischTyp AS table_types ON tables.tischtyp_id = table_types.id
      JOIN Gebäude AS buildings ON tables.gebäude_id = buildings.id
      LEFT JOIN Reservierungen AS reservations ON tables.id = reservations.tisch_id
        AND reservations.reserv_start < ?
        AND reservations.reserv_end > ?
      WHERE table_types.plätze = 2
        AND buildings.name = ?
        AND reservations.id IS NULL
      LIMIT 1;  -- Retrieve only one available table
    `, [endDate, startDate, floor]);

    if (rows.length === 0) {
      // No tables are available
      console.log('No 2-seated tables are available on this floor during the specified time.');
      return { success: false, message: 'No tables available.' };
    }

    // Step 2: Insert a new reservation for the available table
    const availableTableId = rows[0].id;
    const [insertResult] = await connection.execute(`
      INSERT INTO Reservierungen (tisch_id, reserv_start, reserv_end, reserv_created, status)
      VALUES (?, ?, ?, NOW(), 'confirmed');
    `, [availableTableId, startDate, endDate]);

    console.log(`Reservation successful for table ID ${availableTableId}.`);
    return { success: true, message: 'Reservation made successfully.', tableId: availableTableId };

  } catch (error) {
    console.error('Error making reservation:', error);
    return { success: false, message: 'Error making reservation.' };

  } finally {
    await connection.end();
  }
}

// Export the function so it can be used in other files
module.exports = {
  areAll2SeatedTablesReserved,
  makeReservation,
};

