/* checksum : 43b2490e18f6e801b3187e713f48ee63 */
entity TripService.Languages {
  name : String(255);
  descr : String(1000);
  key code : String(14);

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.Languages_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.Languages_texts on localized.code = code;
};

entity TripService.triprecord {
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
  key insupcarriercode2 : String(2);
  key inflightno : String(4);
  key inorigin : String(3);
  key indestination : String(3);
  key inscheddeptdate : Date;
  fosuffix : String(2);
  key surrogatenum : String(23);
  aufnr : String(12);

  /**
   * Please add an ON condition
   * 
   */
  supcarriercode2 : Association to one TripService.carriers on supcarriercode2.code = supcarriercode2_code;
  supcarriercode2_code : String(2);
  scheddeptdate : Date;
  flightno : String(4);

  /**
   * Please add an ON condition
   * 
   */
  supcarriercode : Association to one TripService.carriers on supcarriercode.code = supcarriercode_code;
  supcarriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  carriercode : Association to one TripService.carriers on carriercode.code = carriercode_code;
  carriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  origin : Association to one TripService.airportsCodes on origin.code = origin_code;
  origin_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  destination : Association to one TripService.airportsCodes on destination.code = destination_code;
  destination_code : String(3);
  repeatno : String(3);
  idooutc : Date;
  idoo : Date;
  doo : Date;
  dooutc : Date;

  /**
   * Please add an ON condition
   * 
   */
  actarrapt : Association to one TripService.airportsCodes on actarrapt.code = actarrapt_code;
  actarrapt_code : String(3);
  actarrapticao : String(4);

  /**
   * Please add an ON condition
   * 
   */
  actdeptapt : Association to one TripService.airportsCodes on actdeptapt.code = actdeptapt_code;
  actdeptapt_code : String(3);
  actdeptapticao : String(4);

  /**
   * Please add an ON condition
   * 
   */
  legstate : Association to one TripService.legstates on legstate.code = legstate_code;
  legstate_code : String(3);
  aircrafttype : String(3);
  aircrafttypecpa : String(3);
  tailno : String(8);
  flighttype : String(1);
  deptparkposn : String(10);
  actgatetime : Integer;
  servicetype : String(1);
  delayreason1 : String(3);
  delayreason2 : String(3);
  delayreason3 : String(3);
  delayreason4 : String(3);
  delayreason5 : String(3);
  actualflyingdur : Integer;
  scheddepttime : Time;
  scheddeptts : Decimal(15);
  actdeptts : Decimal(15);
  takeoffdate : Date;
  takeofftime : Time;
  touchdndate : Date;
  touchdntime : Time;
  actdeptdate : Date;
  actdepttime : Time;
  actarrdate : Date;
  actarrtime : Time;
  takeoffdateutc : Date;
  takeofftimeutc : Time;
  touchdndateutc : Date;
  touchdntimeutc : Time;
  actdeptdateutc : Date;
  actdepttimeutc : Time;
  actarrdateutc : Date;
  actarrtimeutc : Time;
  scheddeptdateutc : Date;
  scheddepttimeutc : Time;
  schedarrdateutc : Date;
  schedarrtimeutc : Time;
  schedarrdate : Date;
  schedarrtime : Time;
  schedarrts : Decimal(15);
  actarrts : Decimal(15);
  estdeptdate : Date;
  estdepttime : Time;
  estdeptdateutc : Date;
  estdepttimeutc : Time;
  estarrdateutc : Date;
  estarrtimeutc : Time;
  estarrdate : Date;
  estarrtime : Time;
  planblocktime : Integer;
  schedarrapticao : String(4);

  /**
   * Please add an ON condition
   * 
   */
  schedarrapt : Association to one TripService.airportsCodes on schedarrapt.code = schedarrapt_code;
  schedarrapt_code : String(3);
  scheddeptapticao : String(4);

  /**
   * Please add an ON condition
   * 
   */
  scheddeptapt : Association to one TripService.airportsCodes on scheddeptapt.code = scheddeptapt_code;
  scheddeptapt_code : String(3);
  flight_tm : Integer;
  arr_stand : String(10);
  dep_terminal : String(4);
  arr_terminal : String(4);
  onblockdate : Date;
  onblocktime : Time;
  offblockdate : Date;
  offblocktime : Time;
  taxi_out_time : Integer;
  route : String(10);
  cfpno1 : String(10);
  cfpno2 : String(10);
};

entity TripService.pax {
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
  key insupcarriercode2 : String(2);
  key inflightno : String(4);
  key inorigin : String(3);
  key indestination : String(3);
  key inscheddeptdate : Date;
  fosuffix : String(2);
  key surrogatenum : String(23);

  /**
   * Please add an ON condition
   * 
   */
  carriercode : Association to one TripService.carriers on carriercode.code = carriercode_code;
  carriercode_code : String(2);
  version : Integer;
  user_ind : String(1);
  firstclasspax : Decimal(3);
  busclasspax : Decimal(3);
  premecopax : Decimal(3);
  ecopax : Decimal(3);
  totalpax : Decimal(3);
  revpaxfirst : Decimal(3);
  revpaxbus : Decimal(3);
  revpaxpreco : Decimal(3);
  revpaxeco : Decimal(3);
  revpaxtot : Decimal(3);
  nrevpaxfirst : Decimal(3);
  nrevpaxbus : Decimal(3);
  nrevpaxpreco : Decimal(3);
  nrevpaxeco : Decimal(3);
  nrevpaxtot : Decimal(3);
  chdpax : Decimal(3);
  infpax : Decimal(3);
  wchpax : Decimal(3);
  wchc : Decimal(3);
  wchs : Decimal(3);
  wchr : Decimal(3);
  wcbd : Decimal(3);
  wcbw : Decimal(3);
  wcmp : Decimal(3);
  wcob : Decimal(3);
  wclb : Decimal(3);
  boardpax : Decimal(3);
  transitpax : Decimal(3);
  transferpax : Decimal(3);
  bagquan : Decimal(8);
  bagweight : Decimal(8, 2);
  traint : Decimal(3);
  tradom : Decimal(3);
  creation_timestamp : Decimal(15);
  tecnum : Integer;
  cabnum : Integer;
  capnum : Integer;
  cocnum : Integer;
  ecavml : Integer;
  ecbbml : Integer;
  ecblml : Integer;
  ecchml : Integer;
  ecdbml : Integer;
  ecfpml : Integer;
  ecgfml : Integer;
  echnml : Integer;
  ecksml : Integer;
  eclcml : Integer;
  eclfml : Integer;
  eclsml : Integer;
  ecmoml : Integer;
  ecnlml : Integer;
  ecorml : Integer;
  ecrvml : Integer;
  ecsfml : Integer;
  ecvgml : Integer;
  ecvjml : Integer;
  ecvlml : Integer;
  ecvoml : Integer;
  bcavml : Integer;
  bcbbml : Integer;
  bcblml : Integer;
  bcchml : Integer;
  bcdbml : Integer;
  bcfpml : Integer;
  bcgfml : Integer;
  bchnml : Integer;
  bcksml : Integer;
  bclcml : Integer;
  bclfml : Integer;
  bclsml : Integer;
  bcmoml : Integer;
  bcnlml : Integer;
  bcorml : Integer;
  bcrvml : Integer;
  bcsfml : Integer;
  bcvgml : Integer;
  bcvjml : Integer;
  bcvlml : Integer;
  bcvoml : Integer;
  umnr : Integer;
};

entity TripService.cargorecord {
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
  key insupcarriercode2 : String(2);
  key inflightno : String(4);
  key inorigin : String(3);
  key indestination : String(3);
  key inscheddeptdate : Date;
  fosuffix : String(2);
  key surrogatenum : String(23);
  version : String(3);
  user_ind : String(1);
  chgtottonn : Decimal(8, 2);
  acttottonn : Decimal(8, 2);
  tottranstonn : Decimal(8, 2);
  chgtotimptonn : Decimal(8, 2);
  acttotimptonn : Decimal(8, 2);
  chgtotexptonn : Decimal(8, 2);
  acttotexptonn : Decimal(8, 2);
  chgimploose : Decimal(8, 2);
  actimploose : Decimal(8, 2);
  chgimpprepck : Decimal(8, 2);
  actimpprepck : Decimal(8, 2);
  chgexploose : Decimal(8, 2);
  actexploose : Decimal(8, 2);
  chgexpprepack : Decimal(8, 2);
  actexpprepack : Decimal(8, 2);
  chgmailimport : Decimal(8, 2);
  actmailimport : Decimal(8, 2);
  chgmailexport : Decimal(8, 2);
  actmailexport : Decimal(8, 2);
  avichgtkg : Decimal(8, 2);
  aviactkg : Decimal(8, 2);
  avinoawb : Decimal(8);
  dgrchgtkg : Decimal(8, 2);
  dgractkg : Decimal(8, 2);
  dgrnoawb : Decimal(8, 2);
  humchgkg : Decimal(8, 2);
  humactkg : Decimal(8, 2);
  humnoawb : Decimal(8);
  perchgkg : Decimal(8, 2);
  peractkg : Decimal(8, 2);
  pernoawb : Decimal(8);
  valchgkg : Decimal(8, 2);
  valactkg : Decimal(8, 2);
  valnoawb : Decimal(8);
  pilchgkg : Decimal(8, 2);
  pilactkg : Decimal(8, 2);
  pilnoawb : Decimal(8);
  pefchgkg : Decimal(8, 2);
  pefactkg : Decimal(8, 2);
  pefnoawb : Decimal(8, 2);
  temchgkg : Decimal(8, 2);
  temactkg : Decimal(8, 2);
  temnoawb : Decimal(8, 2);
  vunchgkg : Decimal(8, 2);
  vunactkg : Decimal(8, 2);
  vunnoawb : Decimal(8, 2);
  totawb : Decimal(8, 2);
  chgtransloose : Decimal(8, 2);
  acttransloose : Decimal(8, 2);
  chgtransprepack : Decimal(8, 2);
  acttransprepack : Decimal(8, 2);
  chgephloose : Decimal(8, 2);
  actephloose : Decimal(8, 2);
  chgephprepack : Decimal(8, 2);
  actephprepack : Decimal(8, 2);
  chgepdcgo : Decimal(8, 2);
  actepdcgo : Decimal(8, 2);
  creation_timestamp : Decimal(15);
  chgimptonn : Decimal(8, 2);
  chgexptonn : Decimal(8, 2);
  chgtottranstonn : Decimal(8, 2);
};

entity TripService.routeplan {
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
  key insupcarriercode2 : String(2);
  key inflightno : String(4);
  key inorigin : String(3);
  key indestination : String(3);
  key inscheddeptdate : Date;
  fosuffix : String(2);
  key surrogatenum : String(23);
  key lineno : String(3);
  key cfpno : String(15);
  routeno : String(4);
  countrycode : String(250);
  airspdistnm : String(6);
  airspdistm : String(12);
  airspdistkm : String(6);
  elapsedtime : String(6);
  deptapticao : String(4);
  arrapticao : String(4);
  tailno : String(8);
  entrydatelmt : Date;
  entrytimelmt : Time;
  entrydateutc : Date;
  entrytimeutc : Time;
  exitdatelmt : Date;
  exittimelmt : Time;
  exitdateutc : Date;
  exittimeutc : Time;
  amount : Decimal(11, 2);
  rate : Decimal(11, 2);

  /**
   * Please add an ON condition
   * {i18n>CurrencyCode.Description}
   */
  currency : Association to one TripService.currencies_spec on currency.code = currency_code;

  /**
   * {i18n>CurrencyCode.Description}
   */
  currency_code : String(3);
  entrypoint : String(10);
  exitpoint : String(10);
  entryawy : String(10);
  exitawy : String(10);
  chargetype : String(2);
  provid : String(2);
  gcd : Decimal(8);
};

entity TripService.accommodation {
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
  key insupcarriercode2 : String(2);
  key inflightno : String(4);
  key inorigin : String(3);
  key indestination : String(3);
  key inscheddeptdate : Date;
  fosuffix : String(2);
  key surrogatenum : String(23);

  /**
   * Please add an ON condition
   * 
   */
  carriercode : Association to one TripService.carriers on carriercode.code = carriercode_code;
  carriercode_code : String(2);
  flightno : String(4);

  /**
   * Please add an ON condition
   * 
   */
  origin : Association to one TripService.airportsCodes on origin.code = origin_code;
  origin_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  destination : Association to one TripService.airportsCodes on destination.code = destination_code;
  destination_code : String(3);
  scheddeptdateutc : Date;
  ccsmsgref : String(23);
  scheddeptdate : Date;
  vendor : String(10);
  actarrdateutc : Date;
  actarrdate : Date;
  servcode : String(18);
  reservedate : Date;
  rmntsqty : Integer;
  allowamt : Decimal(11, 2);

  /**
   * Please add an ON condition
   * {i18n>CurrencyCode.Description}
   */
  currency : Association to one TripService.currencies_spec on currency.code = currency_code;

  /**
   * {i18n>CurrencyCode.Description}
   */
  currency_code : String(3);
};

entity TripService.catering {
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
  key insupcarriercode2 : String(2);
  key inflightno : String(4);
  key inorigin : String(3);
  key indestination : String(3);
  key inscheddeptdate : Date;
  fosuffix : String(2);
  key surrogatenum : String(23);

  /**
   * Please add an ON condition
   * 
   */
  carriercode : Association to one TripService.carriers on carriercode.code = carriercode_code;
  carriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  origin : Association to one TripService.airportsCodes on origin.code = origin_code;
  origin_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  destination : Association to one TripService.airportsCodes on destination.code = destination_code;
  destination_code : String(3);
  classtype : String(10);
  sapmeal : String(18);
  exdescription : String(100);
  paxqun : Decimal(3);
  unitofmesur : String(3);
  exmenucode : String(100);
  exmenudesc : String(200);
  salescat : String(50);
  pricerel : String(1);
  mealfact : String(1);
  quant : Decimal(13, 3);
  netprice : Decimal(11, 2);
  grossgross : Decimal(11, 2);
  custdiscount : Decimal(11, 2);
  netamont : Decimal(11, 2);
  airportfee : Decimal(11, 2);
  airportfeevat : Decimal(11, 2);
  gstvat : Decimal(11, 2);
  consumptiontax : Decimal(11, 2);
  surchargeamount : Decimal(11, 2);
  vatp : Decimal(11, 2);
  gipba : Decimal(11, 2);
  totalamount : Decimal(11, 2);

  /**
   * Please add an ON condition
   * {i18n>CurrencyCode.Description}
   */
  currency : Association to one TripService.currencies_spec on currency.code = currency_code;

  /**
   * {i18n>CurrencyCode.Description}
   */
  currency_code : String(3);
  invoicetype : String(2);
  custdiscount_perc : String(3);
  airportfee_perc : String(3);
  gstvat_perc : String(3);
  surcharge_perc : String(3);
  consumptiontax_perc : String(3);
};

entity TripService.cockpitTripsActuals {
  aufnr : String(23);
  zztailno : String(8);
  zzflightno : String(4);
  zzaircrafttype : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzcarriercode : Association to one TripService.carriers on zzcarriercode.code = zzcarriercode_code;
  zzcarriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  zzsupcarriercode : Association to one TripService.carriers on zzsupcarriercode.code = zzsupcarriercode_code;
  zzsupcarriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  zzsupcarriercode2 : Association to one TripService.carriers on zzsupcarriercode2.code = zzsupcarriercode2_code;
  zzsupcarriercode2_code : String(2);
  zzscheddeptdate : Date;
  zzscheddepttime : Time;
  zzschedarrdate : Date;
  zzschedarrtime : Time;

  /**
   * Please add an ON condition
   * 
   */
  zzscheddeptapt : Association to one TripService.airportsCodes on zzscheddeptapt.code = zzscheddeptapt_code;
  zzscheddeptapt_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzschedarrapt : Association to one TripService.airportsCodes on zzschedarrapt.code = zzschedarrapt_code;
  zzschedarrapt_code : String(3);
  zzschedarrts : Decimal(15);
  zzscheddeptts : Decimal(15);
  zzcfpno1 : String(10);

  /**
   * Please add an ON condition
   * 
   */
  zzlegstate : Association to one TripService.legstates on zzlegstate.code = zzlegstate_code;
  zzlegstate_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzorigin : Association to one TripService.airportsCodes on zzorigin.code = zzorigin_code;
  zzorigin_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzdestination : Association to one TripService.airportsCodes on zzdestination.code = zzdestination_code;
  zzdestination_code : String(3);
  zzrealscheddept : Date;
  user_creation_timestamp : Decimal(15);
  intf_creation_timestamp : Decimal(15);
  pax_user_creation_ts : Decimal(15);
  pax_intf_creation_ts : Decimal(15);
};

entity TripService.carriers {
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

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.carriers_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.carriers_texts on localized.code = code;
  key IsActiveEntity : Boolean;
  HasActiveEntity : Boolean;
  HasDraftEntity : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  DraftAdministrativeData : Association to one TripService.DraftAdministrativeData {  };

  /**
   * Please add an ON condition
   * 
   */
  SiblingEntity : Association to one TripService.carriers {  };
} actions {
  action draftPrepare(
    SideEffectsQualifier : LargeString
  ) returns TripService.carriers;
  action draftActivate() returns TripService.carriers;
  action draftEdit(
    PreserveChanges : Boolean
  ) returns TripService.carriers;
};

entity TripService.airports {
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

  /**
   * Please add an ON condition
   * 
   */
  aptcd : Association to one TripService.airportsCodes on aptcd.code = aptcd_code;
  aptcd_code : String(3);
  aptcd_icao : String(4);
  online_ind : Boolean;
  company_ind : Boolean;
  fo_po_days : Integer;

  /**
   * Please add an ON condition
   * {i18n>CountryCode.Description}
   */
  country_code : Association to one TripService.countries_spec on country_code.code = country_code_code;

  /**
   * {i18n>CountryCode.Description}
   */
  country_code_code : String(3);
  ekgrp : String(3);

  /**
   * Please add an ON condition
   * 
   */
  catloadstat : Association to one TripService.loadingStationCodes on catloadstat.code = catloadstat_code;
  catloadstat_code : String(2);
  catgroundime : String(4);
  lat_coord : Decimal(16, 14);
  lon_coord : Decimal(16, 14);

  /**
   * Please add an ON condition
   * 
   */
  lat_coord_sign : Association to one TripService.coord_signs on lat_coord_sign.code = lat_coord_sign_code;
  lat_coord_sign_code : String(1);

  /**
   * Please add an ON condition
   * 
   */
  lon_coord_sign : Association to one TripService.coord_signs on lon_coord_sign.code = lon_coord_sign_code;
  lon_coord_sign_code : String(1);
  key IsActiveEntity : Boolean;
  HasActiveEntity : Boolean;
  HasDraftEntity : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  DraftAdministrativeData : Association to one TripService.DraftAdministrativeData {  };

  /**
   * Please add an ON condition
   * 
   */
  SiblingEntity : Association to one TripService.airports {  };
} actions {
  action draftPrepare(
    SideEffectsQualifier : LargeString
  ) returns TripService.airports;
  action draftActivate() returns TripService.airports;
  action draftEdit(
    PreserveChanges : Boolean
  ) returns TripService.airports;
};

entity TripService.legstates {
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
  ID : UUID;
  key code : String(3);
  stonr : String(2);
  finalLegstate : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.legstates_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.legstates_texts on localized.code = code;
  key IsActiveEntity : Boolean;
  HasActiveEntity : Boolean;
  HasDraftEntity : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  DraftAdministrativeData : Association to one TripService.DraftAdministrativeData {  };

  /**
   * Please add an ON condition
   * 
   */
  SiblingEntity : Association to one TripService.legstates {  };
} actions {
  action draftPrepare(
    SideEffectsQualifier : LargeString
  ) returns TripService.legstates;
  action draftActivate() returns TripService.legstates;
  action draftEdit(
    PreserveChanges : Boolean
  ) returns TripService.legstates;
};

entity TripService.languages_spec {
  name : String(255);
  descr : String(1000);
  key code : String(14);

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.languages_spec_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.languages_spec_texts on localized.code = code;
  key IsActiveEntity : Boolean;
  HasActiveEntity : Boolean;
  HasDraftEntity : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  DraftAdministrativeData : Association to one TripService.DraftAdministrativeData {  };

  /**
   * Please add an ON condition
   * 
   */
  SiblingEntity : Association to one TripService.languages_spec {  };
} actions {
  action draftPrepare(
    SideEffectsQualifier : LargeString
  ) returns TripService.languages_spec;
  action draftActivate() returns TripService.languages_spec;
  action draftEdit(
    PreserveChanges : Boolean
  ) returns TripService.languages_spec;
};

entity TripService.countries_spec {
  name : String(255);
  descr : String(1000);
  key code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.countries_spec_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.countries_spec_texts on localized.code = code;
  key IsActiveEntity : Boolean;
  HasActiveEntity : Boolean;
  HasDraftEntity : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  DraftAdministrativeData : Association to one TripService.DraftAdministrativeData {  };

  /**
   * Please add an ON condition
   * 
   */
  SiblingEntity : Association to one TripService.countries_spec {  };
} actions {
  action draftPrepare(
    SideEffectsQualifier : LargeString
  ) returns TripService.countries_spec;
  action draftActivate() returns TripService.countries_spec;
  action draftEdit(
    PreserveChanges : Boolean
  ) returns TripService.countries_spec;
};

entity TripService.currencies_spec {
  name : String(255);
  descr : String(1000);
  key code : String(3);
  symbol : String(5);

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.currencies_spec_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.currencies_spec_texts on localized.code = code;
  key IsActiveEntity : Boolean;
  HasActiveEntity : Boolean;
  HasDraftEntity : Boolean;

  /**
   * Please add an ON condition
   * 
   */
  DraftAdministrativeData : Association to one TripService.DraftAdministrativeData {  };

  /**
   * Please add an ON condition
   * 
   */
  SiblingEntity : Association to one TripService.currencies_spec {  };
} actions {
  action draftPrepare(
    SideEffectsQualifier : LargeString
  ) returns TripService.currencies_spec;
  action draftActivate() returns TripService.currencies_spec;
  action draftEdit(
    PreserveChanges : Boolean
  ) returns TripService.currencies_spec;
};

entity TripService.cockpitTrips {
  aufnr : String(23);
  zztailno : String(8);
  zzflightno : String(4);
  zzaircrafttype : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzcarriercode : Association to one TripService.carriers on zzcarriercode.code = zzcarriercode_code;
  zzcarriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  zzsupcarriercode : Association to one TripService.carriers on zzsupcarriercode.code = zzsupcarriercode_code;
  zzsupcarriercode_code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  zzsupcarriercode2 : Association to one TripService.carriers on zzsupcarriercode2.code = zzsupcarriercode2_code;
  zzsupcarriercode2_code : String(2);
  zzscheddeptdate : Date;
  zzscheddepttime : Time;
  zzschedarrdate : Date;
  zzschedarrtime : Time;

  /**
   * Please add an ON condition
   * 
   */
  zzscheddeptapt : Association to one TripService.airportsCodes on zzscheddeptapt.code = zzscheddeptapt_code;
  zzscheddeptapt_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzschedarrapt : Association to one TripService.airportsCodes on zzschedarrapt.code = zzschedarrapt_code;
  zzschedarrapt_code : String(3);
  zzschedarrts : Decimal(15);
  zzscheddeptts : Decimal(15);
  zzcfpno1 : String(10);

  /**
   * Please add an ON condition
   * 
   */
  zzlegstate : Association to one TripService.legstates on zzlegstate.code = zzlegstate_code;
  zzlegstate_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzorigin : Association to one TripService.airportsCodes on zzorigin.code = zzorigin_code;
  zzorigin_code : String(3);

  /**
   * Please add an ON condition
   * 
   */
  zzdestination : Association to one TripService.airportsCodes on zzdestination.code = zzdestination_code;
  zzdestination_code : String(3);
  zzrealscheddept : Date;
  user_creation_timestamp : Decimal(15);
  intf_creation_timestamp : Decimal(15);
  pax_user_creation_ts : Decimal(15);
  pax_intf_creation_ts : Decimal(15);
};

entity TripService.airportsCodes {
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

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.airportsCodes_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.airportsCodes_texts on localized.code = code;
};

entity TripService.loadingStationCodes {
  name : String(255);
  descr : String(1000);
  key code : String(2);

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.loadingStationCodes_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.loadingStationCodes_texts on localized.code = code;
};

entity TripService.coord_signs {
  name : String(255);
  descr : String(1000);
  key code : String(1);

  /**
   * Please add an ON condition
   * 
   */
  texts : Association to many TripService.coord_signs_texts {  };

  /**
   * Please add an ON condition
   * 
   */
  localized : Association to one TripService.coord_signs_texts on localized.code = code;
};

entity TripService.DraftAdministrativeData {
  key DraftUUID : UUID;
  CreationDateTime : Timestamp;
  CreatedByUser : String(256);
  DraftIsCreatedByMe : Boolean;
  LastChangeDateTime : Timestamp;
  LastChangedByUser : String(256);
  InProcessByUser : String(256);
  DraftIsProcessedByMe : Boolean;
};

entity TripService.Languages_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(14);
};

entity TripService.carriers_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(2);
};

entity TripService.legstates_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(3);
};

entity TripService.languages_spec_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(14);
};

entity TripService.countries_spec_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(3);
};

entity TripService.currencies_spec_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(3);
};

entity TripService.airportsCodes_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(3);
};

entity TripService.loadingStationCodes_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(2);
};

entity TripService.coord_signs_texts {
  key locale : String(14);
  name : String(255);
  descr : String(1000);
  key code : String(1);
};

@cds.external : true
service TripService {};

