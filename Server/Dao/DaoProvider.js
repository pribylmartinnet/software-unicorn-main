"use strict";
const fs = require("fs");
const path = require("path");
const crypto = require("crypto");

const rf = fs.promises.readFile;
const wf = fs.promises.writeFile;

const DEFAULT_STORAGE_PATH = path.join(process.cwd(), "Storage");

class DaoProvider
{
    constructor(filename) {
        this.storagePath = path.join(DEFAULT_STORAGE_PATH, filename);
    }

    async createEntity(entity) {
        let all = await this._loadAll();
        let lastId = all.slice(-1)[0];
        entity.id = lastId ? lastId.id + 1 : 1;
        all.push(entity);
        await wf(this._getStorageLocation(), JSON.stringify(all, null, 2));
        return entity;
    }

    async getEntity(id) {
        let all = await this._loadAll();
        return all.find(b => b.id === parseInt(id));
    }

    async updateEntity(entity) {
        let all = await this._loadAll();
        const entityIndex = all.findIndex(b => b.id === entity.id)
        if (entityIndex < 0) {
            throw new Error(`Entity with given id ${entity.id} does not exists.`);
        } else {
            all[entityIndex] = {
                ...all[entityIndex],
                ...entity
            }
        }
        await wf(this._getStorageLocation(), JSON.stringify(all, null, 2))
        return all[entityIndex];
    }

    async deleteEntity(id) {
        let all = await this._loadAll();
        const entityIndex = all.findIndex(b => b.id === id)
        if (entityIndex >= 0) {
            all.splice(entityIndex, 1)
        }
        await wf(this._getStorageLocation(), JSON.stringify(all, null, 2))
        return {};
    }

    async listEntities(searchCriteria = null) {

        let all = await this._loadAll();

        if (searchCriteria === null) {
            return all;
        }
        if (searchCriteria.filter) {
            let filter = searchCriteria.filter;
            if (filter.operator === 'eq') {
                all = all.filter(b => b[filter.field] === filter.value)
            }
            if (filter.operator === 'like') {
                all = all.filter(b => b[filter.field].toLowerCase().includes(filter.value.toLowerCase()));
            }

        }

        if (searchCriteria.order) {
            if (searchCriteria.order === 'random') {
                all.sort(() => Math.random() - 0.5)
            }
        }

        if (searchCriteria.offset) {
            all = all.slice(searchCriteria.offset.from, searchCriteria.offset.to);
        }

        return all
    }

    async _loadAll() {
        let all;
        try {
            all = JSON.parse(await rf(this._getStorageLocation()));
        } catch (e) {
            if (e.code === 'ENOENT') {
                console.info("No storage found, initializing new one...");
                all = [];
            } else {
                throw new Error("Unable to read from storage. Wrong data format. " +
                    this._getStorageLocation());
            }
        }
        return all;
    }

    _getStorageLocation() {
        return this.storagePath;
    }
}

module.exports = DaoProvider;
