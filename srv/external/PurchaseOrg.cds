/* checksum : e8eb410252ab8847dd39433c9e2d1474 */
@cds.external : true
service ZGW_LS_FO_PURCHASE_ORG_SRV {};

@cds.odata.valuelist
entity ZGW_LS_FO_PURCHASE_ORG_SRV.PurchasingOrganizationSet {
  key PurchasingOrg : String(4);
  Description : String(20);
};

