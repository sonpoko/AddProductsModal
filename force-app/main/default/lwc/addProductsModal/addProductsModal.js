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
        if(data) {
            this.products = data;
            this.isLoading = false;
        //エラーが存在する場合、エラーメッセージをコンソールに出力する
        } else if (error) {
            console.error('Error fetching product list', error);
            this.isLoading = false;
        }
    }

    columns = [
        { label: '商品名', fieldName: 'Product2.Name', type: 'text' },
        { label: '商品コード', fieldName: 'Product2.ProductCode', type: 'text' },
        { label: 'リスト価格', fieldName: 'UnitPrice', type: 'currency' },
    ];

    handleRowAction(event) {

    }

    //get product(){
    //    console.log(Productsリストの受け渡し);
    //    return this.ProductList ? this.ProductList : [];
    //}
}