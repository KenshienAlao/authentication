require("dotenv").config();
const app = require("./app");

// port
const PORT = process.env.PORT;

// server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
