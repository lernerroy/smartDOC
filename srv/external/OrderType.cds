/* checksum : 22270a3d45900b4bada3cb07dac10b63 */
@cds.external : true
service ZGW_LS_FO_ORDER_TYPE_SRV {};

entity ZGW_LS_FO_ORDER_TYPE_SRV.A_OrderTypeSet {
  key OrderType : String(4);
  OrderCategory : String(2);
  Language : String(2);
  OrderTypeDescription : String(40);
};

