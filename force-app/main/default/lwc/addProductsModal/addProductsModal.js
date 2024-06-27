import { LightningElement ,api, wire, track } from 'lwc';
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
    isLoading = true;

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

    @api recordId;　//recordIdプロパティを公開
    Products; //Apexクラスから取得したデータを保持するプロパティ

    @wire(getProductList) //Apexメソッドを呼び出してデータを取得

    wiredProducts({ error, data }){
        //データが存在する場合、this.Productsに格納する
        //if(data) {
        //    this.products = data;

        if (data) {
            // データを変換して、データテーブルに表示できる形式にする
            this.products = data.map(product => ({
                Id: product.Id,
                Product2Name: product.Product2.Name,
                Product2ProductCode: product.Product2.ProductCode,
                UnitPrice: product.UnitPrice
            }));
                this.isLoading = false;
        //エラーが存在する場合、エラーメッセージをコンソールに出力する
        } else if (error) {
            console.error('Error fetching product list', error);
            this.isLoading = false;
        }
    }
        //モーダル1のlightning-datatableに表示するカラム
    columns1 = [
        { label: '商品名', fieldName: 'Product2Name', type: 'text' },
        { label: '商品コード', fieldName: 'Product2ProductCode', type: 'text' },
        { label: 'リスト価格', fieldName: 'UnitPrice', type: 'currency' },
    ];

        //モーダル2のlightning-datatableに表示するカラム
    columns2 = [
        { label: '商品名', fieldName: 'Product2Name', type: 'text' },
        { label: '商品コード', fieldName: 'Product2ProductCode', type: 'text' },
        { label: 'リスト価格', fieldName: 'UnitPrice', type: 'currency', editable: true },
    ];

    handleRowAction(event) {

    }

    //get product(){
    //    console.log(Productsリストの受け渡し);
    //    return this.ProductList ? this.ProductList : [];
    //}
}