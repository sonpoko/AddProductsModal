public with sharing class getProductList {
    @AuraEnabled(Cacheable=true)
    public static List<PricebookEntry> getProductList(){ 
        try {
            List<PricebookEntry> Products = [
                SELECT Id, Product2.Name, Product2.ProductCode, UnitPrice
                FROM PricebookEntry
                WHERE Pricebook2.IsActive = TRUE
            ];

            return Products;

        } catch (Exception e) {
            throw new AuraHandledException(e.getMessage());
        }
    }
}