var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getinventory = function(){
        return $http.get(serviceBase + 'inventory');
    }
    obj.getinventory = function(inventoryID){
        return $http.get(serviceBase + 'inventory?id=' + inventoryID);
    }

    obj.insertinventory = function (inventory) {
    return $http.post(serviceBase + 'insertinventory', inventory).then(function (results) {
        return results;
    });
	};

	obj.updateinventory = function (id,inventory) {
	    return $http.post(serviceBase + 'updateinventory', {id:id, inventory:inventory}).then(function (status) {
	        return status.data;
	    });
	};

	obj.deleteinventory = function (id) {
	    return $http.delete(serviceBase + 'deleteinventory?id=' + id).then(function (status) {
	        return status.data;
	    });
	};

    return obj;
}]);

app.controller('listCtrl', function ($scope, services) {
    services.getinventorys().then(function(data){
        $scope.inventorys = data.data;
    });
});

app.controller('editCtrl', function ($scope, $rootScope, $location, $routeParams, services, inventory) {
    var inventoryID = ($routeParams.inventoryID) ? parseInt($routeParams.inventoryID) : 0;
    $rootScope.title = (inventoryID > 0) ? 'Edit inventory' : 'Add inventory';
    $scope.buttonText = (inventoryID > 0) ? 'Update inventory' : 'Add New inventory';
      var original = inventory.data;
      original._id = inventoryID;
      $scope.inventory = angular.copy(original);
      $scope.inventory._id = inventoryID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.inventory);
      }

      $scope.deleteinventory = function(inventory) {
        $location.path('/');
        if(confirm("Are you sure to delete inventory number: "+$scope.inventory._id)==true)
        services.deleteinventory(inventory.inventoryNumber);
      };

      $scope.saveinventory = function(inventory) {
        $location.path('/');
        if (inventoryID <= 0) {
            services.insertinventory(inventory);
        }
        else {
            services.updateinventory(inventoryID, inventory);
        }
    };
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'inventorys',
        templateUrl: 'partials/inventorys.html',
        controller: 'listCtrl'
      })
      .when('/edit-inventory/:inventoryID', {
        title: 'Edit inventory',
        templateUrl: 'partials/edit-inventory.html',
        controller: 'editCtrl',
        resolve: {
          inventory: function(services, $route){
            var inventoryID = $route.current.params.inventoryID;
            return services.getinventory(inventoryID);
          }
        }
      })
      .otherwise({
        redirectTo: '/'
      });
}]);
app.run(['$location', '$rootScope', function($location, $rootScope) {
    $rootScope.$on('$routeChangeSuccess', function (event, current, previous) {
        $rootScope.title = current.$$route.title;
    });
}]);
