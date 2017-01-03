function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/index/minor");

    $stateProvider

        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
        })
	    .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.main', {
            url: "/main",
            templateUrl: "views/main.html",
            data: { pageTitle: 'Example view' }
        })
        .state('index.dashboard', {
             url: "/dashboard",
             templateUrl: "views/dashboard.html",
             data: { pageTitle: 'Example view' }
        })
        .state('index.overview', {
             url: "/overview",
             templateUrl: "views/overview.html",
             data: { pageTitle: 'Example view' }
        })
        .state('index.transactions', {
             url: "/transactions",
             templateUrl: "views/transactions.html",
             data: { pageTitle: 'Example view' }
        })
        .state('index.triggers', {
             url: "/triggers",
             templateUrl: "views/triggers.html",
             data: { pageTitle: 'Example view' }
        })
        
}
angular
    .module('m2m')
    .config(config)
.run(function($rootScope, $state){
	$rootScope.$state = $state;

});
