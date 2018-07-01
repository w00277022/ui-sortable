var myapp = angular.module('sortableApp', ['ui.sortable']);

myapp.buildArray = function (name, size) {
    var i, array = [];
    for (i = 0; i < size; i++) {
        array.push({
            text: name + ' ' + i,
            value: i,
            index: 65535*i
        });
    }

    return array;
};

myapp.controller('sortableController', function ($scope) {
    'use strict';

    $scope.list = myapp.buildArray('Item', 5);

    $scope.sortingLog = [];

    $scope.sortableOptions = {
        // called after a node is dropped
        stop: function (e, ui) {
            var logEntry = {
                ID: $scope.sortingLog.length + 1,
                Text: 'Moved element: ' + ui.item.scope().item.text + " move from " + ui.item.sortable.index + " to " +  ui.item.sortable.dropindex
            };
            $scope.sortingLog.push(logEntry);
            console.log("move from " + ui.item.sortable.index + " to " +  ui.item.sortable.dropindex);
            var dropindex = ui.item.sortable.dropindex;
            var beforIndex = $scope.list[dropindex-1];
            var afterIndex = $scope.list[dropindex+1];
            var pos = (beforIndex.index + afterIndex.index)/2;
            $scope.list[dropindex].index = pos;
            angular.forEach($scope.list,function (data) {
                var logEntry = {
                    ID: $scope.sortingLog.length + 1,
                    Text: data.index
                };
                $scope.sortingLog.push(logEntry);
            })
        }
    };
});

myapp.controller('connectedController', function ($scope) {
    $scope.leftArray = myapp.buildArray('Left', 5);
    $scope.rightArray = myapp.buildArray('Right', 7);
    $scope.sortableOptions = {
        connectWith: '.connectedItemsExample .list'
    };
});