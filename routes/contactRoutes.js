const express = require('express');
const router = express.Router();
const { getContacts, getContact, createContact, updateContact, deleteContact } = require("../controllers/contactControllers");


// router.route("/").get((req, res) => {
//   // res.send("Hello World!");
//   res.status(200).json({
//     message: "Get all contacts",
//   });
// });

// router.route("/").get(getContacts);
// router.route("/:id").get(getContact);
router.route("/").get(getContacts).post(createContact);

// router.route("/").post(createContact);
// router.route("/:id").put(updateContact);
// router.route("/:id").delete(deleteContact);
router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
