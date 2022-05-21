const express = require("express");
const router = express.Router();

const path = require("path");
const VideoModel = require(path.resolve( "./Model/Video"));
const Video = new VideoModel();
const busboy = require("busboy");

router.post("/upload", async (req, res) => {
 console.log("okkk")
  let myBusboy = busboy({ headers: req.headers, limits: {files: 1} });
  await Video.upload(myBusboy, res)
  req.pipe(myBusboy);

});

router.post("/create", async (req, res) => {
  await Video.create(req, res)
});

router.get("/get", async (req, res) => {
  await Video.get(req, res)
});

router.get("/get-file", async (req, res) => {
  await Video.getFile(req, res)
});

router.post("/update", async (req, res) => {
  await Video.update(req, res);
});

router.post("/delete", async (req, res) => {
  await Video.delete(req, res)
});

router.post("/list", async (req, res) => {
  await Video.getList(req, res)
});

module.exports = router
