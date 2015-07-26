var app = angular.module('myApp', ['ngRoute']);
app.factory("services", ['$http', function($http) {
  var serviceBase = 'services/'
    var obj = {};
    obj.getInventory = function(){
        return $http.get(serviceBase + 'inventory');
    }
    obj.getInventory = function(inventoryID){
        return $http.get(serviceBase + 'inventory?id=' + inventoryID);
    }

    obj.insertInventory = function (inventory) {
    return $http.post(serviceBase + 'insertInventory', inventory).then(function (results) {
        return results;
    });
	};

	obj.updateInventory = function (id,inventory) {
	    return $http.post(serviceBase + 'updateInventory', {id:id, inventory:inventory}).then(function (status) {
	        return status.data;
	    });
	};

	obj.deleteInventory = function (id) {
	    return $http.delete(serviceBase + 'deleteInventory?id=' + id).then(function (status) {
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
    $rootScope.title = (inventoryID > 0) ? 'Edit Inventory' : 'Add Inventory';
    $scope.buttonText = (inventoryID > 0) ? 'Update Inventory' : 'Add New Inventory';
      var original = inventory.data;
      original._id = inventoryID;
      $scope.inventory = angular.copy(original);
      $scope.inventory._id = inventoryID;

      $scope.isClean = function() {
        return angular.equals(original, $scope.inventory);
      }

      $scope.deleteInventory = function(inventory) {
        $location.path('/');
        if(confirm("Are you sure to delete inventory number: "+$scope.inventory._id)==true)
        services.deleteInventory(inventory.inventoryNumber);
      };

      $scope.saveInventory = function(inventory) {
        $location.path('/');
        if (inventoryID <= 0) {
            services.insertInventory(inventory);
        }
        else {
            services.updateInventory(inventoryID, inventory);
        }
    };
});

app.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        title: 'Inventory',
        templateUrl: 'partials/inventory.html',
        controller: 'listCtrl'
      })
      .when('/edit-inventory/:inventoryID', {
        title: 'Edit Inventory',
        templateUrl: 'partials/edit-inventory.html',
        controller: 'editCtrl',
        resolve: {
          inventory: function(services, $route){
            var inventoryID = $route.current.params.inventoryID;
            return services.getInventory(inventoryID);
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
