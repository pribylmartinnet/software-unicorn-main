const express = require("express");
const router = express.Router();
const path = require("path");
const AuthorModel = require(path.resolve( "./Model/Author"));

const Author = new AuthorModel();

router.post("/create", async (req, res) => {
  await Author.create(req, res)
});

router.get("/get", async (req, res) => {
  await Author.get(req, res)
});

router.post("/delete", async (req, res) => {
  await Author.delete(req, res)
});

router.post("/update", async (req, res) => {
  await Author.update(req, res);
});

router.post("/list", async (req, res) => {
  await Author.getList(req, res)
});

module.exports = router
