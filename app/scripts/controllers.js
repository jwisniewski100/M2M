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

	$scope.colors = ['#45b7cd', '#ff6384', '#ff8e72'];

	$scope.labels1 = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
	
	$scope.data1 = [
	    [65, -59, 80, 81, -56, 55, -40],
	    [28, 48, -40, 19, 86, 27, 110]
	  ];
	$scope.datasetOverride1 = [
	    {
	      label: 'Override Series A',
	      borderWidth: 1,
	      type: 'bar'
	    },
	    {
	      label: 'Override Series B',
	      borderWidth: 3,
	      hoverBackgroundColor: 'rgba(255,99,132,0.4)',
	      hoverBorderColor: 'rgba(255,99,132,1)',
	      type: 'line'
	    }
	  ];

	  $scope.labels2 = ['Download Sales', 'In-Store Sales', 'Mail-Order Sales'];
	  $scope.data2 = [350, 450, 100];
	  $scope.datasetOverride2 = {
	    hoverBackgroundColor: ['#45b7cd', '#ff6384', '#ff8e72'],
	    hoverBorderColor: ['#45b7cd', '#ff6384', '#ff8e72']
	  };
	};

    $('#Order').submit(function(e) {
        e.preventDefault();
        // Coding
        $('[name="simOrderForm"]').modal('toggle'); //or  $('#IDModal').modal('hide');
        return false;
    });

})();
