define(function(require, exports, module) {
    var EmptyModel  = Backbone.Model.extend({

    });
//    EmptyModel = Backbone.UniqueModel(EmptyModel, 'EmptyModel', 'localStorage');
    module.exports = EmptyModel;
});