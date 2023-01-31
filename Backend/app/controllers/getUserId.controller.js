const db = require("../configs/db.config");

exports.getId = (req, res) => {

    try {
        db.query("SELECT * FROM users", (err, results) => {
            if (err) {
              res.status(400).json({ error: "failed to delete post" });
            }
            res.status(200).json(results.rows);
          });
    } catch (error) {
        res.status(500).json({ error: "database error" });
    }

  
};