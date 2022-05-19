const express = require("express");
const router = express.Router();

const path = require("path");
const TagModel = require(path.resolve( "./Model/Tag"));
const Tag = new TagModel();

router.post("/create", async (req, res) => {
  await Tag.create(req, res)
});

router.get("/get", async (req, res) => {
  await Tag.get(req, res)
});

router.post("/delete", async (req, res) => {
  await Tag.delete(req, res)
});

router.post("/list", async (req, res) => {
  await Tag.getList(req, res)
});

module.exports = router
