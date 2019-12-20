const express = require('express');
const router = express.Router();
const fs = require('fs');

const sqlite3 = require('sqlite3').verbose();

//middleware that handles try catch in every request
function asyncHandler(cb) {
    return async (req, res, next) => {
        try {
            await cb(req, res, next);
        } catch (err) {
            next(err);
        }
    }
}

router.get('/getAllTransactions', asyncHandler((req, res) => {
    let db = new sqlite3.Database('./Database/TransactionRecordsDatabase.db', (err) => {
        if (err) {
            handleError(err.message, "Opening database getAllTransactions");
            res.status(500).end();
        }
        console.log('Connected to the db SQlite database. /getAllTransactions');
    });

    db.serialize(() => {
        db.all(`SELECT *
             FROM tblTransaction`, async (err, row) => {
            if (err) {
                handleError(err.message, "/getAllTransactions");
                res.status(500).end();
            }
            res.status(200).json(row);
        });
    });

    db.close((err) => {
        if (err) {
            handleError(err.message, "Closing database getAllTransactions");
            res.status(500).end();
        }
        console.log('Close the database connection. /getAllTransactions');
    });
}))

router.post('/saveNewTransaction', asyncHandler((req, res) => {
    if (req.body.date && req.body.title && req.body.description && req.body.type && req.body.amount) {
        let db = new sqlite3.Database('./Database/TransactionRecordsDatabase.db', (err) => {
            if (err) {
                handleError(err.message, "Opening database saveNewTransaction");
                res.status(500).end();
            }
            console.log('Connected to the db SQlite database. /saveNewTransaction');
        });

        db.serialize(() => {
            db.run(`INSERT INTO tblTransaction(id,date,title,description,type,amount)
                    VALUES (null,'${req.body.date}','${req.body.title}','${req.body.description}','${req.body.type}','${req.body.amount}')`, async (err) => {
                if (err) {
                    handleError(err.message, "/saveNewTransaction");
                    res.status(500).end();
                }
                res.status(201).end();
            });
        });

        db.close((err) => {
            if (err) {
                handleError(err.message, "Closing database saveNewTransaction");
                res.status(500).end();
            }
            console.log('Close the database connection. /saveNewTransaction');
        });
    } else {
        res.status(400).json({ message: "Some fields are missing, make sure you enter all the needed information!" })
    }
}));

router.put('/updateTransaction', asyncHandler((req, res) => {

    if (req.body.id && req.body.date && req.body.title && req.body.description && req.body.type && req.body.amount) {
        let db = new sqlite3.Database('./Database/TransactionRecordsDatabase.db', (err) => {
            if (err) {
                handleError(err.message, "Opening database saveNewTransaction");
                res.status(500).end();
            }
            console.log('Connected to the db SQlite database. /updateTransaction');
        });

        db.serialize(() => {
            db.run(`UPDATE tblTransaction
                    SET date ='${req.body.date}',
                        title = '${req.body.title}',
                        description = '${req.body.description}',
                        type = '${req.body.type}',
                        amount = '${req.body.amount}'
                    WHERE id=${req.body.id}`, (err) => {
                if (err) {
                    handleError(err.message, "/updateTransaction");
                    res.status(500).end();
                }
                res.status(204).end();
            });
        });

        db.close((err) => {
            if (err) {
                handleError(err.message, "Closing database saveNewTransaction");
                res.status(500).end();
            }
            console.log('Close the database connection. /updateTransaction');
        });
    } else {
        res.status(400).json({ message: "Some fields are missing, make sure you enter all the needed information!" })
    }
}));

router.delete('/deleteTransaction', asyncHandler((req, res) => {
    if (req.query.id) {
        let db = new sqlite3.Database('./Database/TransactionRecordsDatabase.db', (err) => {
            if (err) {
                handleError(err.message, "Opening database deleteTransaction");
                res.status(500).end();
            }
            console.log('Connected to the db SQlite database. /deleteTransaction');
        });

        db.serialize(() => {
            db.all(`DELETE
                 FROM tblTransaction
                 WHERE id=${req.query.id}`, (err) => {
                if (err) {
                    handleError(err.message, "/deleteTransaction");
                    res.status(500).end();
                }
                res.status(204).end();
            });
        });

        db.close((err) => {
            if (err) {
                handleError(err.message, "Closing database deleteTransaction");
                res.status(500).end();
            }
            console.log('Close the database connection. /deleteTransaction');
        });
    } else {
        res.status(400).json({ message: "Some fields are missing, make sure you enter all the needed information!" })
    }

}))

router.get('/getTransactions', asyncHandler(async (req, res) => {
    if (req.query.date) {
        const cb = await getTransactions(req.query.date);
        if (cb.error) {
            res.status(500).end();
        } else {
            res.status(200).json(cb);
        }

    } else {
        res.status(400).json({ message: "Some fields are missing, make sure you enter all the needed information!" })
    }
}));

router.get('/getTodaysSum', asyncHandler(async (req, res) => {
    if (req.query.date) {
        const cb = await getTodaysSum(req.query.date);
        if (cb.error) {
            res.status(500).end();
        } else {
            res.status(200).json(cb);
        }
    } else {
        res.status(400).json({ message: "Some fields are missing, make sure you enter all the needed information!" })
    }
}));

router.get('/todaysDate', asyncHandler((req, res) => {
    var datetime = new Date().toLocaleDateString();
    res.json({ date: datetime })
}));



const getTransactions = (date) => {
    let db = new sqlite3.Database('./Database/TransactionRecordsDatabase.db', (err) => {
        if (err) {
            handleError(err.message, "Opening database getTransactions");
            return { error: err.message }
        }
        console.log('Connected to the db SQlite database. /getTransactions');
    });

    return new Promise((resolve, reject) => {
        db.serialize(() => {
            db.all(`SELECT *
            FROM tblTransaction
            WHERE date='${date}'`, (err, row) => {
                if (err) {
                    handleError(err.message, "/getTransactions");
                    reject(err);
                }
                resolve(row);
            }).close((err) => {
                if (err) {
                    handleError(err.message, "Closing database getTransactions");
                    return { error: err.message }
                }
                console.log('Close the database connection. /getTransactions');
            });
        });
    }).catch((err) => { return { error: err.message } })
}

const getTodaysSum = (date) => {
    let db = new sqlite3.Database('./Database/TransactionRecordsDatabase.db', (err) => {
        if (err) {
            handleError(err.message, "Opening database getTodaysSum");
            return { error: err.message }
        }
        console.log('Connected to the db SQlite database. sum sum');
    });


    // `SELECT ((SELECT SUM(amount) FROM tblTransaction WHERE date="${date}" AND type="add")-
    //         (SELECT SUM(amount) FROM tblTransaction WHERE date="${date}" AND type="deduct")) 
    //         as totalSum`

    return new Promise((resolve, reject) => {
        let totalSum;
        let totalDeduct;
        db.serialize(() => {
            db.all(`SELECT SUM(amount) as allAdd FROM tblTransaction WHERE date="${date}" AND type="add"`, (err, row) => {
                if (err) {
                    handleError(err.message, "/getTodaysSum");
                    reject(err);
                }
                if (row) {
                    totalSum = row[0].allAdd;
                } else {
                    totalSum = 0;
                }
            }).all(`SELECT SUM(amount) as allDeduct FROM tblTransaction WHERE date="${date}" AND type="deduct"`, (err, row) => {
                if (err) {
                    handleError(err.message, "/getTodaysSum");
                    reject(err);
                }
                if (row) {
                    totalDeduct = row[0].allDeduct;
                } else {
                    totalDeduct = 0;
                }

                let totalAmount = totalSum - totalDeduct;

                resolve(totalAmount)

            }).close((err) => {
                if (err) {
                    handleError(err.message, "Opening database getTodaysSum");
                    return { error: err.message }
                }
                console.log('Close the database connection. sum sum');
            });
        });
    }).catch((err) => { return { error: err.message } })
}


//=====ERROR HANDLING
const handleError = async (message, where) => {
    let newError = { "errorDate": new Date().toLocaleDateString(), "errorMessage": message, "errorWhere": where }
    let errors = await getAllErrors();
    errors.error.push(newError);
    addNewError(errors);
}

const getAllErrors = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./ErrorLog/error.json', 'utf8', (err, data) => {
            if (err) {
                reject(err);
            } else {
                const json = JSON.parse(data);
                resolve(json);
            }
        });
    }).catch((err) => { console.log(err) });
}

const addNewError = (data) => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./ErrorLog/error.json', JSON.stringify(data, null, 2), (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    }).catch((err) => { console.log(err) });
}

module.exports = router;