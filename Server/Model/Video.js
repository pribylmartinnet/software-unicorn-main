const path = require("path");
const Schemas = require('./schemas');
const AbstractModel = require(path.resolve( './Model/AbstractModel'));

const AuthorModel = require(path.resolve( './Model/Author'));
const Author = new AuthorModel();
const Authorize = require(path.resolve( './Helpers/AuthorizeChecker'));

const TagModel = require(path.resolve( './Model/Tag'));
const Ajv = require("ajv").default;
const ajv = new Ajv();


const Tag = new TagModel();

const fs = require("fs");




let bodyPreprocessor = async function (body) {
    if (body.authorId) {
      if (!await Author.getEntity(body.authorId)) {
        throw new Error(`Author with authorId ${body.authorId} does not exists. Firstly create it!!!`);
      }
    }

    if (body.tagIds) {
      for (const tagId of body.tagIds) {
        if (!await Tag.getEntity(tagId)) {
          throw new Error(`Tag with Id ${tagId} does not exists. Firstly create it!!!`);
        }
      }
    }
  }

class Video extends AbstractModel {
  constructor() {
    super(
        "videos.json",
        Schemas.createVideoSchema,
        Schemas.getVideoSchema,
        Schemas.updateVideoSchema,
        Schemas.deleteVideoSchema,
        Schemas.getListSchema,
        "Video",
        bodyPreprocessor
    );
  }

  async upload(busboy, res) {
      let dtoIn = {};

      busboy.on("field", function (fieldname, val, fieldnameTruncated, valTruncated, encoding, mimetype) {
          dtoIn[fieldname] = val;
      });

      busboy.on("file", async (name, file, info) => {
        //console.log(name)
        //console.log(info)
        console.log("OK1")  
        const { mimeType } = info;
          const valid = ajv.validate(Schemas.uploadFileSchema, dtoIn);
          console.log("OK2")
          if (!valid) {
            console.log("NOK1")
              return res.status(400).json({ error: ajv.errors });
          }

          if (mimeType !== "video/mp4") {
            console.log("NOK2")  
            return res.status(400).json({ error: `Only supported mimeType is video/mp4` });
          }

          try {
            console.log("OK3")
              const video = await this.getEntity(dtoIn.id);
              if (!video) {
                console.log("NOK3")
                  return res.status(400).json({error: `Video with code '${dtoIn.id}' doesn't exist.`});
              }
              console.log("OK4")
              let saveTo = "Storage/Videos/" + dtoIn.id + ".mp4";
              // video.saveTo = path.join(process.cwd(), "Storage", "Videos", dtoIn.id + ".mp4");
              await this._authorize.authorize(dtoIn.token, dtoIn.id);
              let writeStream = fs.createWriteStream(path.resolve("./" + saveTo));
              await this.updateEntity(video);
              file.pipe(writeStream);
              console.log("OK5")
          } catch (e) {
            console.log("NOK4")
              res.status(500).send(e.message)
          }
      });

      busboy.on("finish", function () {
          res.json({ status: "File succesfully uploaded!" });
      });

      busboy.on("error", err => {
          res.json({ error: err })
      });
  }

  async getFile(req, res) {
      const valid = ajv.validate(Schemas.getVideoFileSchema, req.query);

      if (!valid) {
          res.status(400).send({
              errorMessage: "Validation of input failed.",
              params: req.query,
              reason: ajv.errors
          });
      }
      let filePath = path.resolve("./" + req.query.filepath);

      try {

          await fs.promises.access(filePath, fs.F_OK);
      } catch (e) {
          res.status(400).json(
              { error: `File with path '${filePath}' doesn't exists.` }
          )
      }

      res.sendFile(filePath);
  }

}
module.exports = Video;

