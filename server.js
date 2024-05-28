const express = require("express");
const app = express();
const port = 3000;
const path = require("path");
const fs = require("fs");

// Set EJS as the templating engine
app.set("view engine", "ejs");

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "public")));
app.use("/assets", express.static(path.join(__dirname, "assets")));

// Parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import date from the utils directory
const date = require("./utils/date");
const getDate = date();
console.log(getDate);

const appendFile = (filename) => {
  const folderPath = "files";
  const filePath = path.join(__dirname, folderPath, `${filename}.txt`);

  fs.appendFile(`${filePath}`, " Ab Jao Padhlo :)", function (error) {
    if (error) {
      console.log(error);
    } else {
      console.log("Success !");
    }
  });
};

// Define a route for the homepage
app.get("/", (req, res) => {
  fs.readdir("files", function (error, files) {
    if (error) {
      console.log(error);
    } else {
      res.render("index", { files });
    }
  });
});
// Route to handle file creation
app.get("/addFile", (req, res) => {
  appendFile(getDate);
  res.redirect("File Created");
});

// Route to render the edit page with the file's content
app.get("/editFile/:filename", (req, res) => {
  const filename = req.params.filename;
  fs.readFile(`./files/${filename}`, "utf-8", (error, data) => {
    if (error) {
      res.send(error);
    } else {
      res.render("edit", { data, filename: req.params.filename });
    }
  });
});

app.post("/updateFile/:filename", (req, res) => {
  const filename = req.params.filename;
  const editAreaContent = req.body.editArea; // Retrieve the editArea content from the request body

  // Check if editAreaContent is undefined or empty
  if (editAreaContent === undefined || editAreaContent === "") {
    return res.status(400).send("Edit area content is missing or empty");
  }

  // Write the editArea content to the specified file
  fs.writeFile(`./files/${filename}`, editAreaContent, (error) => {
    if (error) {
      console.error(error);
      return res.status(500).send("Failed to update file");
    }
    res.status(200).send("File updated successfully");
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
