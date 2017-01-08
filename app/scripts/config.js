function config($stateProvider, $urlRouterProvider) {
    //$urlRouterProvider.otherwise("/index/minor");
    $urlRouterProvider.otherwise("/login/minor");

    $stateProvider

        .state('login', {
            abstract: true,
            url: "/login",
            //templateUrl: "views/common/content.html",
            templateUrl: "views/common/contentLogin.html",
            //templateUrl: "login.html",
        })
        .state('index', {
            abstract: true,
            url: "/index",
            templateUrl: "views/common/content.html",
            //templateUrl: "login.html",
        })
	    .state('index.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            //templateUrl: "login.html",
            data: { pageTitle: 'Example view' }
        })
	    .state('login.minor', {
            url: "/minor",
            templateUrl: "views/minor.html",
            //templateUrl: "login.html",
            data: { pageTitle: 'Example view' }
        })
        .state('login.register', {
            url: "/register",
            templateUrl: "views/register.html",
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
