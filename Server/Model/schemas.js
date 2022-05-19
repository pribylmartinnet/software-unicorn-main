const createVideoSchema = {
    "type": "object",
    "properties": {
        "path": { "type": "string" },
        "title": { "type": "string" },
        "authorId": { "type": "integer" },
        "tagIds": {
            "type": "array",
            "items": {
                "type": "integer"
            }
        }
    },
    "required": ["title"]
};

const updateVideoSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "integer"},
        "path": { "type": "string" },
        "title": { "type": "string"},
        "token": {"type": "string"}
    },
    "required": ["id", "token"]
};

const getVideoSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "string" }
    },
    "required": ["id"]
};

const getVideoFileSchema = {
    "type": "object",
    "properties": {
        "filepath": { "type": "string" }
    },
    "required": ["filepath"]
};

const deleteVideoSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "integer"},
        "token": {"type": "string"}
    },
    "required": ["id", "token"]
};

const getListSchema = {
    "type": "object",
    "properties": {
        "filter": {
            "type": "object",
            "items": {
                "properties": {
                    "field": { "type": "string" },
                    "operator": { "type": "string" },
                    "value": { "type": "string" },
                }
            }
        },
        "order": { "type": "string" },
        "offset": {
            "type": "object",
            "items": {
                "properties": {
                    "from": { "type": "integer" },
                    "to": { "type": "integer" }
                }
            }
        }
    },
    "required": []
};


const createTagSchema = {
    "type": "object",
    "properties": {
        "title": { "type": "string" },
    },
    "required": ["title"]
};

const getTagSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "string" }
    },
    "required": ["id"]
};

const deleteTagSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "integer"},
        "token": {"type": "string"}
    },
    "required": ["id", "token"]
};

const createAuthorSchema = {
    "type": "object",
    "properties": {
        "nickname": { "type": "string" },
    },
    "required": ["nickname"]
};

const getAuthorSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "string" }
    },
    "required": ["id"]
};

const deleteAuthorSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "integer"},
        "token": {"type": "string"}
    },
    "required": ["id", "token"]
};

const updateAuthorSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "integer"},
        "token": {"type": "string"},
        "nickname": { "type": "string" }
    },
    "required": ["id", "token"]
};

const uploadFileSchema = {
    "type": "object",
    "properties": {
        "id": { "type": "string" }
    },
    "required": ["id"]
};

module.exports = {createVideoSchema, getVideoSchema, getListSchema, updateVideoSchema, deleteVideoSchema, createTagSchema, getTagSchema, deleteTagSchema, updateAuthorSchema, deleteAuthorSchema, getAuthorSchema, createAuthorSchema, uploadFileSchema, getVideoFileSchema}


