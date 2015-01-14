define(function(require, exports, module) {
    var View = require('famous/core/View');
    var Surface = require('famous/core/Surface');
    var Transform = require('famous/core/Transform');
    var Modifier = require('famous/core/Modifier');
    var StateModifier = require('famous/modifiers/StateModifier');

    function EmptyItemView(options) {
        this.model = options.model;
        View.apply(this, arguments);
        this._createViews.call(this);
        this._setModelListeners.call(this);
        this._setViewListeners.call(this);
    }

    EmptyItemView.prototype = Object.create(View.prototype);
    EmptyItemView.prototype.constructor = EmptyItemView;
    EmptyItemView.DEFAULT_OPTIONS = {
        selectedBackgroundColor: 'lightyellow',
        backgroundColor: 'yellow'
    };

    EmptyItemView.prototype._createViews = function() {
        this.itemSurface = new Surface({
            classes: ["centerBox"],
            size: [undefined, 100],
            properties: {
                backgroundColor: this.options.backgroundColor
            }
        });
        this.itemSurface.pipe(this._eventOutput);
        this.add(this.itemSurface);
        this.updateContent();
    };

    EmptyItemView.prototype._setModelListeners = function() {
        this.model.on('all', function(e, model, value){
//            console.log("item model events: ", e, model, value);
            switch (e){
                case 'change':
                    this.updateContent();
                    break;
            }
        }.bind(this));
    };

    EmptyItemView.prototype._setViewListeners = function() {
        this.itemSurface.on('click',function(e){
            if(e.target.className.indexOf('removeButton') != -1){
                this.model.destroy();
//                this.model.collection.remove(this.model);
            }
            else {
                this.model.set('timestamp', Date.now());
                this._eventOutput.emit('itemClick',this.model);
            }
        }.bind(this));
    };

    EmptyItemView.prototype.updateContent = function(){
        var html = $('#empty-item-view').html();
        html = Mustache.render(html, this.model.attributes);
        this.itemSurface.setContent(html);
    };

    EmptyItemView.prototype.select = function(){
        this.itemSurface.setProperties({'backgroundColor': this.options.selectedBackgroundColor});
    };

    EmptyItemView.prototype.deselect = function(){
        this.itemSurface.setProperties({'backgroundColor': this.options.backgroundColor});
    };

    module.exports = EmptyItemView;
});