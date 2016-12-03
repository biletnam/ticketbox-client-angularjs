'use strict';

describe('ticketbox.components.reserver', function () {
    describe('reserver', function () {
        var translateUseSpy, reserver, saveSpy, deleteSpy;

        angular.module('pascalprecht.translate',[]);
        beforeEach(module('ticketbox.components.reserver', function ($provide) {
            var translate = {
                use: function() { }
            };
            translateUseSpy = spyOn(translate, 'use').and.returnValue('en');
            $provide.value('$translate', translate);

            var reservation = {
                save: function() { },
                delete: function () { }
            };
            var promiseContainer = {
                '$promise':  {
                    'then': function() { }
                }
            };
            saveSpy = spyOn(reservation, 'save').and.returnValue(promiseContainer);
            deleteSpy = spyOn(reservation, 'delete').and.returnValue(promiseContainer);
            $provide.value('Reservation', reservation);
            
            var basket = {};
            $provide.value('basket', basket);
        }));

        beforeEach(inject(function (_reserver_) {
            reserver = _reserver_;
        }));

        describe('reserve()', function () {
            it('should create a reservation', function () {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seat = {
                    'seat': { 'id': seatId }
                };
                var expectedReservation = {
                    event_id: eventId,
                    category_id: categoryId,
                    seat_id: seatId
                };                
                expect(saveSpy).not.toHaveBeenCalled();
                reserver.reserve(eventId, categoryId, seat);
                expect(saveSpy).toHaveBeenCalledWith(expectedReservation);
            });

            it('should update the seat', function () {
                var eventId = 'e1';
                var categoryId = 'c1';
                var seatId = 's1';
                var seat = {
                    'seat': { 'id': seatId }
                };
                var expectedReservation = {
                    event_id: eventId,
                    category_id: categoryId,
                    seat_id: seatId
                };                
                expect(saveSpy).not.toHaveBeenCalled();
                reserver.reserve(eventId, categoryId, seat);
                expect(saveSpy).toHaveBeenCalledWith(expectedReservation);
            });
        });

        describe('release()', function () {
            it('should delete a reservation', function () {
                var reservationId = 'r1';
                var seat = {
                    'reservation_id': reservationId
                }
                expect(deleteSpy).not.toHaveBeenCalled();
                reserver.release(seat);
                expect(deleteSpy).toHaveBeenCalledWith({ 'id': reservationId });
            });
        });
    });
});
