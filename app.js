const express = require("express");
const app = express();
app.set("port", process.env.PORT || 8080);
app.use(express.static(__dirname + "/public"));
app.listen(process.env.PORT || 8080, () => console.log(`Flappy Goku HTML5 is listening on :${app.get("port")}`));