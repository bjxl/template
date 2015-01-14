define(function (require, exports, module) {
    var Engine = require('famous/core/Engine');
    var Lightbox = require('famous/views/Lightbox');
    var Transform = require('famous/core/Transform');
    var Surface = require('famous/core/Surface');
    var Timer = require('famous/utilities/Timer');
    var StateModifier = require('famous/modifiers/StateModifier');

    var AppView = require('views/EmptyView');
    var EmptyComponent = require('views/ui/EmptyComponent');

    var mainContext = Engine.createContext();
    mainContext.setPerspective(600);
    this.lightbox = new Lightbox({
        inTransform: Transform.identity,
        showTransform: Transform.identity,
        outTransform: Transform.identity,
        inOpacity: 0,
        showOpacity: 1,
        outOpacity: 1
    });
    this.splashScreen = new Surface({
        classes: ['centerBox'],
        //content: "<iframe src='./splashScreen.html' id='splashIframe'></iframe>",
        size:[undefined, undefined],
        content: "Your App Name",
        properties:{
            textAlign: 'center',
            color: 'white',
            backgroundColor: 'green',
            zIndex: -2
        }
    });
    this.splashScreenMod = new StateModifier({
        size: [undefined, undefined],
        align: [.5,.5],
        origin: [.5,.5]
    });
    mainContext.add(this.splashScreenMod).add(this.splashScreen);

    this.appView = new AppView();
    mainContext.add(this.appView);

    this.emptyComponent = new EmptyComponent({

    });
    mainContext.add(this.emptyComponent);

});