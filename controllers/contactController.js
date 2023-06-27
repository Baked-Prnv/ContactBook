const asyncHandler = require("express-async-handler");
const Contact = require("../models/contactModel");
const mongoose = require("mongoose");


// @desc GET all contacts
// @routes GET /api/contacts
// @access private
const getContacts = asyncHandler( async (req,res) => {
    const contacts = await Contact.find({user_id:req.user.id});
    if (!contacts) {
        res.status(404);
        throw new Error("Contacts not found");
    }
    res.status(200).json(contacts);
});

// @desc GET id contact
// @routes GET /api/contacts/:id
// @access private
const getContact = asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
});

// @desc create New contact
// @routes POST /api/contacts
// @access private
const createContact = asyncHandler( async (req,res) => {
    const { name, email, phone } = await req.body
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields mandatory.");
    };
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id:req.user.id
    });
    res.status(200).json(contact);
});

// @desc Update id contacts
// @routes PUT /api/contacts/:id
// @access private
const updateContact = asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("No User have permissions to Update another Users contact")
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new : true });
    res.status(200).json(updatedContact);
});

// @desc DEL id contacts
// @routes DEL /api/contacts/:id
// @access private
const delContact = asyncHandler( async (req,res) => {
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("No User have permissions to Update another Users contact")
    }
    await Contact.deleteOne({_id: req.params.id});
    res.status(200).json(contact);
});

module.exports = {getContacts, getContact, createContact, updateContact, delContact};