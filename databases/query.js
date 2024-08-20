import sqlite3 from "sqlite3";
sqlite3.verbose();

const db = new sqlite3.Database("./databases/database.db", (err) => {
    if (err) {
        console.error(err.message);
    } else {
        console.log('Connected to the SQLite database.');
    }
});

db.run(`CREATE TABLE IF NOT EXISTS messages (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    content TEXT,
    caption TEXT,
    type TEXT,
    slot TEXT)`, ((err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        }
    }
));

db.run(`CREATE TABLE IF NOT EXISTS groups (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    group_name TEXT,
    group_id TEXT UNIQUE)`, ((err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        }
    }
));

db.run(`CREATE TABLE IF NOT EXISTS time_slots (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    time TEXT,
    msg_slot TEXT,
    slot TEXT)`, ((err) => {
        if (err) {
            console.error('Error creating table:', err.message);
        } else {
            console.log('Table created or already exists.');
        }
    }))

export const setMSG = (content, type, slot) => {
    // delete old data
    db.run(`DELETE FROM messages WHERE slot = ?`, [slot], (err) => {
        if (err) {
            console.error('Error deleting data:', err.message);
        } else {
            console.log('Data deleted successfully.');
        }
    })
    db.run(`INSERT INTO messages (content, type, slot) VALUES (?, ?, ?)`, [content, type, slot], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log('Data inserted successfully.');
        }
    });
};

export const setMSGWithCaption = (content, caption, type, slot) => {
    // delete old data
    db.run(`DELETE FROM messages WHERE slot = ?`, [slot], (err) => {
        if (err) {
            console.error('Error deleting data:', err.message);
        } else {
            console.log('Data deleted successfully.');
        }
    })
    db.run(`INSERT INTO messages (content, caption, type, slot) VALUES (?, ?, ?, ?)`, [content, caption, type, slot], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log('Data inserted successfully.');
        }
    });
};

export const setMSGTime = (time, slot, msg_slot) => {
    // delete old data
    db.run(`DELETE FROM time_slots WHERE slot = ? AND msg_slot = ?`, [slot, msg_slot], (err) => {
        if (err) {
            console.error('Error deleting data:', err.message);
        } else {
            console.log('Data deleted successfully.');
        }
    })
    db.run(`INSERT INTO time_slots (time, slot, msg_slot) VALUES (?, ?, ?)`, [time, slot, msg_slot], (err) => {
        if (err) {
            console.error('Error inserting data:', err.message);
        } else {
            console.log('Data inserted successfully.');
        }
    });
}

export const setTimeInSlot = (time, slot, msg_slot) => {
    db.run(`UPDATE time_slots SET time = ? WHERE slot = ? AND msg_slot = ?`, [time, slot, msg_slot], (err) => {
        if (err) {
            console.error('Error updating data:', err.message);
        } else {
            console.log('Data updated successfully.');
        }
    });
}

export const getAllTime = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM time_slots`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export const getMassageBySlot = (slot) => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM messages WHERE slot = ?`, [slot], (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}

export const addGroup = (group_name, group_id) => {
    db.run(`INSERT INTO groups (group_name, group_id) VALUES (?, ?)`, [group_name, group_id], (err) => {
        if (err) {
            if(err.message !== 'SQLITE_CONSTRAINT: UNIQUE constraint failed: groups.group_id') {
                console.error('Error inserting data:', err.message);
            }
        } else {
            console.log('Data inserted successfully.');
            
        }
    });
}

export const getGroups = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM groups`, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
}