define(function(require, exports, module) {
    var UIElement           = require('core/UIElement');
    var UIComponent         = require('core/UIComponent');

    var EmptyComponent = UIComponent.extend({
        constructor:function(options) {
            options = options || {};

            this._callSuper(UIComponent, 'constructor', {
                // component properties (size, align, origin, etc)
                size: [550,230]
            });

            _createUIElement.call(this);
        }
    });

    function _createUIElement() {

    }

    module.exports = EmptyComponent;
});
