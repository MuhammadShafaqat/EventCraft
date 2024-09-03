const express = require('express');
const router = express.Router();
const db = require('../config/db');
const jwtAuth = require('../middleware/auth');
const eventModel = require('../models/event');


// Get all events
router.get('/', jwtAuth.verifyToken, (req, res) => {
    eventModel.getAllEvents((err, results) => {
        if (err) {
            console.log('Error fetching events:', err);
            res.status(500).send(err);
        } else {
            res.status(200).send(results);
        }
    });
});

// Get event by ID
router.get('/:id', jwtAuth.verifyToken, (req, res) => {
    eventModel.getEventById(req.params.id, (err, results) => {
        if (err) {
            console.log('Error fetching event:', err);
            res.status(500).send(err);
        } else if (results.length === 0) {
            res.status(404).send({ message: 'Event not found' });
        } else {
            res.status(200).send(results[0]);
        }
    });
});

// Add a new event
router.post('/', jwtAuth.verifyToken, (req, res) => {
    const newEvent = req.body;
    if (!newEvent.name || !newEvent.dateTime) { // Basic validation
        return res.status(400).send({ message: 'Event name and date are required.' });
    }
    eventModel.addEvent(newEvent, (err, results) => {
        if (err) {
            console.log('Error adding event:', err);
            return res.status(500).send(err);
        } else {
            res.status(201).send({ id: results.insertId, ...newEvent });
        }
    });
});
//
// Update an event by ID
router.put('/:id', jwtAuth.verifyToken, (req, res) => {
    const updatedEvent = req.body;
    if (!updatedEvent.name || !updatedEvent.dateTime) { // Basic validation
        return res.status(400).send({ message: 'Event name and date are required.' });
    }
    
    eventModel.updateEvent(req.params.id, updatedEvent, (err, results) => {
        if (err) {
            console.log('Error updating event:', err);
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Event not found' });
        } else {
            res.status(200).send({ id: req.params.id, ...updatedEvent });
        }
    });
});



// Update an event by ID
router.patch('/:id', jwtAuth.verifyToken, (req, res) => {
    const updatedEvent = req.body;
    eventModel.updateEvent(req.params.id, updatedEvent, (err, results) => {
        if (err) {
            console.log('Error updating event:', err);
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Event not found' });
        } else {
            res.status(200).send({ id: req.params.id, ...updatedEvent });
        }
    });
});

// Delete an event by ID
router.delete('/:id', jwtAuth.verifyToken, (req, res) => {
    eventModel.deleteEvent(req.params.id, (err, results) => {
        if (err) {
            console.log('Error deleting event:', err);
            res.status(500).send(err);
        } else if (results.affectedRows === 0) {
            res.status(404).send({ message: 'Event not found' });
        } else {
            res.status(200).send({ message: 'Event deleted successfully' });
        }
    });
});
module.exports = router;
