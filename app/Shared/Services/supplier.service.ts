import { Injectable, Inject } from '@angular/core'
import { DataStore } from './data.service'
import { AuthService } from './auth.service'
import { ProductService } from './product.service'

import { SelectableData } from './../Classes/selectable-data'
import { Observable } from 'rxjs/Rx'


Injectable()
export class SupplierService {
    constructor( @Inject(DataStore) private dataStore: DataStore, @Inject(ProductService) private productService: ProductService) { }

    getSupplier(supplierId): Observable<any> {
        return this.dataStore.getDataObservable('Suppliers').map(suppliers => {
            var x = suppliers.filter(supplier => supplier._id === supplierId);
            return x && x.length > 0 ? x[0] : null;
        })
    }

    getAnnotatedSuppliers(): Observable<any> {
        return Observable.combineLatest(this.dataStore.getDataObservable('Suppliers'), this.dataStore.getDataObservable('Produits'), this.productService.getBasketItemsForCurrentUser(),
            (suppliers, produits, basketItems) => {
                return suppliers.map(supplier => {
                    return {
                        data: supplier,
                        annotation: {
                            hasBasket: this.productService.hasSupplierBasketItems(supplier, produits, basketItems)
                        }
                    }
                });
            }
        );
    }

}