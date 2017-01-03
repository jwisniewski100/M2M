(function() {
	angular.module('m2m').controller('MainCtrl', ['$scope', '$document', '$cookies', MainCtrl]);

	function MainCtrl($scope, $document, $cookies) {

	    //this.userName = 'Example user';
	    this.helloText = 'Welcome in M2M Menagement';



	   this.setNewUrl = function(newUrl)
	   {
		setCookie('url', newUrl);
		$scope.url = newUrl;
	 	$scope.isLoading = false;
	 	$scope.url = $scope.swaggerUrl = newUrl;
	//	$scope.expand();
	   }

	function setCookie(cname, cvalue) {
	    var d = new Date();
	    //d.setTime(d.getTime() + (exdays*24*60*60*1000));
	    //var expires = "expires="+d.toUTCString();
	    //document.cookie = cname + "=" + cvalue + "; ";
	    $cookies.put(cname, cvalue);
	}

	function getCookie(cname) {
	    /*var name = cname + "=";
	    var ca = document.cookie.split(';');
	    for(var i=0; i<ca.length; i++) {
		var c = ca[i];
		while (c.charAt(0)==' ') c = c.substring(1);
		if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
	    }
	    return "";*/
	    return $cookies.get(cname);
	}

	this.setNewUrl(getCookie('url'));

	};

})();
