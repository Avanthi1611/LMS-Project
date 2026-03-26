const express = require("express");
const app = express();
const PORT = 3000;

app.get("/", (req, res) => {
  res.send("LMS Backend is Running! 🚀");
});

app.listen(PORT, () => {
  console.log(`Server is live on http://localhost:${PORT}`);
});
