// src/index.ts
import path from 'path';
import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
var bodyParser = require('body-parser')
const { areAll2SeatedTablesReserved } = require('./models/reservation_handler');

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

// Serve static files from the `src` folder
app.use(express.static(path.join(__dirname, 'src')));

// app.get("/", (req: Request, res: Response) => {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.get("/", (req: Request, res: Response) => {
  res.render('index.ejs');
})

app.get("/tex-mex-abend", (req: Request, res: Response) => {
  res.render('tex-mex.ejs');
});

// app.get('/check-reservations', async (req: Request, res: Response) => {
//   // Get query parameters from the request
//   const { floor, startDate, endDate } = req.query;

//   if (!floor || !startDate || !endDate) {
//     return res.status(400).json({ error: "Please provide floor, startDate, and endDate query parameters" });
//   }

//   try {
//     // Call the function to check reservations
//     const allReserved = await areAll2SeatedTablesReserved(floor, startDate, endDate);
    
//     if (allReserved) {
//       res.json({ message: "All 2-seated tables on the floor are reserved during the specified time." });
//     } else {
//       res.json({ message: "Some 2-seated tables on the floor are available during the specified time." });
//     }
//   } catch (error) {
//     console.error("Error checking table reservations:", error);
//     res.status(500).json({ error: "An error occurred while checking reservations." });
//   }
// });

interface CalendarRequest {
  floor: string;
  startDate: string;
  endDate: string;
  personen: string;
};

app.post("/check-reservations", jsonParser, async (req: Request, res: Response) => {
  // Get query parameters from the request
  // const { floor, startDate, endDate } = req.query;
  console.log(req.body);
  const json = req.body;
  // const json: any = JSON.parse(req.body);
  const floor: string = json.floor;

  // // date format: 2024-11-10T14:00:00 {yyyy-mm-ddThh:mm:ss}
  // const startDate: string = `${json.year}-${json.month}-${json.day}T${json.hour}:00`;
  // const endDate: string = `${json.year}-${json.month}-${json.day}T${((json.hour).split(":")[0] + 2)}:${(json.hour).split(":")[1]}:00`;

  if (!floor || !json.startDate || !json.endDate) {
    return res.status(400).json({ error: "Please provide floor, startDate, and endDate query parameters" });
  }

  try {
    // Call the function to check reservations
    const allReserved = await areAll2SeatedTablesReserved(floor, json.startDate, json.endDate);
    
    if (allReserved) {
      res.json({ message: "All 2-seated tables on the floor are reserved during the specified time." });
    } else {
      res.json({ message: "Some 2-seated tables on the floor are available during the specified time." });
    }
  } catch (error) {
    console.error("Error checking table reservations:", error);
    res.status(500).json({ error: "An error occurred while checking reservations." });
  }
});

// Route to check if all 2-seated tables are reserved
app.get('/check-2-seated-tables', async (req, res) => {
  // Extract query parameters from the request
  const { floor, startDate, endDate } = req.query;

  // Validate input parameters
  if (!floor || !startDate || !endDate) {
    return res.status(400).json({ error: "Please provide 'floor', 'startDate', and 'endDate' query parameters." });
  }

  try {
    // Call the function to check reservations
    const allReserved = await areAll2SeatedTablesReserved(floor, startDate, endDate);
    
    // Send the result as a JSON response
    res.json({
      floor,
      startDate,
      endDate,
      allReserved,
      message: allReserved 
        ? "All 2-seated tables on the specified floor are reserved during the specified time."
        : "Some 2-seated tables on the specified floor are available during the specified time."
    });
  } catch (error) {
    console.error("Error checking 2-seated table reservations:", error);
    res.status(500).json({ error: "An error occurred while checking reservations." });
  }
});



app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
