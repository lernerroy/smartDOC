/* checksum : d7f2cb7fa451e3bd56fad0264fdd80fb */
@cds.external : true
service ZGW_LS_FO_CONTROL_KEY_SRV {};


entity ZGW_LS_FO_CONTROL_KEY_SRV.ControlKeySet {
  key ControlKey : String(4);
  Language : String(2);
  Application : String(1);
  ControlKeyText : String(40);
};

