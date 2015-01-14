define(function(require, exports, module) {
    var EmptyModel = require('models/EmptyModel');

    //---------------------------- localStorage
    var EmptyCollection = Backbone.Collection.extend({
        localStorage: new Backbone.LocalStorage('emptyCollection'),
        model: EmptyModel
    });
        //---------------------------- firebase
//    var EmptyCollection = Backbone.Firebase.Collection.extend({
//        model: EmptyModel
//    });

    //---------------------------- third party api
//    var EmptyCollection = Backbone.Collection.extend({
//        url:  function(){
//            if(window.configs.dev){
//                return './assets/data.json'
//            }else{
//                return 'https://www.googleapis.com/drive/v2/files?' + 'q=mimeType%3D+%22application%2Fvnd.google-apps.presentation%22&'+
//                    'access_token='+localStorage.access_token
//            }
//
//        },
//        model: EmptyModel
//    });


    module.exports = EmptyCollection;
});