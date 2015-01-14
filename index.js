//$(document).on('deviceready', function() {
//    require(['js/lib/famous.min'], function(){
//        require.config({baseUrl: 'js'});
//        require(['../index']);
//    })
//})
//
$(document).ready(function() {
    require(['js/lib/famous.min'], function(){
        require.config({baseUrl: 'js'});
        require(['App']);
    })
});
