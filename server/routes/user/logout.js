const express = require("express");
const router = express.Router();

router.post("/logout", (req, res) => {
    // on détruit la session
    req.session.destroy((err) => {
        if (err) {
            console.log("Error clearing session:", err);
            res.status(500).json({ success: false, message: "Unable to logout." });
        } 
        else 
        {
            res.status(200).json({ success: true, message: "Logout successful." });
        }
    });
});

module.exports = router;