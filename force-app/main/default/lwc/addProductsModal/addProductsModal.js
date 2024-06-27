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

    @api recordId;　//recordIdプロパティを公開

    @track products; //Apexクラスから取得したデータを保持するプロパティ
    @track filteredProducts; //検索にヒットした商品を保持するプロパティ
    @track selectedProductIds; //
    @track selectedProducts; //モーダル1で選択したデータを保持するプロパティ
    searchKey = ' ';

    @wire(getProductList) //Apexメソッドを呼び出してデータを取得

    wiredProducts({ error, data }){
        //データが存在する場合、this.Productsに格納する
        //if(data) {
        //    this.products = data;

        if (data) {
            console.log('商品',JSON.stringify(data));
            // データを変換して、データテーブルに表示できる形式にする
            this.products = data.map(product => ({
                Id: product.Id,
                Product2Name: product.Product2.Name,
                Product2ProductCode: product.Product2.ProductCode,
                UnitPrice: product.UnitPrice
            }));
                console.log('商品リスト', JSON.stringify(this.products));
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
    editableColumns = [
        { label: '商品名', fieldName: 'Product2Name', type: 'text' },
        { label: '商品コード', fieldName: 'Product2ProductCode', type: 'text' },
        { label: 'リスト価格', fieldName: 'UnitPrice', type: 'currency', editable: true },
    ];

    handleCancel() {
        this.dispatchEvent(new CloseActionScreenEvent());
    }
    handleSearch(event) {
        try {
            this.searchKey = event.target.value.toLowerCase();
            this.filteredProducts = this.products.filter(product => 
                product.Product2Name.toLowerCase().includes(this.searchKey) ||
                product.Product2ProductCode.toLowerCase().includes(this.searchKey)
            );
        } catch (error) {
            console.error('Error during search', error);
        }
    }
    handleNext() {
        // 選択された商品のIDを取得
        const selectedRows = this.template.querySelector('lightning-datatable').getSelectedRows();
        this.selectedProductIds = selectedRows.map(row => row.Id);
        
        // 選択された商品のデータを保持
        this.selectedProducts = this.products.filter(product => this.selectedProductIds.includes(product.Id));

        //モーダル2に切り替える
        this.showAddProductsModal = false;
        this.showEditProductsModal = true;
    }
    handleReturn() {
        //モーダル1に切り替える
        this.showAddProductsModal = true;
        this.showEditProductsModal = false;
    }

    handleRowAction(event) {

    }

    //get product(){
    //    console.log(Productsリストの受け渡し);
    //    return this.ProductList ? this.ProductList : [];
    //}
}