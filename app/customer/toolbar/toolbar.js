'use strict';

angular.module('ticketbox.components.toolbar', [
    'ticketbox.components.basket'])

    .directive('toolbar', function() {
        return {
            restrict: 'E',
            scope: { },
            controller: 'ToolbarCtrl',
            templateUrl: 'toolbar/toolbar.html'
        }
    })

    .controller('ToolbarCtrl', function($scope, $location, Reservation, reserver, basket, currency) {
        $scope.reservations = basket.getReservations();
        $scope.currency = currency;
        
        $scope.cancel = function() {
            var reservations = basket.getReservations();
            _.each(reservations, function(r) {
                reserver.releaseReservation(r);
            });
            $location.path('/events');
        }
    })
    
    .filter('totalPrice', function() {
        return function(reservations) {
            if (reservations === undefined) {
                return 0;
            } else {
                return _.reduce(reservations, function(totalPrice, r) { return totalPrice + r.price; }, 0);
            }
        }
    });