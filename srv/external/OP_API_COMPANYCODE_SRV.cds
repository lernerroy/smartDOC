/* checksum : d862a73fc2f375c1d7e0f7edc407e75a */
@cds.external : true
service API_COMPANYCODE_SRV {};

entity API_COMPANYCODE_SRV.A_CompanyCode {
  key CompanyCode : String(4);
  CompanyCodeName : String(25);
  CityName : String(25);
  Country : String(3);
  Currency : String(5);
  Language : String(2);
  ChartOfAccounts : String(4);
  FiscalYearVariant : String(2);
  Company : String(6);
  CreditControlArea : String(4);
  CountryChartOfAccounts : String(4);
  FinancialManagementArea : String(4);
  AddressID : String(10);
  TaxableEntity : String(4);
  VATRegistration : String(20);
  ExtendedWhldgTaxIsActive : Boolean;
  ControllingArea : String(4);
  FieldStatusVariant : String(4);
  NonTaxableTransactionTaxCode : String(2);
  DocDateIsUsedForTaxDetn : Boolean;
  TaxRptgDateIsActive : Boolean;
};

