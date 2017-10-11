'use strict';

describe('ticketbox.customer.block', function () {
    var scope, getSpy;
    
    beforeEach(function () {
        angular.module('ticketbox.components.api',[]);
        module('ticketbox.customer.block');

        inject(function (_$rootScope_, $controller) {
            scope = _$rootScope_.$new();
            var eventblock = {
                get: function() { }
            };
            getSpy = spyOn(eventblock, 'get');

            var routeParams = {
                'blockId': 42
            };

            var reserver = { };
            $controller('BlockCtrl', {$scope: scope, Eventblock: eventblock, $routeParams: routeParams, reserver: reserver});
        });
    });

    describe('BlockCtrl', function () {
        describe('$scope.block', function () {
            it('should fetch eventblock', function () {
                expect(getSpy).toHaveBeenCalledWith({ 'id': 42 }); 
            });
        });
    });
});