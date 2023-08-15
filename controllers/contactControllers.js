const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");

// Controllers contains all Logics for request, response, connect to database, etc
// Whenever we create the API methods, we always need to give some labels to that

//@desc Get all contacts
//route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  //   res.status(200).json({
  //     message: "Get all contacts",
  //   });
  res.status(200).json(contacts);
});

//@desc Get contact by Id
//route GET /api/contacts/:id
//@access private
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
//@access private
const createContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  console.log("The request body is: ", req.body);
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandatory");
  }
  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });
  // res.status(201).json({
  //   message: "Create contacts",
  // });
  res.status(201).json(contact);
});

//@desc Update contact
//route POST /api/contacts/:id
//@access private
const updateContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  const contactById = await Contact.findById(req.params.id);
  if (!contactById) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contactById.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to update other user's contacts"
    );
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
//@access private
const deleteContact = asyncHandler(async (req, res) => {
  // res.send("Hello World!");
  const contact = await Contact.findById(req.params.id);
  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() != req.user.id) {
    res.status(403);
    throw new Error(
      "User doesn't have permission to update other user's contacts"
    );
  }
  // remove() is deprecated, can use deleteMany(), findOneAndDelete(), bulkWrite() etc.
  // await Contact.remove(); // deprecated
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
