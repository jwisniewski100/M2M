(function() {
	angular.module('m2m').controller('MainCtrl', ['$scope', '$document', '$cookies', MainCtrl]);

	function MainCtrl($scope, $document, $cookies) {

	    //this.userName = 'Example user';
	    this.helloText = 'Welcome in M2M Management';



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
	
	var labels = [], data=[];
//	$scope.chartlabels = ['ClassicMini', 'ClassicMicro', 'A1Clasic', 'A1d23ultra', 'NanoInter' ];
//	$scope.chartdata = [5, 7, 0, 9, 3];
	$(document).ready(function() {
		 
		$.get("http://localhost:3000/number_sims_with_profiles", function(data) {
			 $.each(data, function (i, word) {
				if(word.service == null ){
					labels[i] = "brak";
				}
				else
				{
					labels[i] = word.service; 
				}
				data[i] = word.count; 
				console.log(labels[i] +" " + data[i] + " " + i)
	         });
			 
		}); 
	});
	
	console.log(labels[0]);
	
	$scope.chartlabels = labels; //Dlaczego tutaj tych danych nie ma? 
	$scope.chartdata = data
	
	};

    $('#Order').submit(function(e) {
        e.preventDefault();
        // Coding
        $('[name="simOrderForm"]').modal('toggle'); //or  $('#IDModal').modal('hide');
        return false;
    });

})();
