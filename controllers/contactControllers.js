const asyncHandler = require("express-async-handler");

// Controllers contains all Logics for request, response, connect to database, etc
// Whenever we create the API methods, we always need to give some labels to that

const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "Get all contacts",
  });
});

//@desc Get all contact
//route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: `Get contact for ${req.params.id}`,
  });
});

//@desc Create New contacts
//route POST /api/contacts (201: resource created)
//@access public
const createContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  res.status(201).json({
    message: "Create contacts",
  });
});

//@desc Update contact
//route POST /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: `Update contact for ${req.params.id}`,
  });
});

//@desc Delete contact
//route POST /api/contacts
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: `Delete contact for ${req.params.id}`,
  });
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
