const express = require("express")

const router = express.Router();

const burger = require("../models/burger.js")

router.get("/", function(req, res){
    burger.all(function(data){
        let hbsObject = {
            burgers: data
        };
        console.log(hbsObject);
        res.render("index", hbsObject);
    })
});

router.post("/api/burgers", function(req, res){
    burger.create([
        "name", "cowmadness"
    ], [
        req.body.name, req.body.burger
    ], function(result){
        res.json({ id:result.insertId })
    })
});

router.put("/api/burgers/:id", function(req, res){
    let condition = "id = " + req.params.id;
    console.log("condition", condition);

    burger.update({
        cowmadness: req.body.cowmadness
    }, condition, function (result){
        if (result.changedRows == 0){
            return res.status(404).end()
        } else {
            res.status(200).end()
        }
    })
});

router.delete("/api/burgers/:id", function(req, res){
    let condition = "id = " +req.params.id;
    burger.delete(condition, function(result){
        if (result.affectedRows == 0) {
            return res.status(404).end()
        } else {
            res.status(200).end
        }
    })
});

module.exports = router;
