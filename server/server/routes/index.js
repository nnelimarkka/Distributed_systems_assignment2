var express = require('express');
var router = express.Router();
const xml2js = require("xml2js");
const moment = require("moment");
var fs = require("fs");
const { parse } = require('path');
const fileDir = "../data/";

router.post("/save", (req, res) => {
  console.log(req.body);
  fs.readFile(fileDir+"data.xml", (err, data) => {
    if (err) throw new Error(err);

    const parser = new xml2js.Parser();

    parser.parseStringPromise(data)
      .then((response) => {
        console.log(response);
        console.log(response.data.topic);
        console.log(response.data.topic[0].note);

        let topicFound = false;
        for (let key in response.data.topic) {
          if (req.body.topic === response.data.topic[key].$.name) {
            response.data.topic[key].note.push({"$": {"name": req.body.header}, "text": req.body.body, "timestamp": moment(new Date()).format("MM/DD/YY - HH:MM:SS")})
            topicFound = true;
          }
        }

        if (!topicFound) {
          response.data.topic.push({
            "$": {"name": req.body.topic},
            "note": [
              {
                "$": {"name": req.body.header},
                "text": req.body.body,
                "timestamp": moment(new Date()).format("MM/DD/YY - HH:MM:SS")
              }
            ]
          })
        }

        let builder = new xml2js.Builder();
        let xml = builder.buildObject(response);

        fs.writeFile(fileDir+"data.xml", xml, (err) => {
          if (err) {
            console.log(err);
            res.json({message: "not ok"});
          }
          else res.json({message: "ok"});
        });
      })
      .catch((err) => {
        console.log(err);
      })
  })
  
})

router.get("/notes", (req, res) => {
  fs.readFile(fileDir+"data.xml", (err, data) => {
    if (err) throw new Error(err);

    const parser = new xml2js.Parser();

    parser.parseStringPromise(data)
      .then((response) => {
        console.log(response.data.topic);
        res.json(response.data.topic);
      })
      .catch(err => {
        console.log(err);
        res.json({message: "Error in fetching from 'database'"});
      })
    })
})

module.exports = router;
