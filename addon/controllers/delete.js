import BaseController from './base';

export default BaseController.extend({

  /*
    Remove the model from the store based on singular version
    of the last portion of the url.

    This would remove contact with id :id:
      Ex: this.stub('delete', '/contacts/:id');
  */
  undefinedHandler: function(undef, store, request, code) {
    var id = request.params.id;
    var url = request.url;
    var urlNoId = id ? url.substr(0, url.lastIndexOf('/')) : url;
    var type = urlNoId.substr(urlNoId.lastIndexOf('/') + 1).singularize();

    var data = store.remove(type, +id);

    return data;
  },

  /*
    Remove the model from the store of type *type*.

    This would remove the user with id :id:
      Ex: this.stub('delete', '/contacts/:id', 'user');
  */
  stringHandler: function(type, store, request, code) {
    var id = request.params.id;
    var data = store.remove(type, id);

    return data;
  },

  /*
    Remove the model and child related models from the store.

    This would remove the contact with id `:id`, and well
    as this contact's addresses and phone numbers.
      Ex: this.stub('delete', '/contacts/:id', ['contact', 'addresses', 'numbers');
  */
  arrayHandler: function(types, store, request, code) {
    var id = request.params.id;
    var parentType = types.shift();

    store.remove(parentType, id);

    var query = {};
    var parentIdKey = parentType + '_id';
    query[parentIdKey] = id;

    types.forEach(function(type) {
      store.remove(type, query);
    });

    return {};
  }

});
