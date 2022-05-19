const path = require("path");
const Ajv = require("ajv").default;
const Authorize = require(path.resolve( './Helpers/AuthorizeChecker'));
const DaoProvider = require(path.resolve( './Dao/DaoProvider'));
const crypto = require("crypto");
const ajv = new Ajv();


class AbstractModel extends DaoProvider
{
    async create(req, res) {
        try {
            const valid = ajv.validate(this.createSchema, req.body);
            if (valid) {
                let entity = req.body;
                await this.bodyPreProcessor(entity)
                entity["token"] = this._generateToken();
                entity = await this.createEntity(entity);
                res.json(entity);
            } else {
                res.status(400).send({
                    errorMessage: "Validation of input failed.",
                    params: req.body,
                    reason: ajv.errors
                })
            }
        } catch (e) {
            res.status(500).send(e.message);
        }
    }

    constructor(
        filename,
        createSchema,
        getSchema,
        updateSchema,
        deleteSchema,
        listSchema,
        entityName,
        bodyPreProcessor = async function () {}
    ) {
        super(filename);
        this._authorize = new Authorize(this);
        this.createSchema = createSchema;
        this.getSchema = getSchema;
        this.updateSchema = updateSchema;
        this.deleteSchema = deleteSchema;
        this.listSchema = listSchema;
        this.entityName = entityName;
        this.bodyPreProcessor = bodyPreProcessor;

    }

    async get(req, res) {
        try {
            const body = req.query.id ? req.query : req.body;
            const valid = ajv.validate(this.getSchema, body);
            if (valid) {
                const entityId = body.id;
                const entity = await this.getEntity(entityId);
                if (!entity) {
                    res.status(400).send({error: `${this.entityName} with id '${entityId}' doesn't exist.`});
                }
                res.json(entity);
            } else {
                res.status(400).send({
                    errorMessage: "Validation of input failed.",
                    params: body,
                    reason: ajv.errors
                })
            }
        } catch (e) {
            res.status(500).send(e.message)
        }
    }

    async getList(req, res) {
        try {
            let searchCriteria = req.body;
            const valid = ajv.validate(this.listSchema, searchCriteria);
            if (valid) {
                const entities = await this.listEntities(searchCriteria);
                res.json(entities);
            } else {
                res.status(400).send({
                    errorMessage: "Validation of input failed.",
                    params: searchCriteria,
                    reason: ajv.errors
                })
            }
        } catch (e) {
            res.status(500).send(e.message)
        }
    }

    async update(req, res) {
        try {
            const valid = ajv.validate(this.updateSchema, req.body);
            let entity = req.body

            if (valid) {
                await this.bodyPreProcessor(entity);
                await this._authorize.authorize(entity.token, entity.id);
                entity = await this.updateEntity(entity);
                res.json(entity);

            } else {
                res.status(400).send({
                    errorMessage: "Validation of input failed.",
                    params: entity,
                    reason: ajv.errors
                })
            }
        } catch (e) {
            res.status(500).send(e.message)
        }
    }

    async delete(req, res) {
        const valid = ajv.validate(this.deleteSchema, req.body);
        try {
            if (valid) {
                const entityId = req.body.id;
                await this._authorize.authorize(req.body.token, entityId);
                await this.deleteEntity(entityId);
                res.json({"message": `${this.entityName} with id ${entityId} was deleted`});
            } else {
                res.status(400).send({
                    errorMessage: "Validation of input failed.",
                    params: req.body,
                    reason: ajv.errors
                })
            }
        } catch (e) {
            res.status(500).send(e.message)
        }
    }

    _generateToken() {
        return crypto.randomBytes(32).toString("hex");
    }
}

module.exports = AbstractModel;
