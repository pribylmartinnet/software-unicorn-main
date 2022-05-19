const path = require("path");
const Env = require(path.resolve( "./env"));


class AuthorizeChecker
{
    constructor(model) {
        this.model = model;
    }

    async _getEntityToken(entityId) {
        let entity = await this.model.getEntity(entityId);
        return entity.token;
    }

    async _checkEntityToken(entityId, token) {
        return (token === await this._getEntityToken(entityId));
    }

    async _checkAdminToken(token) {
        return (token === Env.adminToken);
    }

    async authorize(token, entityId) {
        if (!await this._checkAdminToken(token) && !await this._checkEntityToken(entityId, token)) {
            throw new Error("You cannot edit/delete this entity. Check the token");
        }
    }
}

module.exports = AuthorizeChecker;
