import * as Utils from '../lib/utils';
import Stack from '../stack';
import Query from './query';

/**
 * @class 
  Assets  
* @summary Creates an instance of `Assets`.
* @description Retrieves the asset based on the specified UID
* @param {String} uid - uid of asset you want to retrieve
* @example 
* let data = Stack.Assets('bltsomething123').toJSON().fetch()
*      data
*      .then(function(result) {
*           // ‘result’ is a single asset object of specified uid       
*      }, function(error) {
*           // error function
*      })
* @returns {Assets}
* @instance
*/

export default class Assets {
    constructor() {
        this._query = {};        
        this.only = Utils.transform('only');
        return this;
    }

 /**
   * Converts your response into plain JavasScript object
   * @memberOf Assets
   * @example var Query = Stack.ContentType('blog').Query()
    Query   
         .toJSON()
         .find()
         .then(function (result) {
             // 'result' is an object which content the data in json object form
          },function (error) {
             // error function
     })
   * @returns {Assets}
   * @instance
   */
  
    toJSON() {
        this.tojson = true;
        return this;
    }

/**
   * Includes query parameters in your queries.
   * @memberOf Assets
   * @example var data = Stack.Assets(assetUid).addParam('include_dimension', 'true').toJSON().fetch()
     *      data.then(function (result) {
     *          // 'result' is an object which content the data including count in json object form
     *       },function (error) {
     *          // error function
     *      })
     * @returns {Assets}
     * @instance
   */
  
    addParam(key, value) {
        if (key && typeof key === 'string' && value && typeof value === 'string') {        
            this._query[key] = value;
            return this;
        } else {
            console.error("Kindly provide a valid parameters.");
        }
    }


/**
   * Fetches a particular asset based on the provided asset UID.
   * @memberOf Assets
   * @example
   * Stack.Assets('assets_uid').toJSON().fetch()
   * @returns {promise}
   * @instance
   */

    fetch() {
        if (this.asset_uid) {
            this.requestParams = {
                method: 'POST',
                headers: this.headers,
                url: this.config.protocol + "://" + this.config.host + ':' + this.config.port + '/' + this.config.version + this.config.urls.assets + this.asset_uid,
                body: {
                    _method: 'GET',
                    query: this._query
                }
            }
            return Utils.sendRequest(this);
        } else {
            console.error("Kindly provide an asset uid. e.g. .Assets('bltsomething123')");
        }
    }
}