const path = require("path");
const Schemas = require('./schemas');
const AbstractModel = require(path.resolve( './Model/AbstractModel'));

class Author extends AbstractModel
{
  constructor() {
    super(
        "authors.json",
        Schemas.createAuthorSchema,
        Schemas.getAuthorSchema,
        Schemas.updateAuthorSchema,
        Schemas.deleteAuthorSchema,
        Schemas.getListSchema,
        "Author"
    );
  }
}

module.exports = Author;
