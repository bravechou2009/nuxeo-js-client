'use strict';

import Base from './base';
import join from './deps/utils/join';
import Document from './document';

function computePath(ref) {
  return join(ref.indexOf('/') === 0 ? 'path' : 'id', ref);
}

/**
 * The `Repository` class allows to work with documents on a Nuxeo Platform instance.
 *
 * **Cannot directly be instantiated**
 *
 * @example
 * var Nuxeo = require('nuxeo')
 * var nuxeo = new Nuxeo({
 *  baseUrl: 'http://localhost:8080/nuxeo',
 *  auth: {
 *    username: 'Administrator',
 *    password: 'Administrator',
 *  }
 * });
 * nuxeo.repository('default')
 *   .fetch('/default-domain').then((res) => {
 *     // res.uid !== null
 *     // res.type === 'Domain'
 *   }).catch(error => throw new Error(error));
 */
class Repository extends Base {
  /**
   * Creates a Repository.
   * @param {object} opts - The configuration options.
   */
  constructor(opts = {}) {
    super(opts);
    this._nuxeo = opts.nuxeo;
  }

  /**
   * Fetches a document given a document ref.
   * @param {string} ref - The document ref. A path if starting with '/', otherwise and id.
   * @param {object} opts - Options overriding the ones from the Request object.
   * @returns {Promise} A Promise object resolved with the {@link Document}.
   */
  fetch(ref, opts) {
    const path = computePath(ref);
    return this._nuxeo.request(path)
      .repositoryName(this._repositoryName)
      .schemas(this._schemas)
      .headers(this._headers)
      .timeout(this._timeout)
      .httpTimeout(this._httpTimeout)
      .transactionTimeout(this._transactionTimeout)
      .get(opts)
      .then((doc) => {
        return new Document(doc, {
          nuxeo: this._nuxeo,
          repository: this,
        });
      });
  }

  /**
   * Creates a document.
   * @param {string} parentRef - The parent document ref. A path if starting with '/', otherwise and id.
   * @param {object} doc - The document to be created.
   * @param {object} opts - Options overriding the ones from the Request object.
   * @returns {Promise} A Promise object resolved with the created {@link Document}.
   */
  create(parentRef, doc, opts = {}) {
    opts.body = {
      'entity-type': 'document',
      type: doc.type,
      name: doc.name,
      properties: doc.properties,
    };
    const path = computePath(parentRef);
    return this._nuxeo.request(path)
      .repositoryName(this._repositoryName)
      .schemas(this._schemas)
      .headers(this._headers)
      .timeout(this._timeout)
      .httpTimeout(this._httpTimeout)
      .transactionTimeout(this._transactionTimeout)
      .post(opts)
      .then((res) => {
        return new Document(res, {
          nuxeo: this._nuxeo,
          repository: this,
        });
      });
  }

  /**
   * Updates a document. Assumes that the doc object has an uid field.
   * @param {object} doc - The document to be updated.
   * @param {object} opts - Options overriding the ones from the Request object.
   * @returns {Promise} A Promise object resolved with the updated {@link Document}.
   */
  update(doc, opts = {}) {
    opts.body = {
      'entity-type': 'document',
      uid: doc.uid,
      properties: doc.properties,
    };
    const path = join('id', doc.uid);
    return this._nuxeo.request(path)
      .repositoryName(this._repositoryName)
      .schemas(this._schemas)
      .headers(this._headers)
      .timeout(this._timeout)
      .httpTimeout(this._httpTimeout)
      .transactionTimeout(this._transactionTimeout)
      .put(opts)
      .then((res) => {
        return new Document(res, {
          nuxeo: this._nuxeo,
          repository: this,
        });
      });
  }

  /**
   * Deletes a document given a document ref.
   * @param {string} ref - The document ref. A path if starting with '/', otherwise and id.
   * @param {object} opts - Options overriding the ones from the Request object.
   * @returns {Promise} A Promise object resolved with the result of the DELETE request.
   */
  delete(ref, opts) {
    const path = computePath(ref);

    return this._nuxeo.request(path)
      .repositoryName(this._repositoryName)
      .schemas(this._schemas)
      .headers(this._headers)
      .timeout(this._timeout)
      .httpTimeout(this._httpTimeout)
      .transactionTimeout(this._transactionTimeout)
      .delete(opts);
  }
}

export default Repository;