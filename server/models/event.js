const db = require('../config/db');

// Get all events
exports.getAllEvents = (callback) => {
    db.query('SELECT * FROM events', callback);
};

// Get an event by ID
exports.getEventById = (id, callback) => {
    db.query('SELECT * FROM events WHERE id = ?', [id], callback);
};

// Add a new event
exports.addEvent = (event, callback) => {
    const { name, dateTime, location, description, completed } = event;
    db.query(
        'INSERT INTO events (name, dateTime, location, description, completed) VALUES (?, ?, ?, ?, ?)',
        [name, dateTime, location, description, completed],
        callback
    );
};

// Update an event by ID
exports.updateEvent = (id, event, callback) => {
    const { name, dateTime, location, description, completed } = event;
    db.query(
        'UPDATE events SET name = ?, dateTime = ?, location = ?, description = ?, completed = ? WHERE id = ?',
        [name, dateTime, location, description, completed, id],
        callback
    );
};

// Delete an event by ID
exports.deleteEvent = (id, callback) => {
    db.query('DELETE FROM events WHERE id = ?', [id], callback);
};
