"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var order_service_1 = require('./../Shared/Services/order.service');
var EquipeListComponent = (function () {
    function EquipeListComponent(orderService) {
        this.orderService = orderService;
    }
    EquipeListComponent.prototype.ngOnInit = function () {
        this.equipes = this.orderService.getAnnotatedEquipes();
    };
    EquipeListComponent.prototype.getEquipeObservable = function (id) {
        return this.equipes.map(function (equipes) { return equipes.filter(function (s) { return s.data._id === id; })[0]; });
    };
    EquipeListComponent = __decorate([
        core_1.Component({
            moduleId: module.id,
            templateUrl: './equipe-list.component.html'
        }), 
        __metadata('design:paramtypes', [order_service_1.OrderService])
    ], EquipeListComponent);
    return EquipeListComponent;
}());
exports.EquipeListComponent = EquipeListComponent;
//# sourceMappingURL=equipe-list.component.js.map