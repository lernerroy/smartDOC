/* checksum : a78f3fdef4a13b97c36934500feb0885 */
@cds.external : true
service ZGW_LS_FO_TAXCODE_SRV {};

@cds.persistence.skip : true
@sap.content.version : '1'
entity ZGW_LS_FO_TAXCODE_SRV.TaxCodeSet {
  @sap.unicode : 'false'
  @sap.label : 'Tax Code'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key TaxCode : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key LanguageCode : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Description : String(50);
};

