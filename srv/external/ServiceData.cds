/* checksum : d11954dd8caf271405c046ff94725b31 */
@cds.external : true
service ZGW_LS_FO_SERVICE_SRV {};

@cds.persistence.skip : true
@sap.content.version : '1'
entity ZGW_LS_FO_SERVICE_SRV.A_ServiceDataSet {
  @sap.unicode : 'false'
  @sap.label : 'Activity number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  key Activity : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Description'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  Activitydesc : String(40);
};

