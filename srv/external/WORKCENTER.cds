/* checksum : b028a7cb116e79f477534126add251af */
@cds.external : true
service ZGW_LS_FO_WORK_CENTER_SRV {};
@cds.odata.valuelist
entity ZGW_LS_FO_WORK_CENTER_SRV.WorkCenterSet {
  key WorkCenter : String(8);
  Description : String(40);
  Language : String(2);
};

