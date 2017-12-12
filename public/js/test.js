var app = angular.module("my_module", ["ngRoute"]).config(function($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: "./public/templates/home.html",
        controller: "homeController"
    }).when("/manageAssets", {
        templateUrl: "./public/templates/manageAssets.html",
        controller: "my_controller"
    }).when("/add_assets", {
        templateUrl: "./public/templates/addAsset.html",
        controller: "add_controller"
    })

}).controller("homeController", function($scope) {
    $scope.message = "Welcome to Asset Management Home Page";
}).controller("add_controller", ['$scope', '$http', function($scope, $http) {

    $scope.assets = [{
        assetname: "",
        assetID: "",
    }]
    $scope.testt = "";
    $scope.add = function() {
        var asset = {
            assetname: $scope.assetname,
            assetID: $scope.assetID
        };
        var aname = $scope.assetname;
        var aID = $scope.assetID;
        console.log(asset);
        $scope.assets.push(asset);
        $http.post("/add_asset", {
            assetname: aname,
            assetID: aID
        }).then(function(respo) {
            $scope.testt = respo.data;
            //  $scope.show();
            alert(respo.data)
        }, function(erro) {
            console.log("add err:" + erro);
        })
    }
}]).controller("my_controller", ['$scope', '$http', function($scope, $http) {
    $scope.flag = false;
    $scope.btntext = "Edit";
    $scope.testVar = "";

    // var assetlist = {
    //     assetname: "",
    //     assetID: ""
    // };

    $scope.assetlist = {};
    var show = function() {
        // $scope.assetlist = assetlist;
        $http.get("/show_assets").then(function(response) {
            $scope.testVar = response.data;
            $scope.assetlist = response.data;
            //     console.log(response.data);
        }, function(error) {
            console.log("show err:" + error);
        })
    }

    show();
    $scope.edit = function(index, asset) {
        $scope.flag = true;
        $scope.enabledEdit = [];
        $scope.btntext = "Save";
        //     console.log("Update:" + asset.assetname);
        //    alert("Update Clicked:" + asset.assetname);

        console.log("edit index" + index);
        $scope.enabledEdit[index] = true;
        var aname = asset.assetname;
        var aID = asset.assetID;
        var a_id = asset._id;
        console.log("Asset in Edit:" + aname + ":" + aID + ":" + a_id);


    }

    $scope.update = function(index, asset) {
        $scope.flag = false;
        $scope.asst = {
            assetname: asset.assetname,
            assetID: asset.assetID,
            _id: asset._id
        };

        console.log("Asset in Update:" + $scope.asst.assetname + ":" + $scope.asst.assetID + ":" + $scope.asst._id);

        $scope.btntext = "Edit";
        $scope.enabledEdit[index] = false;
        $http.post("/update_asset/" + $scope.asst.a_id, $scope.asst).then(function(response) {
            $scope.testVar = response.data;
            $scope.assetlist = response.data;
            //show();
        }, function(error) {
            console.log("show upd err:" + error);
        })

    };
    $scope.delete = function(asset) {
        console.log("Delete row:" + asset.assetname);
        $scope.idd = {
            _id: asset._id
        };
        $http.post("/delete_asset/", $scope.idd).then(function(response) {
            // $scope.testVar = response.data;
            $scope.assetlist = response.data;
            show();
            alert(response.data);
        }, function(error) {
            console.log("Delete err:" + error);
        })
    }
    $scope.check = function(btntext, index, asset) {
        if (btntext == "Edit") {
            $scope.edit(index, asset);
        } else {
            $scope.update(index, asset);
        }

    };
}])