define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');
    var Scrollview = require('famous/views/Scrollview');
    var Utility = require('famous/utilities/Utility');

    var EmptyItemView = require('views/EmptyItemView');

    function EmptyListView(options) {
        this.collection = options.collection;
        View.apply(this, arguments);
        this._createViews.call(this);
        this._setModelListeners.call(this);
        this._setViewListeners.call(this);
    }

    EmptyListView.prototype = Object.create(View.prototype);
    EmptyListView.prototype.constructor = EmptyListView;
    EmptyListView.DEFAULT_OPTIONS = {};

    EmptyListView.prototype._createViews = function(){
        this.itemViews =[];
        this.collection.forEach(function(itemModel){
            this.itemViews.push(_createItemview.call(this, itemModel));
        }.bind(this));
        this.scrollview = new Scrollview({
            direction: Utility.Direction.Y
        });
        this.scrollviewMod = new StateModifier({
            align: [.5,.5],
            origin: [.5,.5],
            size: [undefined, undefined]
        });
        this.scrollview.sequenceFrom(this.itemViews);
        this.add(this.scrollviewMod).add(this.scrollview);
    };

    EmptyListView.prototype._setModelListeners = function(){
        this.collection.on('all', function(event, model, collection, more){
//            console.log("collection events: ", event, model, collection);
            switch(event){
                case "add":
                    _createItemview.call(this, model);
                    break;
                case "remove":
                    console.log("collection events: ", event, model, collection, more);
                    _removeItemView.call(this, more.index);
                    break;
                case "change:timestamp":
                    _onItemTimestampChange.call(this, model);
                    break;
            }
        }.bind(this));
    };

    EmptyListView.prototype._setViewListeners = function(){
        this.on('itemClick', _onItemClick.bind(this));
    };

    function _onItemClick(model) {
        console.log("itemClick: ", model);
        var index  = this.collection.indexOf(model);
        _.each(this.itemViews, function(itemView, i){
            if(i == index)
                itemView.select();
            else
                itemView.deselect();
        }.bind(this));
    }

    function _onItemTimestampChange(model) {
//        console.log("itemTimestampChange: ", model);
    }

    function _createItemview(itemModel) {
        var index = this.collection.indexOf(itemModel);
        var itemView = new EmptyItemView({model: itemModel});
        itemView.pipe(this._eventOutput);
        this.itemViews.splice(index, 0, itemView);
        return itemView;
    }

    function _removeItemView(index) {
        var itemView = this.itemViews[index];
        itemView.unpipe(this._eventOutput);
        this.itemViews.splice(index, 1);
    }

    module.exports = EmptyListView;
});