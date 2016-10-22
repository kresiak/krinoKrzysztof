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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('@angular/core');
var data_service_1 = require('./data.service');
var auth_service_1 = require('./auth.service');
var selectable_data_1 = require('./../Classes/selectable-data');
var Rx_1 = require('rxjs/Rx');
core_1.Injectable();
var ProductService = (function () {
    function ProductService(dataStore, authService) {
        this.dataStore = dataStore;
        this.authService = authService;
    }
    ProductService.prototype.getSelectableCategories = function () {
        return this.dataStore.getDataObservable('Categories').map(function (categories) {
            return categories.map(function (category) {
                return new selectable_data_1.SelectableData(category._id, category.Description);
            });
        });
    };
    ProductService.prototype.updateProduct = function (product) {
        this.dataStore.updateData('Produits', product._id, product);
    };
    ProductService.prototype.createCategory = function (newCategory) {
        this.dataStore.addData('Categories', { 'Description': newCategory });
    };
    ProductService.prototype.getProductsBySupplier = function (supplierId) {
        return this.dataStore.getDataObservable('Produits').map(function (produits) { return produits.filter(function (produit) { return produit.Supplier === supplierId; }); });
    };
    ProductService.prototype.getAnnotedProductsBySupplier = function (supplierId) {
        return Rx_1.Observable.combineLatest(this.getProductsBySupplier(supplierId), this.getBasketItemsForCurrentUser(), function (products, basketItems) {
            return products.map(function (product) {
                var basketItemFiltered = basketItems.filter(function (item) { return item.produit === product._id; });
                return {
                    data: product,
                    annotation: {
                        basketId: basketItemFiltered && basketItemFiltered.length > 0 ? basketItemFiltered[0]._id : null,
                        quantity: basketItemFiltered && basketItemFiltered.length > 0 ? basketItemFiltered[0].quantity : 0
                    } };
            });
        });
    };
    ProductService.prototype.getBasketItemForCurrentUser = function (productId) {
        var _this = this;
        return this.dataStore.getDataObservable('basket').map(function (basket) {
            var basketItems = basket.filter(function (basketItem) {
                return basketItem.produit === productId && basketItem.user === _this.authService.getUserId();
            });
            return basketItems && basketItems.length > 0 ? basketItems[0] : null;
        });
    };
    ProductService.prototype.getBasketItemsForCurrentUser = function () {
        var _this = this;
        return this.dataStore.getDataObservable('basket').map(function (basket) {
            return basket.filter(function (basketItem) {
                return basketItem.user === _this.authService.getUserId();
            });
        });
    };
    /*    xxgetProductsInBasketBySupplier(supplierId) : Observable<any>
        {
            return Observable.combineLatest(this.getProductsBySupplier(supplierId), this.getBasketItemsForCurrentUser(),
                (products, basketItems) =>
                {
                    return products.filter(product => basketItems.map(item => item.produit).includes(product._id)).map;
                }
            );
        }
    */
    ProductService.prototype.getAnnotedProductsInBasketBySupplier = function (supplierId) {
        return Rx_1.Observable.combineLatest(this.getProductsBySupplier(supplierId), this.getBasketItemsForCurrentUser(), function (products, basketItems) {
            return products.filter(function (product) { return basketItems.map(function (item) { return item.produit; }).includes(product._id); })
                .map(function (product) {
                var basketItemFiltered = basketItems.filter(function (item) { return item.produit === product._id; });
                return basketItemFiltered && basketItemFiltered.length > 0 ? {
                    data: product,
                    annotation: {
                        basketId: basketItemFiltered[0]._id,
                        quantity: basketItemFiltered[0].quantity,
                        totalPrice: product.Prix * basketItemFiltered[0].quantity * 1.21,
                        otp: { _id: '5802120e93e81802c5936b06', Name: 'R.EURO.0712-J-F' } // Todo Otp service
                    } } : null;
            });
        });
    };
    ProductService.prototype.createBasketItem = function (product, quantity) {
        this.dataStore.addData('basket', { user: this.authService.getUserId(), produit: product._id, quantity: quantity });
    };
    ProductService.prototype.updateBasketItem = function (basketItemId, product, quantity) {
        this.dataStore.updateData('basket', basketItemId, { user: this.authService.getUserId(), produit: product._id, quantity: quantity });
    };
    ProductService.prototype.removeBasketItem = function (basketItemId) {
        this.dataStore.deleteData('basket', basketItemId);
    };
    ProductService = __decorate([
        __param(0, core_1.Inject(data_service_1.DataStore)),
        __param(1, core_1.Inject(auth_service_1.AuthService)), 
        __metadata('design:paramtypes', [data_service_1.DataStore, auth_service_1.AuthService])
    ], ProductService);
    return ProductService;
}());
exports.ProductService = ProductService;
//# sourceMappingURL=product.service.js.map