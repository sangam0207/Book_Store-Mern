const express = require("express");
const mongoose = require("mongoose");
const { PORT, MongoDbURL } = require("./config");
const { Book } = require("./models/bookStore");
const app = express();
app.use(express.json());

const cors=require('cors');
const corsOptions = {
    origin: 'http://localhost:3000', 
    methods: ['GET','POST','PUT','DELETE'],
    allowedHeaders:['Content-Type']
  };
  
  app.use(cors(corsOptions));
app.get("/", (request, response) => {
  console.log(request);
  return response.status(234).send("Welcome to mern stact project");
});
// Route for save a new Book
app.post("/books", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      request.response
        .status(400)
        .send({ message: "Send All required Fields" });
    }
    const newBook = {
      title: request.body.title,
      author: request.body.author,
      publishYear: request.body.publishYear,
    };
    const book = await Book.create(newBook);
    return response.status(201).send({ book });
    console.log(book);
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for Get All Books from database
app.get("/books", async (request, response) => {
  try {
    const books = await Book.find();
    console.log(books);
    return response.status(200).send({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
  }
});

// Route for get One Book from database by Id;
app.get("/books/:id", async (request, response) => {
  const { id } = request.params;
  try {
    const book = await Book.findById(id);
    if (!book) {
      return response.status(404).json({ message: "Book not found" });
    }
    return response.status(200).json(book);
  } catch (err) {
    response.status(500).json({ message: err.message });
  }
});
// Route for Update the data
app.put("/books/:id", async (request, response) => {
  try {
    if (
      !request.body.title ||
      !request.body.author ||
      !request.body.publishYear
    ) {
      request.response
        .status(400)
        .send({ message: "Send All required Fields" });
    }
    const { id } = request.params;
    const result = await Book.findByIdAndUpdate(id, request.body);
    if (!result) {
      response.status(404).send({ message: "Book Not Found" });
    }
    return response
      .status(200)
      .send({ message: "Book Section updated successfully" });
  } catch (error) {
    response.status(500).json({ message: err.message });
  }
});
// Route for remove the book section
app.delete("/books/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return response.status(404).send({ message: "Book not found" });
    }
    return response.status(200).send({ message: "Book deleted successfully" });
  } catch (error) {
    response.status(500).json({ message: err.message });
  }
});

mongoose
  .connect(MongoDbURL)
  .then(() => {
    console.log("Successfully Connected");
  })
  .catch((error) => {
    console.log("connection Failed");
  });
app.listen(PORT, () => {
  console.log(`App is listening to port : ${PORT}`);
});
