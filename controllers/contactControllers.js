const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Controllers contains all Logics for request, response, connect to database, etc
// Whenever we create the API methods, we always need to give some labels to that

const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  //   res.status(200).json({
  //     message: "Get all contacts",
  //   });
  res.status(200).json(contacts);
});

//@desc Get all contact
//route GET /api/contacts/:id
//@access public
const getContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  const contactById = await Contact.findById(req.params.id);
  console.log("ContactById: ", contactById);
  if (!contactById) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // res.status(200).json({
  //   message: `Get contact for ${req.params.id}`,
  // });
  res.status(200).json(contactById);
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
  const contact = await Contact.create({ name, email, phone });
  // res.status(201).json({
  //   message: "Create contacts",
  // });
  res.status(201).json(contact);
});

//@desc Update contact
//route POST /api/contacts/:id
//@access public
const updateContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  const contactById = await Contact.findById(req.params.id);
  if (!contactById) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const updatedContact = await Contact.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );
  // res.status(200).json({
  //   message: `Update contact for ${req.params.id}`,
  // });
  res.status(200).json(updatedContact);
});

//@desc Delete contact
//route POST /api/contacts/:id
//@access public
const deleteContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }
  // remove() is deprecated, can use deleteMany(), findOneAndDelete(), bulkWrite() etc.
  // await Contact.remove({_id: contact._id}); // deprecated
  // deleteMany({ age: { $gte: 15 } });
  // findOneAndDelete({age: {$gte:5} }
  // await Contact.deleteOne({ age: { $gte: 10 } }); // Delete first document that matches the condition i.e age >= 10
  await Contact.findByIdAndDelete(req.params.id);
  // res.status(200).json({
  //   message: `Delete contact for ${req.params.id}`,
  // });
  res.status(200).json(contact);
});

module.exports = {
  getContacts,
  getContact,
  createContact,
  updateContact,
  deleteContact,
};
