define(function(require, exports, module) {
    var settingID = "Presentation Setting";
    var Setting = Backbone.Model.extend({
        localStorage: new Store("Settings"),
        defaults: {

        }
    });

//    Setting = Backbone.UniqueModel(Setting, 'Setting', 'localStorage');

    Setting.load = _.memoize(function() {
        this.appSetting = new Setting({
            id: settingID
        });
//        this.appSetting.fetch();
        return this.appSetting;
    });
    module.exports = Setting.load();
});