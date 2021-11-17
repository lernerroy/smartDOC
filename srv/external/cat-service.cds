/* checksum : 2c287419c8cb77066b03e3ff5aff14db */

entity TripService.Carriers {
  name : String(255);
  descr : String(1000);
  createdAt : Timestamp;

  /**
   * {i18n>UserID.Description}
   */
  createdBy : String(255);
  modifiedAt : Timestamp;

  /**
   * {i18n>UserID.Description}
   */
  modifiedBy : String(255);
  key code : String(2);

};

entity TripService.Airports {
  name : String(255);
  descr : String(1000);
  createdAt : Timestamp;

  /**
   * {i18n>UserID.Description}
   */
  createdBy : String(255);
  modifiedAt : Timestamp;

  /**
   * {i18n>UserID.Description}
   */
  modifiedBy : String(255);
  key code : String(3);
  aptcd_icao : String(4);
  online_ind : Boolean;
  company_ind : Boolean;
  fo_po_days : Integer;

  /**
   * Please add an ON condition
   * {i18n>CountryCode.Description}
   */

  /**
   * {i18n>CountryCode.Description}
   */
  country_code_code : String(3);
  ekgrp : String(3);

  /**
   * Please add an ON condition
   * 
   */
  catloadstat_code : String(2);
  catgroundime : String(4);
  lat_coord : Decimal(16, 14);
  lon_coord : Decimal(16, 14);

  /**
   * Please add an ON condition
   * 
   */
  lat_coord_sign_code : String(1);

  /**
   * Please add an ON condition
   * 
   */
  lon_coord_sign_code : String(1);

};




@cds.external : true
service TripService {};

