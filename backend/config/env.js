import "dotenv/config";

const REQUIRED_VARS = ["PORT", "MONGODB_URL", "LEM_API_KEY", "BCL_API_KEY"];

function readConfig() {
  const missing = REQUIRED_VARS.filter((name) => !process.env[name]);

  if (missing.length > 0) {
    throw new Error(
      `Missing required environment variable(s): ${missing.join(", ")}. ` +
        "Copy .env.example to .env and fill in the values.",
    );
  }

  return {
    port: process.env.PORT,
    mongodbUrl: process.env.MONGODB_URL,
    lemApiKey: process.env.LEM_API_KEY,
    bclApiKey: process.env.BCL_API_KEY,
    frontendOrigin: process.env.FRONTEND_ORIGIN || "http://localhost:5173",
  };
}

export const config = readConfig();
