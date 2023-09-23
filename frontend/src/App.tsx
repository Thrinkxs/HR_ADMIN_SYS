import axios from "axios";
import { Routes, Route } from "react-router-dom";

axios.defaults.baseURL = "http://localhost:3001/";
// const crypto = require("crypto");

// const id = crypto.randomBytes(16).toString("hex");
function App() {
  return (
    <>
      <h1 className="text-red-600">Hey</h1>
    </>
  );
}

export default App;
