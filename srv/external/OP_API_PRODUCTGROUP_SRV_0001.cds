/* checksum : c56eea5ebd901c10f4ecc5ebd9602e16 */
@cds.external : true
service API_PRODUCTGROUP_SRV {};

entity API_PRODUCTGROUP_SRV.A_ProductGroup {
  key MaterialGroup : String(9);
  AuthorizationGroup : String(4);

  /**
   * Please add  an ON condition
   */
  to_Text : Association to many API_PRODUCTGROUP_SRV.A_ProductGroupText {  };
};

entity API_PRODUCTGROUP_SRV.A_ProductGroupText {
  key MaterialGroup : String(9);
  key Language : String(2);
  MaterialGroupName : String(20);
  MaterialGroupText : String(60);

  /**
   * Please add  an ON condition
   */
  to_MaterialGroup : Association to API_PRODUCTGROUP_SRV.A_ProductGroup {  };
};

