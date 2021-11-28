const express = require("express");
const mongoose=require("mongoose");
const connect = () => {
return mongoose.connect("mongodb://localhost:27017/test");
};
//users schema
const userSchema = new mongoose.Schema (
{

first_name: {type: String, required: true },
last_name: {type: String, required: false },
email: {type: String, reuired:true,unique:true },
gender: {type: String, required: false, default :"Female" },
age:{ type: Number, required: true}
},
{
versionKey: false,
timestamp: true,
}

);
const User = mongoose.model("user",userSchema);//users model create
//section Schem
const sectionSchema = new mongoose.Schema (
{
book_id:[
{
type: mongoose.Schema.Types.ObjectId,
ref: "book",
required: false,
},
],
user_id:{
type: mongoose.Schema.Types.ObjectId,
ref: "user",
required: true,
},
},
{
versionKey:false,
timestamp: true,
}
);
const Section = mongoose.model("section",sectionSchema);
//author Schema
 const authorSchema = new mongoose.Schema (
{
first_name:{type:String,required: true },
last_name:{type:String,required: false },
},
{
versionKey:false,
timestamp: true,
}
);
const Author = mongoose.model("author",authorSchema);

// book Schema
const bookSchema = new mongoose.Schema (
{
book_name:{type:String,required: true },
book_body:{type:String,required: true},
user_id:{
type: mongoose.Schema.Types.ObjectId,
ref: "user",
required: true,
},
section_id:{
type: mongoose.Schema.Types.ObjectId,
ref: "section",
required: true,
},
author_id:[
{
type: mongoose.Schema.Types.ObjectId,
ref: "author",
required: true,
},
],
},
{
versionKey:false,
timestamp: true,
}
);
const Book = mongoose.model("book",bookSchema);

//Checkout Schema
const checkoutSchema = new mongoose.Schema (
{
book_id:[
{
type: mongoose.Schema.Types.ObjectId,
ref: "book",
required:false ,
},
],
user_id: [
{
type: mongoose.Schema.Types.ObjectId,
ref: "user",
required: true,
},
],
},
{
versionKey:false,
timestamp: true,
}
);
const Checkout = mongoose.model("checkout",checkoutSchema);

                                        


const app = express();

app.use(express.json());



// USERS CRUD
app.post("/users", async (req, res) => {
  try {
    const user = await User.create(req.body);

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find().lean().exec();

    return res.send({ users });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/users/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id).lean().exec();

    return res.send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/users/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(user);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// ------------ SECTIONS CRUD -----------------
app.post("/section", async (req, res) => {
  try {
    const section = await Section.create(req.body);

    return res.status(201).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections", async (req, res) => {
  try {
    const section = await Section.find().lean().exec();

    return res.send(sections);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();

    return res.send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(200).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/sections/:id", async (req, res) => {
  try {
    const section = await Section.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(section);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/sections/:id/posts", async (req, res) => {
  try {
    const section = await Section.findById(req.params.id).lean().exec();
    const books = await Book.find({ section_ids: section._id })
      .populate("section_ids")
      .lean()
      .exec();

    return res.status(200).send({ books, tag });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// ------------ BOOKS CRUD -----------------
app.post("/books", async (req, res) => {
  try {
    const book = await Book.create(req.body);

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find().lean().exec();

    return res.send({ books });
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).lean().exec();

    return res.send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.status(201).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/books/:id", async (req, res) => {
  try {
    const book = await Book.findByIdAndDelete(req.params.id).lean().exec();

    return res.status(200).send(book);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

// ------------ AUTHORS CRUD -----------------
app.post("/authors", async (req, res) => {
  try {
    const author = await Author.create(req.body);

    return res.status(201).send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors", async (req, res) => {
  try {
    const authors = await Author.find().lean().exec();

    return res.send(authors);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findById(req.params.id).lean().exec();

    return res.send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/authors/:id", async (req, res) => {
  try {
    const author = await Author.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/authors/:id", async (req, res) => {                                       
  try {
    const author = await Author.findByIdAndDelete(req.params.id)
      .lean()
      .exec();                                                              

    return res.send(author);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
                                                                                                                                                                                                                         


// ------------ CHECKOUTS CRUD -----------------
app.post("/checkouts", async (req, res) => {
  try {
    const checkout = await Checkout.create(req.body);

    return res.status(201).send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkout", async (req, res) => {
  try {
    const checkouts = await Checkout.find().lean().exec();

    return res.send(checkouts);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.get("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await Checkout.findById(req.params.id).lean().exec();

    return res.send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.patch("/checkouts/:id", async (req, res) => {
  try {
    const checkout = await Checkout.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();

    return res.send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});

app.delete("/checkouts/:id", async (req, res) => {                                       
  try {
    const checkout = await Checkout.findByIdAndDelete(req.params.id)
      .lean()
      .exec();                                                              

    return res.send(checkout);
  } catch (e) {
    return res.status(500).json({ message: e.message, status: "Failed" });
  }
});
                                                                                                                                                                                                                         



app.listen(2340,async function () {
await connect();
console.log("listining on port 2340");

});