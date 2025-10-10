import database from "infra/database";

async function status(request, response) {
  try {
    const result = await database.query("SELECT 1 + 1 as sum;");
    console.log("Query result:", result.rows);
    response.status(200).json({
      status: "ok",
      updated_at: new Date().toISOString(),
      database_status: result.rows[0],
    });
  } catch (error) {
    console.error("API Error:", error);
    response.status(500).json({
      status: "error",
      message: "Database connection failed",
      error: error.message,
    });
  }
}

export default status;
