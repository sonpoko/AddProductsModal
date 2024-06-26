public with sharing class getProductList {
    @AuraEnabled(Cacheable=true)
    public static List<PricebookEntry> getProductList(){ 
        try {
            List<PricebookEntry> Products = [
                SELECT Product2.Name, Product2.ProductCode, UnitPrice
                FROM PricebookEntry
            ];

            return Products;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}