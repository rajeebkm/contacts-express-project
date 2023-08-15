// Controllers contains all Logics for request, response, connect to database, etc
// Whenever we create the API methods, we always need to give some labels to that


const getContacts = (req, res) => {
    res.status(200).json({
        message: "Get all contacts",
    });
}

//@desc Get all contact
//route GET /api/contacts/:id
//@access public
const getContact = (req, res) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: `Get contact for ${req.params.id}`,
  });
};

//@desc Create New contacts
//route POST /api/contacts (201: resource created)
//@access public
const createContact = (req, res) => {
  // res.send("Hello World!");
  res.status(201).json({
    message: "Create contacts",
  });
}

//@desc Update contact
//route POST /api/contacts/:id
//@access public
const updateContact = (req, res) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: `Update contact for ${req.params.id}`,
  });
};

//@desc Delete contact
//route POST /api/contacts
//@access public
const deleteContact = (req, res) => {
  // res.send("Hello World!");
  res.status(200).json({
    message: `Delete contact for ${req.params.id}`,
  });
};

module.exports = {
    getContacts,
    getContact,
    createContact,
    updateContact,
    deleteContact,
}