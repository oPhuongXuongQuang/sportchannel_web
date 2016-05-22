/**
 * Created by quangphuong on 4/12/16.
 */
module.controller('VideosController', function($rootScope, $scope, $http, $service, cfpLoadingBar) {
    // var date = $scope.date;
    // console.log(date);
    $scope.$watch('date', function(value) {
        if (value == undefined) {
            return;
        }
        var date = new Date(value);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var linkByDate = year * 10000 + month * 100 + day;
        getHighlights(linkByDate);
    });
    
    var getHighlights = function(linkByDate) {
        $http.post($service.back.getHighlights.url, linkByDate).success(function(result){
            var videosByKind = _.groupBy(result, 'kind');
            var videos = {};
            for(var kind in videosByKind){
                var videosByTour = _.groupBy(videosByKind[kind], 'tournament');
                videos[kind] = videosByTour;
            }
            $scope.videos = videos;
        });
    };

    $scope.goToHighlight = function(link) {
        cfpLoadingBar.start();
        if(link.indexOf("/en/showvideo") > -1) {
            //$http.post($service.back.getVideo.url, link).success(function (result) {
            //
            //
            //});
        } else if(link.indexOf("playwire.com") > -1) {

        }
        else {
            $rootScope.$nav.pushPage("video.html",{param:link});
        }
    };

});

module.config(function($mdThemingProvider) {
    $mdThemingProvider.theme('altTheme')
        .primaryPalette('purple');
});