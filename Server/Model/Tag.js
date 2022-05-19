const path = require("path");
const Schemas = require('./schemas');
const AbstractModel = require(path.resolve( './Model/AbstractModel'));

class Tag extends AbstractModel
{
  constructor() {
    super(
        "tags.json",
        Schemas.createTagSchema,
        Schemas.getTagSchema,
        null,
        Schemas.deleteTagSchema,
        Schemas.getListSchema,
        "Tag"
    );
  }
}
module.exports = Tag;
