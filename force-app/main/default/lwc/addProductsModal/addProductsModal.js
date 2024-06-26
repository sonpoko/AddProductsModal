import { LightningElement ,api, wire } from 'lwc';
import getProductList from '@salesforce/apex/getProductList.getProductList';
import { CloseActionScreenEvent } from 'lightning/actions';
import addProductsModal from './addProductsModal.html';
import editProductsModal from './editProductsModal.html';
import { getRecord, getFieldValue } from 'lightning/uiRecordApi';
import QuoteLineItem_Product from '@salesforce/schema/QuoteLineItem__c.Product__c'

//const FIERDS = [QuoteLineItem__r.Product__c];

export default class AddProductsModal extends LightningElement {
    //モーダル1をデフォルトで表示する
    showAddProductsModal = true;
    showEditProductsModal = false;

    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    handleNext() {
        //モーダル2に切り替える
        this.showAddProductsModal = false;
        this.showEditProductsModal = true;
    }
    handleReturn() {
        //モーダル1に切り替える
        this.showAddProductsModal = true;
        this.showEditProductsModal = false;
    }

    @api recordId;
    Products;

    @wire(getProductList)

    wiredProducts({ error, data }){
        if(data) {
            this.products = data;
        } else if (error) {
            console.error('Error fetching product list', error);
        }
    }

    get product(){
        return this.ProductList ? this.ProductList : [];
    }
}