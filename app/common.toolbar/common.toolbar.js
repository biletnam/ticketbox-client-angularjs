'use strict';

angular.module('ticketbox.common.toolbar', [
    'ngRoute',
    'ticketbox.config',
    'ticketbox.components.basket'])

    .directive('toolbar', function() {
        return {
            restrict: 'E',
            scope: { },
            controller: 'ToolbarCtrl',
            templateUrl: 'common.toolbar/common.toolbar.html'
        }
    })

    .controller('ToolbarCtrl', function($scope, $route, $location, $window, reserver, basket, currency, canCustomerPurchase) {
        $scope.controller = $route.current.controller;

        angular.element($window).bind("scroll", function() {
            if (this.pageYOffset >= 100) {
                angular.element(document.getElementsByClassName('toolbar')[0]).addClass('visible');
            } else {
                angular.element(document.getElementsByClassName('toolbar')[0]).removeClass('visible');
            }
        });

        $scope.reservations = basket.getReservations();
        $scope.currency = currency;
        $scope.canCustomerPurchase = canCustomerPurchase;

        $scope.areButtonsVisible = false;
        $scope.toggleButtonsVisibility = function() {
            $scope.areButtonsVisible = !$scope.areButtonsVisible;
            if ($scope.areButtonsVisible) {
                angular.element(document.getElementsByClassName('buttons')[0]).addClass('buttons-visible');
            } else {
                angular.element(document.getElementsByClassName('buttons')[0]).removeClass('buttons-visible');
            }
        }
        
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