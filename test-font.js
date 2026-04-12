const { Bitcount_Grid_Double } = require("next/font/google");
try {
  let font = Bitcount_Grid_Double({ subsets: ["latin"], weight: "400" });
  console.log("400 OK");
} catch(e) { console.log(e.message); }
