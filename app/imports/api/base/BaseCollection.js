import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { _ } from 'meteor/underscore';

class BaseCollection {
  /**
   * Superclass constructor for all meteor-application-template-react-production entities.
   * Defines internal fields needed by all entities: _type, _collectionName, _collection, and _schema.
   * @param {String} type The name of the entity defined by the subclass.
   * @param {SimpleSchema} schema The schema for validating fields on insertion to the DB.
   */
  constructor(type, schema) {
    this._type = type;
    this._collectionName = `${this._type}Collection`;
    this._collection = new Mongo.Collection(this._collectionName);
    this._schema = schema;
    this._collection.attachSchema(this._schema);
  }

  /**
   * Returns the number of documents in this collection.
   * @returns { Number } The number of elements in this collection.
   */
  count() {
    return this._collection.find().count();
  }

  /**
   * Defines documents in this collection. Must be overridden in subclasses.
   * @param {Object} obj the object defining the new document.
   */
  define(obj) {
    throw new Meteor.Error(`The define(${obj}) method is not defined in BaseCollection.`);
  }

  /**
   * Runs a simplified version of update on this collection. This method must be overriden in subclasses.
   * @see {@link http://docs.meteor.com/api/collections.html#Mongo-Collection-update}
   * @param { Object } selector A MongoDB selector.
   * @param { Object } modifier A MongoDB modifier
   */
  update(selector, modifier) {
    throw new Meteor.Error(`update(${selector}, ${modifier}) is not not defined in BaseCollection.`);
  }

  /**
   * A stricter form of remove that throws an error if the document or docID could not be found in this collection.
   * @param { String | Object } name A document or docID in this collection.
   */
  removeIt(name) {
    throw new Meteor.Error(`removeIt(${name}) is not defined in BaseCollection.`);
  }

  /**
   * Runs find on this collection.
   * @see {@link http://docs.meteor.com/#/full/find|Meteor Docs on Mongo Find}
   * @param { Object } selector A MongoDB selector.
   * @param { Object } options MongoDB options.
   * @returns {Mongo.Cursor}
   */
  find(selector, options) {
    const theSelector = (typeof selector === 'undefined') ? {} : selector;
    return this._collection.find(theSelector, options);
  }

  /**
   * A stricter form of findOne, in that it throws an exception if the entity isn't found in the collection.
   * @param { String | Object } name Either the docID, or an object selector, or the 'name' field value.
   * @returns { Object } The document associated with name.
   * @throws { Meteor.Error } If the document cannot be found.
   */
  findDoc(name) {
    if (_.isNull(name) || _.isUndefined(name)) {
      throw new Meteor.Error(`${name} is not a defined ${this.type}`);
    }
    const doc = (
        this._collection.findOne(name)
        || this._collection.findOne({ name })
        || this._collection.findOne({ _id: name }));
    if (!doc) {
      if (typeof name !== 'string') {
        throw new Meteor.Error(`${JSON.stringify(name)} is not a defined ${this._type}`, '', Error().stack);
      } else {
        throw new Meteor.Error(`${name} is not a defined ${this._type}`, '', Error().stack);
      }
    }
    return doc;
  }

  /**
   * Runs findOne on this collection.
   * @see {@link http://docs.meteor.com/#/full/findOne|Meteor Docs on Mongo Find}
   * @param { Object } selector A MongoDB selector.
   * @param { Object } options MongoDB options.
   * @returns {Mongo.Cursor}
   */
  findOne(selector, options) {
    const theSelector = (typeof selector === 'undefined') ? {} : selector;
    return this._collection.findOne(theSelector, options);
  }

  /**
   * Return the type of this collection.
   * @returns { String } The type, as a string.
   */
  getType() {
    return this._type;
  }

  /**
   * Return the publication name.
   * @returns { String } The publication name, as a string.
   */
  getPublicationName() {
    return this._collectionName;
  }

  /**
   * Returns the collection name.
   * @return {string} The collection name as a string.
   */
  getCollectionName() {
    return this._collectionName;
  }

  /**
   * Returns the schema attached to this collection.
   * @return {SimpleSchema}
   */
  getSchema() {
    return this._schema;
  }

  /**
   * Returns true if the passed entity is in this collection.
   * @param { String | Object } name The docID, or an object specifying a documennt.
   * @returns {boolean} True if name exists in this collection.
   */
  isDefined(name) {
    if (_.isUndefined(name)) {
      return false;
    }
    return (
        !!this._collection.findOne(name)
        || !!this._collection.findOne({ name })
        || !!this._collection.findOne({ _id: name }));
  }

  /**
   * Default publication method for entities.
   * It publishes the entire collection. This should be overridden in subclasses.
   */
  publish() {
    if (Meteor.isServer) {
      Meteor.publish(this._collectionName, () => this._collection.find());
    }
  }

  /**
   * Default subscription method for entities.
   * It subscribes to the entire collection. Should be overridden in subclass
   */
  subscribe() {
    if (Meteor.isClient) {
      Meteor.subscribe(this._collectionName);
    }
  }
}

/**
 * The BaseCollection used by all meteor-application-template-react-production entities.
 */
export default BaseCollection;
