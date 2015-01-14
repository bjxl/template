define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Transitionable = require('famous/transitions/Transitionable');
    var Lightbox = require('famous/views/Lightbox');

    var EmptyCollection = require('collections/EmptyCollection');
    var EmptyListView = require('views/EmptyListView');

    function EmptyView(options) {
        View.apply(this, arguments);
        this._createModels.call(this);
        this._createViews.call(this);
        this._setModelListeners.call(this);
        this._setViewListeners.call(this);
        this._fetch.call(this)
    }

    EmptyView.prototype = Object.create(View.prototype);
    EmptyView.prototype.constructor = EmptyView;
    EmptyView.DEFAULT_OPTIONS = {};

    EmptyView.prototype._createModels = function(){
        this.collection = new EmptyCollection();
    };

    EmptyView.prototype._createViews = function(){
        this.backgroundSurface = new Surface({
            properties: {
                backgroundColor: 'red'
            }
        });
        this.backgroundSurfaceMod = new StateModifier({
            size: [undefined, undefined],
            align: [.5,.5],
            origin: [.5,.5]
        });
        this.add(this.backgroundSurfaceMod).add(this.backgroundSurface);
        this.lightbox = new Lightbox();
        this.listView = new EmptyListView({collection: this.collection});
        this.add(this.lightbox);
        this.lightbox.show(this.listView);
    };

    EmptyView.prototype._setModelListeners = function(){

    };

    EmptyView.prototype._setViewListeners = function(){

    };

    EmptyView.prototype._fetch = function(){
        this.collection.create({title: 'item 1'});
        this.collection.create({title: 'item 2'});
        this.collection.create({title: 'item 3'});
    }

    module.exports = EmptyView;
});