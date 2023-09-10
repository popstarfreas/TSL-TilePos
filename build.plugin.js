var fs = require("fs");
var child_process = require("child_process");

child_process.execSync("yarn remove terrariaserver-lite", { stdio: "inherit" })
child_process.execSync("yarn add ../../pluginreference", { stdio: "inherit" })
child_process.execSync("npm run build", { stdio: "inherit" })
fs.renameSync("./build", "./plugin")
