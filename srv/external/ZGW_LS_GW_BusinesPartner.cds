/* checksum : e3a0f959b4cdf9edd5a06a645deabe03 */
@cds.external : true
service API_BUSINESS_PARTNER {};

@cds.persistence.skip : true
@sap.label : 'Email Address'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_AddressEmailAddress {
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  key Person : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sequence Number'
  key OrdinalNumber : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Standard addr.'
  IsDefaultEmailAddress : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'E-Mail Address'
  EmailAddress : String(241);
  @sap.unicode : 'false'
  @sap.label : 'E-Mail Address'
  SearchEmailAddress : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Notes'
  AddressCommunicationRemarkText : String(50);
};

@cds.persistence.skip : true
@sap.label : 'Fax Number'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_AddressFaxNumber {
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  key Person : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sequence Number'
  key OrdinalNumber : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Standard No.'
  IsDefaultFaxNumber : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Country/Region'
  FaxCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Fax'
  FaxNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Extension'
  FaxNumberExtension : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Fax number'
  InternationalFaxNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Notes'
  AddressCommunicationRemarkText : String(50);
};

@cds.persistence.skip : true
@sap.label : 'Home Page URL'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_AddressHomePageURL {
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  key Person : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sequence Number'
  key OrdinalNumber : String(3);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'from'
  key ValidityStartDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Standard addr.'
  key IsDefaultURLAddress : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'URI address'
  SearchURLAddress : String(50);
  @sap.unicode : 'false'
  @sap.label : 'Notes'
  AddressCommunicationRemarkText : String(50);
  @sap.unicode : 'false'
  @sap.label : 'URI length'
  URLFieldLength : Integer;
  @sap.unicode : 'false'
  @sap.label : 'URI'
  WebsiteURL : String(2048);
};

@cds.persistence.skip : true
@sap.label : 'Phone Number'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_AddressPhoneNumber {
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  key Person : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sequence Number'
  key OrdinalNumber : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Country/Region'
  DestinationLocationCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Standard No.'
  IsDefaultPhoneNumber : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Telephone'
  PhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Extension'
  PhoneNumberExtension : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Telephone number'
  InternationalPhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Mobile phone'
  PhoneNumberType : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Notes'
  AddressCommunicationRemarkText : String(50);
};

@cds.persistence.skip : true
@sap.label : 'Contact Person Address'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BPContactToAddress {
  @sap.unicode : 'false'
  @sap.label : 'BP Relationship No.'
  key RelationshipNumber : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartnerCompany : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartnerPerson : String(10);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  key ValidityEndDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  AddressNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Street 3'
  AdditionalStreetPrefixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Street 5'
  AdditionalStreetSuffixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Time zone'
  AddressTimeZone : String(6);
  @sap.unicode : 'false'
  @sap.label : 'c/o'
  CareOfName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'City Code'
  CityCode : String(12);
  @sap.unicode : 'false'
  @sap.label : 'City'
  CityName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Company Postal Code'
  CompanyPostalCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Country/Region Key'
  Country : String(3);
  @sap.unicode : 'false'
  @sap.label : 'County'
  County : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Delivery Service No.'
  DeliveryServiceNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Delvry Serv Type'
  DeliveryServiceTypeCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'District'
  District : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Title'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FormOfAddress : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Full Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FullName : String(80);
  @sap.unicode : 'false'
  @sap.label : 'Different City'
  HomeCityName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'House Number'
  HouseNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Supplement'
  HouseNumberSupplementText : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Language Key'
  Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'PO Box'
  POBox : String(10);
  @sap.unicode : 'false'
  @sap.label : 'PO Box City'
  POBoxDeviatingCityName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'PO Box Ctry/Region'
  POBoxDeviatingCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'PO Box Region'
  POBoxDeviatingRegion : String(3);
  @sap.unicode : 'false'
  @sap.label : 'PO Box w/o No.'
  POBoxIsWithoutNumber : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'PO Box Lobby'
  POBoxLobbyName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'PO Box Postal Code'
  POBoxPostalCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Person : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Postal Code'
  PostalCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Comm. Method'
  PrfrdCommMediumType : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Region'
  Region : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Street'
  StreetName : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Street 2'
  StreetPrefixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Street 4'
  StreetSuffixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Tax Jurisdiction'
  TaxJurisdiction : String(15);
  @sap.unicode : 'false'
  @sap.label : 'Transportation Zone'
  TransportZone : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Address Version'
  AddressRepresentationCode : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Function'
  ContactRelationshipFunction : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Department'
  ContactRelationshipDepartment : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Floor'
  Floor : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Building code'
  ContactPersonBuilding : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Room Number'
  RoomNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Comm. Method'
  ContactPersonPrfrdCommMedium : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Short name'
  CorrespondenceShortName : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Internal mail'
  InhouseMail : String(10);
  @cds.ambiguous : 'missing on condition?'
  to_EmailAddress : Association to many API_BUSINESS_PARTNER.A_AddressEmailAddress {  };
  @cds.ambiguous : 'missing on condition?'
  to_FaxNumber : Association to many API_BUSINESS_PARTNER.A_AddressFaxNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_MobilePhoneNumber : Association to many API_BUSINESS_PARTNER.A_AddressPhoneNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_PhoneNumber : Association to many API_BUSINESS_PARTNER.A_AddressPhoneNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_URLAddress : Association to many API_BUSINESS_PARTNER.A_AddressHomePageURL {  };
};

@cds.persistence.skip : true
@sap.label : 'Function and Department'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BPContactToFuncAndDept {
  @sap.unicode : 'false'
  @sap.label : 'BP Relationship No.'
  key RelationshipNumber : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartnerCompany : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartnerPerson : String(10);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  key ValidityEndDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Function'
  ContactPersonFunction : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Department'
  ContactPersonDepartment : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Telephone'
  PhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Extension'
  PhoneNumberExtension : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Fax'
  FaxNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Extension'
  FaxNumberExtension : String(10);
  @sap.unicode : 'false'
  @sap.label : 'E-Mail Address'
  EmailAddress : String(241);
  @sap.unicode : 'false'
  @sap.label : 'Relationship Cat.'
  RelationshipCategory : String(6);
};

@cds.persistence.skip : true
@sap.label : 'Address Usage'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BuPaAddressUsage {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  key ValidityEndDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Address Type'
  key AddressUsage : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  ValidityStartDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Standard Usage'
  StandardUsage : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Identification'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BuPaIdentification {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Identification Type'
  key BPIdentificationType : String(6);
  @sap.unicode : 'false'
  @sap.label : 'ID number'
  key BPIdentificationNumber : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Responsible Institn'
  BPIdnNmbrIssuingInstitute : String(40);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Entry date'
  BPIdentificationEntryDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Country/Region'
  Country : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Region'
  Region : String(3);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid from'
  ValidityStartDate : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  ValidityEndDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Industry'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BuPaIndustry {
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  key IndustrySector : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry System'
  key IndustrySystemType : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Standard Industry'
  IsStandardIndustry : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Description'
  IndustryKeyDescription : String(100);
};

@cds.persistence.skip : true
@sap.label : 'Business Partner'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BusinessPartner {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Academic Title 1'
  AcademicTitle : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'BP Category'
  BusinessPartnerCategory : String(1);
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BusinessPartnerFullName : String(81);
  @sap.unicode : 'false'
  @sap.label : 'Grouping'
  BusinessPartnerGrouping : String(4);
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BusinessPartnerName : String(81);
  @sap.unicode : 'false'
  @sap.label : 'BP GUID'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BusinessPartnerUUID : UUID;
  @sap.unicode : 'false'
  @sap.label : 'Correspondence lang.'
  CorrespondenceLanguage : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Created by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Created at'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'First Name'
  FirstName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Title'
  FormOfAddress : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Industry sector'
  Industry : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Int. location no. 1'
  InternationalLocationNumber1 : String(7);
  @sap.unicode : 'false'
  @sap.label : 'Int. location no. 2'
  InternationalLocationNumber2 : String(5);
  @sap.unicode : 'false'
  @sap.label : 'Female'
  IsFemale : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Male'
  IsMale : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Natural Person'
  IsNaturalPerson : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Unknown'
  IsSexUnknown : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Sex'
  GenderCodeName : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  Language : String(2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Changed on'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Changed at'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangeTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Changed by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  LastChangedByUser : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Last Name'
  LastName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Legal form'
  LegalForm : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Name 1'
  OrganizationBPName1 : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Name 2'
  OrganizationBPName2 : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Name 3'
  OrganizationBPName3 : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Name 4'
  OrganizationBPName4 : String(40);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Date founded'
  OrganizationFoundationDate : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Liquidation date'
  OrganizationLiquidationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Search Term 1'
  SearchTerm1 : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Search Term 2'
  SearchTerm2 : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Other Last Name'
  AdditionalLastName : String(40);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Date of Birth'
  BirthDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Birth Date Status'
  BusinessPartnerBirthDateStatus : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Birthplace'
  BusinessPartnerBirthplaceName : String(40);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Death date'
  BusinessPartnerDeathDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Central Block'
  BusinessPartnerIsBlocked : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'BP Type'
  BusinessPartnerType : String(4);
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ETag : String(26);
  @sap.unicode : 'false'
  @sap.label : 'Name 1'
  GroupBusinessPartnerName1 : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Name 2'
  GroupBusinessPartnerName2 : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  IndependentAddressID : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Check digit'
  InternationalLocationNumber3 : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Middle Name'
  MiddleName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Ctry/Reg. for Format'
  NameCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Name Format'
  NameFormat : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Full Name'
  PersonFullName : String(80);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  PersonNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Archiving Flag'
  IsMarkedForArchiving : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'External BP Number'
  BusinessPartnerIDByExtSystem : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Trading Partner No.'
  TradingPartner : String(6);
  @cds.ambiguous : 'missing on condition?'
  to_BuPaIdentification : Association to many API_BUSINESS_PARTNER.A_BuPaIdentification {  };
  @cds.ambiguous : 'missing on condition?'
  to_BuPaIndustry : Association to many API_BUSINESS_PARTNER.A_BuPaIndustry {  };
  @cds.ambiguous : 'missing on condition?'
  to_BusinessPartnerAddress : Association to many API_BUSINESS_PARTNER.A_BusinessPartnerAddress {  };
  @cds.ambiguous : 'missing on condition?'
  to_BusinessPartnerBank : Association to many API_BUSINESS_PARTNER.A_BusinessPartnerBank {  };
  @cds.ambiguous : 'missing on condition?'
  to_BusinessPartnerContact : Association to many API_BUSINESS_PARTNER.A_BusinessPartnerContact {  };
  @cds.ambiguous : 'missing on condition?'
  to_BusinessPartnerRole : Association to many API_BUSINESS_PARTNER.A_BusinessPartnerRole {  };
  @cds.ambiguous : 'missing on condition?'
  to_BusinessPartnerTax : Association to many API_BUSINESS_PARTNER.A_BusinessPartnerTaxNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_Customer : Association to API_BUSINESS_PARTNER.A_Customer {  };
  @cds.ambiguous : 'missing on condition?'
  to_Supplier : Association to API_BUSINESS_PARTNER.A_Supplier {  };
};

@cds.persistence.skip : true
@sap.label : 'Address'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BusinessPartnerAddress {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Address Number'
  key AddressID : String(10);
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  ValidityStartDate : DateTime;
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  ValidityEndDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'GUID of a Business Partner Address'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  AddressUUID : UUID;
  @sap.unicode : 'false'
  @sap.label : 'Street 3'
  AdditionalStreetPrefixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Street 5'
  AdditionalStreetSuffixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Time zone'
  AddressTimeZone : String(6);
  @sap.unicode : 'false'
  @sap.label : 'c/o'
  CareOfName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'City Code'
  CityCode : String(12);
  @sap.unicode : 'false'
  @sap.label : 'City'
  CityName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Company Postal Code'
  CompanyPostalCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Country/Region Key'
  Country : String(3);
  @sap.unicode : 'false'
  @sap.label : 'County'
  County : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Delivery Service No.'
  DeliveryServiceNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Delvry Serv Type'
  DeliveryServiceTypeCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'District'
  District : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Title'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FormOfAddress : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Full Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  FullName : String(80);
  @sap.unicode : 'false'
  @sap.label : 'Different City'
  HomeCityName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'House Number'
  HouseNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Supplement'
  HouseNumberSupplementText : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Language Key'
  Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'PO Box'
  POBox : String(10);
  @sap.unicode : 'false'
  @sap.label : 'PO Box City'
  POBoxDeviatingCityName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'PO Box Ctry/Region'
  POBoxDeviatingCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'PO Box Region'
  POBoxDeviatingRegion : String(3);
  @sap.unicode : 'false'
  @sap.label : 'PO Box w/o No.'
  POBoxIsWithoutNumber : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'PO Box Lobby'
  POBoxLobbyName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'PO Box Postal Code'
  POBoxPostalCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Person Number'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Person : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Postal Code'
  PostalCode : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Comm. Method'
  PrfrdCommMediumType : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Region'
  Region : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Street'
  StreetName : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Street 2'
  StreetPrefixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Street 4'
  StreetSuffixName : String(40);
  @sap.unicode : 'false'
  @sap.label : 'Tax Jurisdiction'
  TaxJurisdiction : String(15);
  @sap.unicode : 'false'
  @sap.label : 'Transportation Zone'
  TransportZone : String(10);
  @sap.unicode : 'false'
  @sap.label : 'External Address No.'
  AddressIDByExternalSystem : String(20);
  @sap.unicode : 'false'
  @sap.label : 'County code'
  CountyCode : String(8);
  @sap.unicode : 'false'
  @sap.label : 'Township code'
  TownshipCode : String(8);
  @sap.unicode : 'false'
  @sap.label : 'Township'
  TownshipName : String(40);
  @cds.ambiguous : 'missing on condition?'
  to_AddressUsage : Association to many API_BUSINESS_PARTNER.A_BuPaAddressUsage {  };
  @cds.ambiguous : 'missing on condition?'
  to_EmailAddress : Association to many API_BUSINESS_PARTNER.A_AddressEmailAddress {  };
  @cds.ambiguous : 'missing on condition?'
  to_FaxNumber : Association to many API_BUSINESS_PARTNER.A_AddressFaxNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_MobilePhoneNumber : Association to many API_BUSINESS_PARTNER.A_AddressPhoneNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_PhoneNumber : Association to many API_BUSINESS_PARTNER.A_AddressPhoneNumber {  };
  @cds.ambiguous : 'missing on condition?'
  to_URLAddress : Association to many API_BUSINESS_PARTNER.A_AddressHomePageURL {  };
};

@cds.persistence.skip : true
@sap.label : 'Bank'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BusinessPartnerBank {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Bank details ID'
  key BankIdentification : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Bank Country/Region'
  BankCountryKey : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Bank name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  BankName : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Bank Key'
  BankNumber : String(15);
  @sap.unicode : 'false'
  @sap.label : 'SWIFT/BIC'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SWIFTCode : String(11);
  @sap.unicode : 'false'
  @sap.label : 'Bank Control Key'
  BankControlKey : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Account Holder'
  BankAccountHolderName : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Account Name'
  BankAccountName : String(40);
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  ValidityStartDate : DateTime;
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  ValidityEndDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'IBAN'
  IBAN : String(34);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'IBAN valid from'
  IBANValidityStartDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Bank acct'
  BankAccount : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Reference Details'
  BankAccountReferenceText : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Collect.author.'
  CollectionAuthInd : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'City'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CityName : String(35);
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Contact'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BusinessPartnerContact {
  @sap.unicode : 'false'
  @sap.label : 'BP Relationship No.'
  key RelationshipNumber : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartnerCompany : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartnerPerson : String(10);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  key ValidityEndDate : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  ValidityStartDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Standard'
  IsStandardRelationship : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Relationship Cat.'
  RelationshipCategory : String(6);
  @cds.ambiguous : 'missing on condition?'
  to_ContactAddress : Association to many API_BUSINESS_PARTNER.A_BPContactToAddress {  };
  @cds.ambiguous : 'missing on condition?'
  to_ContactRelationship : Association to API_BUSINESS_PARTNER.A_BPContactToFuncAndDept {  };
};

@cds.persistence.skip : true
@sap.label : 'Role'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BusinessPartnerRole {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'BP Role'
  key BusinessPartnerRole : String(6);
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid From'
  ValidFrom : DateTime;
  @odata.type : 'Edm.DateTimeOffset'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Valid To'
  ValidTo : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Tax Number'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_BusinessPartnerTaxNumber {
  @sap.unicode : 'false'
  @sap.label : 'Business Partner'
  key BusinessPartner : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number Category'
  key BPTaxType : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Tax number'
  BPTaxNumber : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number'
  BPTaxLongNumber : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Customer'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_Customer {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Billing block'
  BillingIsBlockedForCustomer : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Created by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  CustomerAccountGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Customer Classific.'
  CustomerClassification : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Customer Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CustomerFullName : String(220);
  @sap.unicode : 'false'
  @sap.label : 'Name of Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CustomerName : String(80);
  @sap.unicode : 'false'
  @sap.label : 'Delivery block'
  DeliveryIsBlocked : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Natural Person'
  NFPartnerIsNaturalPerson : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Order block'
  OrderIsBlockedForCustomer : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Posting Block'
  PostingIsBlocked : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Group key'
  CustomerCorporateGroup : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Fiscal address'
  FiscalAddress : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Industry : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Industry code 1'
  IndustryCode1 : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry code 2'
  IndustryCode2 : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry code 3'
  IndustryCode3 : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry code 4'
  IndustryCode4 : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry code 5'
  IndustryCode5 : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Int. location no. 1'
  InternationalLocationNumber1 : String(7);
  @sap.unicode : 'false'
  @sap.label : 'Nielsen indicator'
  NielsenRegion : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Tax Type'
  ResponsibleType : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 1'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber1 : String(16);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 2'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber2 : String(11);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 3'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber3 : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 4'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber4 : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 5'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber5 : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Tax number type'
  TaxNumberType : String(2);
  @sap.unicode : 'false'
  @sap.label : 'VAT Registration No.'
  VATRegistration : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Deletion flag'
  DeletionIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Express station'
  ExpressTrainStationName : String(25);
  @sap.unicode : 'false'
  @sap.label : 'Train station'
  TrainStationName : String(25);
  @sap.unicode : 'false'
  @sap.label : 'City Code'
  CityCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'County Code'
  County : String(3);
  @cds.ambiguous : 'missing on condition?'
  to_CustomerCompany : Association to many API_BUSINESS_PARTNER.A_CustomerCompany {  };
  @cds.ambiguous : 'missing on condition?'
  to_CustomerSalesArea : Association to many API_BUSINESS_PARTNER.A_CustomerSalesArea {  };
  @cds.ambiguous : 'missing on condition?'
  to_CustomerTaxGrouping : Association to many API_BUSINESS_PARTNER.A_CustomerTaxGrouping {  };
  @cds.ambiguous : 'missing on condition?'
  to_CustomerText : Association to many API_BUSINESS_PARTNER.A_CustomerText {  };
  @cds.ambiguous : 'missing on condition?'
  to_CustomerUnloadingPoint : Association to many API_BUSINESS_PARTNER.A_CustomerUnloadingPoint {  };
};

@cds.persistence.skip : true
@sap.label : 'Customer Company'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerCompany {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Tolerance Group'
  APARToleranceGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Account at customer'
  AccountByCustomer : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Clerk Abbrev.'
  AccountingClerk : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Acctg clerk''s fax'
  AccountingClerkFaxNumber : String(31);
  @sap.unicode : 'false'
  @sap.label : 'Clrk''s internet add.'
  AccountingClerkInternetAddress : String(130);
  @sap.unicode : 'false'
  @sap.label : 'Acct.clerks tel.no.'
  AccountingClerkPhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Alternative payer'
  AlternativePayerAccount : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Coll.Invoice Variant'
  CollectiveInvoiceVariant : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Account Memo'
  CustomerAccountNote : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Head office'
  CustomerHeadOffice : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Clearing with vendor'
  CustomerSupplierClearingIsUsed : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'House Bank'
  HouseBank : String(5);
  @sap.unicode : 'false'
  @sap.label : 'Interest indicator'
  InterestCalculationCode : String(2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Last Key Date'
  InterestCalculationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Int.Calc.Freq.'
  IntrstCalcFrequencyInMonths : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Local Processing'
  IsToBeLocallyProcessed : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Individual Payment'
  ItemIsToBePaidSeparately : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Sort key'
  LayoutSortingRule : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Payment Block'
  PaymentBlockingReason : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Payment Methods'
  PaymentMethodsList : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Payment Terms'
  PaymentTerms : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Pmnt advice by EDI'
  PaytAdviceIsSentbyEDI : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Co.code post.block'
  PhysicalInventoryBlockInd : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Reconciliation acct'
  ReconciliationAccount : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Record pmnt history'
  RecordPaymentHistoryIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'User at customer'
  UserAtCustomer : String(15);
  @sap.unicode : 'false'
  @sap.label : 'Co.cde deletion flag'
  DeletionIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Planning Group'
  CashPlanningGroup : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Known/Negotiat.Leave'
  KnownOrNegotiatedLeave : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Value Adjustment'
  ValueAdjustmentKey : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  CustomerAccountGroup : String(4);
  @cds.ambiguous : 'missing on condition?'
  to_CompanyText : Association to many API_BUSINESS_PARTNER.A_CustomerCompanyText {  };
  @cds.ambiguous : 'missing on condition?'
  to_CustomerDunning : Association to many API_BUSINESS_PARTNER.A_CustomerDunning {  };
  @cds.ambiguous : 'missing on condition?'
  to_WithHoldingTax : Association to many API_BUSINESS_PARTNER.A_CustomerWithHoldingTax {  };
};

@cds.persistence.skip : true
@sap.label : 'Customer Company Text'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerCompanyText {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  key Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Text ID'
  key LongTextID : String(4);
  @sap.unicode : 'false'
  @sap.label : 'String'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : LargeString;
};

@cds.persistence.skip : true
@sap.label : 'Customer Dunning'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerDunning {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Area'
  key DunningArea : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Block'
  DunningBlock : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Level'
  DunningLevel : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Procedure'
  DunningProcedure : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Recipient'
  DunningRecipient : String(10);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Last Dunned'
  LastDunnedOn : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Legal Dunn.Proc.From'
  LegDunningProcedureOn : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Dunning Clerk'
  DunningClerk : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  CustomerAccountGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Sales Area'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerSalesArea {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sales Organization'
  key SalesOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Distribution Channel'
  key DistributionChannel : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Division'
  key Division : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Account at customer'
  AccountByCustomer : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Authorization Group'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'BBlock for SlsA'
  BillingIsBlockedForCustomer : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Complete Delivery'
  CompleteDeliveryIsDefined : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Currency'
  @sap.semantics : 'currency-code'
  Currency : String(5);
  @sap.unicode : 'false'
  @sap.label : 'ABC Classification'
  CustomerABCClassification : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Acct Assmt Grp Cust.'
  CustomerAccountAssignmentGroup : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group'
  CustomerGroup : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Payment Terms'
  CustomerPaymentTerms : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Customer Price Group'
  CustomerPriceGroup : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Cust.Pric.Procedure'
  CustomerPricingProcedure : String(2);
  @sap.unicode : 'false'
  @sap.label : 'DelBlckSalesAr.'
  DeliveryIsBlockedForCustomer : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Delivery Priority'
  DeliveryPriority : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms'
  IncotermsClassification : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms Version'
  IncotermsVersion : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.unicode : 'false'
  @sap.label : 'Del.ID SlsArea'
  DeletionIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Incoterms (Part 2)'
  IncotermsTransferLocation : String(28);
  @sap.unicode : 'false'
  @sap.label : 'Invoicing Dates'
  InvoiceDate : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Order Probability'
  ItemOrderProbabilityInPercent : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Order Combination'
  OrderCombinationIsAllowed : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Ord.blk:sls ar.'
  OrderIsBlockedForCustomer : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Part.dlv./item'
  PartialDeliveryIsAllowed : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Price List Type'
  PriceListType : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Sales Group'
  SalesGroup : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Sales Office'
  SalesOffice : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Shipping Conditions'
  ShippingCondition : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Delivering Plant'
  SupplyingPlant : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Sales District'
  SalesDistrict : String(6);
  @sap.unicode : 'false'
  @sap.label : 'Invoice List Sched.'
  InvoiceListSchedule : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Exchange Rate Type'
  ExchangeRateType : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group 1'
  AdditionalCustomerGroup1 : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group 2'
  AdditionalCustomerGroup2 : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group 3'
  AdditionalCustomerGroup3 : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group 4'
  AdditionalCustomerGroup4 : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Customer Group 5'
  AdditionalCustomerGroup5 : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Paymt guarant. proc.'
  PaymentGuaranteeProcedure : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  CustomerAccountGroup : String(4);
  @cds.ambiguous : 'missing on condition?'
  to_PartnerFunction : Association to many API_BUSINESS_PARTNER.A_CustSalesPartnerFunc {  };
  @cds.ambiguous : 'missing on condition?'
  to_SalesAreaTax : Association to many API_BUSINESS_PARTNER.A_CustomerSalesAreaTax {  };
  @cds.ambiguous : 'missing on condition?'
  to_SalesAreaText : Association to many API_BUSINESS_PARTNER.A_CustomerSalesAreaText {  };
};

@cds.persistence.skip : true
@sap.label : 'Sales Area Tax'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerSalesAreaTax {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sales Organization'
  key SalesOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'RefDistCh-Cust/Mat.'
  key DistributionChannel : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Division'
  key Division : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Departure Ctry/Reg.'
  key DepartureCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Tax Category'
  key CustomerTaxCategory : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Tax Classification'
  CustomerTaxClassification : String(1);
};

@cds.persistence.skip : true
@sap.label : 'Customer Sales Area Text'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerSalesAreaText {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sales Organization'
  key SalesOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Distribution Channel'
  key DistributionChannel : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Division'
  key Division : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  key Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Text ID'
  key LongTextID : String(4);
  @sap.unicode : 'false'
  @sap.label : 'String'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : LargeString;
};

@cds.persistence.skip : true
@sap.label : 'Customer Tax Grouping'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerTaxGrouping {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Tax Category'
  key CustomerTaxGroupingCode : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Exempt. Number'
  CustTaxGrpExemptionCertificate : String(15);
  @sap.unicode : 'false'
  @sap.label : 'Exemption Rate'
  CustTaxGroupExemptionRate : Decimal(5, 2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Exempted from'
  CustTaxGroupExemptionStartDate : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Exempted until'
  CustTaxGroupExemptionEndDate : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'subjected from'
  CustTaxGroupSubjectedStartDate : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'subjected until'
  CustTaxGroupSubjectedEndDate : DateTime;
};

@cds.persistence.skip : true
@sap.label : 'Customer Text'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerText {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  key Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Text ID'
  key LongTextID : String(4);
  @sap.unicode : 'false'
  @sap.label : 'String'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : LargeString;
};

@cds.persistence.skip : true
@sap.label : 'Customer Unloading Point'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerUnloadingPoint {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Unloading Point'
  key UnloadingPointName : String(25);
  @sap.unicode : 'false'
  @sap.label : 'Cust.fact.calendar'
  CustomerFactoryCalenderCode : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Goods receiving hrs'
  BPGoodsReceivingHoursCode : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Default unloading pt'
  IsDfltBPUnloadingPoint : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Monday'
  MondayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Monday'
  MondayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Monday'
  MondayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Monday'
  MondayAfternoonClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Tuesday'
  TuesdayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Tuesday'
  TuesdayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Tuesday'
  TuesdayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Tuesday'
  TuesdayAfternoonClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Wednesday'
  WednesdayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Wednesday'
  WednesdayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Wednesday'
  WednesdayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Wednesday'
  WednesdayAfternoonClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Thursday'
  ThursdayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Thursday'
  ThursdayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Thursday'
  ThursdayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Thursday'
  ThursdayAfternoonClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Friday'
  FridayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Friday'
  FridayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Friday'
  FridayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Friday'
  FridayAfternoonClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Saturday'
  SaturdayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Saturday'
  SaturdayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Saturday'
  SaturdayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Saturday'
  SaturdayAfternoonClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Sunday'
  SundayMorningOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Sunday'
  SundayMorningClosingTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Sunday'
  SundayAfternoonOpeningTime : Time;
  @sap.unicode : 'false'
  @sap.label : 'Sunday'
  SundayAfternoonClosingTime : Time;
};

@cds.persistence.skip : true
@sap.label : 'Withholding Tax'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustomerWithHoldingTax {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Withholding Tax Type'
  key WithholdingTaxType : String(2);
  @sap.unicode : 'false'
  @sap.label : 'W/Tax Code'
  WithholdingTaxCode : String(2);
  @sap.unicode : 'false'
  @sap.label : 'WTax Agent'
  WithholdingTaxAgent : Boolean;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'W/Tax Obligated Frm'
  ObligationDateBegin : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Oblig.to W/Tax Until'
  ObligationDateEnd : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'W/tax number'
  WithholdingTaxNumber : String(16);
  @sap.unicode : 'false'
  @sap.label : 'Exemption Number'
  WithholdingTaxCertificate : String(25);
  @sap.unicode : 'false'
  @sap.label : 'Exemption Rate'
  WithholdingTaxExmptPercent : Decimal(5, 2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Exemption Start Date'
  ExemptionDateBegin : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Exemption End Date'
  ExemptionDateEnd : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Exemption Reason'
  ExemptionReason : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Sales Partner Functions'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_CustSalesPartnerFunc {
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  key Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sales Organization'
  key SalesOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Distribution Channel'
  key DistributionChannel : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Division'
  key Division : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Partner counter'
  key PartnerCounter : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Partner Function'
  key PartnerFunction : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  BPCustomerNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Partner description'
  CustomerPartnerDescription : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Default Partner'
  DefaultPartner : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Personnel Number'
  PersonnelNumber : String(8);
  @sap.unicode : 'false'
  @sap.label : 'Contact Person'
  ContactPerson : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Supplier'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_Supplier {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Alternative Payee'
  AlternativePayeeAccountNumber : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Created by'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Customer'
  Customer : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Payment block'
  PaymentIsBlockedForSupplier : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Posting Block'
  PostingIsBlocked : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Purch. block'
  PurchasingIsBlocked : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  SupplierAccountGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Supplier Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SupplierFullName : String(220);
  @sap.unicode : 'false'
  @sap.label : 'Name of Supplier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  SupplierName : String(80);
  @sap.unicode : 'false'
  @sap.label : 'VAT Registration No.'
  VATRegistration : String(20);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Date of Birth'
  BirthDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Int. Location No.'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  ConcatenatedInternationalLocNo : String(20);
  @sap.unicode : 'false'
  @sap.label : 'Deletion flag'
  DeletionIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Fiscal address'
  FiscalAddress : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Industry'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  Industry : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Int. location no. 1'
  InternationalLocationNumber1 : String(7);
  @sap.unicode : 'false'
  @sap.label : 'Int. location no. 2'
  InternationalLocationNumber2 : String(5);
  @sap.unicode : 'false'
  @sap.label : 'Check digit'
  InternationalLocationNumber3 : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Natural Person'
  IsNaturalPerson : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Tax Type'
  ResponsibleType : String(2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'QM System Valid To'
  SuplrQltyInProcmtCertfnValidTo : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Actual QM System'
  SuplrQualityManagementSystem : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Group key'
  SupplierCorporateGroup : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Block Function'
  SupplierProcurementBlock : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 1'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber1 : String(16);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 2'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber2 : String(11);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 3'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber3 : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 4'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber4 : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number 5'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  TaxNumber5 : String(60);
  @sap.unicode : 'false'
  @sap.label : 'Tax Number'
  TaxNumberResponsible : String(18);
  @sap.unicode : 'false'
  @sap.label : 'Tax number type'
  TaxNumberType : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Relevant for POD'
  SuplrProofOfDelivRlvtCode : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Tax split'
  BR_TaxIsSplit : Boolean;
  @cds.ambiguous : 'missing on condition?'
  to_SupplierCompany : Association to many API_BUSINESS_PARTNER.A_SupplierCompany {  };
  @cds.ambiguous : 'missing on condition?'
  to_SupplierPurchasingOrg : Association to many API_BUSINESS_PARTNER.A_SupplierPurchasingOrg {  };
  @cds.ambiguous : 'missing on condition?'
  to_SupplierText : Association to many API_BUSINESS_PARTNER.A_SupplierText {  };
};

@cds.persistence.skip : true
@sap.label : 'Supplier Company'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierCompany {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Company Name'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CompanyCodeName : String(25);
  @sap.unicode : 'false'
  @sap.label : 'Payment Block'
  PaymentBlockingReason : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Co.code post.block'
  SupplierIsBlockedForPosting : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Clerk Abbrev.'
  AccountingClerk : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Acctg clerk''s fax'
  AccountingClerkFaxNumber : String(31);
  @sap.unicode : 'false'
  @sap.label : 'Acct.clerks tel.no.'
  AccountingClerkPhoneNumber : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Clerk at vendor'
  SupplierClerk : String(15);
  @sap.unicode : 'false'
  @sap.label : 'Clrk''s internet add.'
  SupplierClerkURL : String(130);
  @sap.unicode : 'false'
  @sap.label : 'Payment Methods'
  PaymentMethodsList : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Payment Terms'
  PaymentTerms : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Clearing with cust.'
  ClearCustomerSupplier : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Local Processing'
  IsToBeLocallyProcessed : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Individual Payment'
  ItemIsToBePaidSeparately : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Pmnt advice by EDI'
  PaymentIsToBeSentByEDI : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'House Bank'
  HouseBank : String(5);
  @sap.unicode : 'false'
  @sap.label : 'Check Cashing Time'
  CheckPaidDurationInDays : Decimal(3, 0);
  @sap.unicode : 'false'
  @sap.label : 'Currency'
  @sap.semantics : 'currency-code'
  Currency : String(5);
  @sap.unicode : 'false'
  @sap.unit : 'Currency'
  @sap.label : 'Bill/Ex. Limit'
  BillOfExchLmtAmtInCoCodeCrcy : Decimal(15, 3);
  @sap.unicode : 'false'
  @sap.label : 'Account with vendor'
  SupplierClerkIDBySupplier : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Reconciliation acct'
  ReconciliationAccount : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Interest indicator'
  InterestCalculationCode : String(2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Last Key Date'
  InterestCalculationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Int.Calc.Freq.'
  IntrstCalcFrequencyInMonths : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Head office'
  SupplierHeadOffice : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Alternative payee'
  AlternativePayee : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Sort key'
  LayoutSortingRule : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Tolerance Group'
  APARToleranceGroup : String(4);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Certification Date'
  SupplierCertificationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Account Memo'
  SupplierAccountNote : String(30);
  @sap.unicode : 'false'
  @sap.label : 'WTax C/R Key'
  WithholdingTaxCountry : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Co.cde deletion flag'
  DeletionIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Planning Group'
  CashPlanningGroup : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Check Double Invoice'
  IsToBeCheckedForDuplicates : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Minority Indicator'
  MinorityGroup : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  SupplierAccountGroup : String(4);
  @cds.ambiguous : 'missing on condition?'
  to_CompanyText : Association to many API_BUSINESS_PARTNER.A_SupplierCompanyText {  };
  @cds.ambiguous : 'missing on condition?'
  to_Supplier : Association to API_BUSINESS_PARTNER.A_Supplier {  };
  @cds.ambiguous : 'missing on condition?'
  to_SupplierDunning : Association to many API_BUSINESS_PARTNER.A_SupplierDunning {  };
  @cds.ambiguous : 'missing on condition?'
  to_SupplierWithHoldingTax : Association to many API_BUSINESS_PARTNER.A_SupplierWithHoldingTax {  };
};

@cds.persistence.skip : true
@sap.label : 'Supplier Company Text'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierCompanyText {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  key Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Text ID'
  key LongTextID : String(4);
  @sap.unicode : 'false'
  @sap.label : 'String'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : LargeString;
};

@cds.persistence.skip : true
@sap.label : 'Supplier Dunning'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierDunning {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Area'
  key DunningArea : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Block'
  DunningBlock : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Level'
  DunningLevel : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Dunning Procedure'
  DunningProcedure : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Dunn.recipient'
  DunningRecipient : String(10);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Last Dunned'
  LastDunnedOn : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Legal Dunn.Proc.From'
  LegDunningProcedureOn : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Dunning Clerk'
  DunningClerk : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  SupplierAccountGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Purchasing Partner Functions'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierPartnerFunc {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Purch. Organization'
  key PurchasingOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Supplier Subrange'
  key SupplierSubrange : String(6);
  @sap.unicode : 'false'
  @sap.label : 'Plant'
  key Plant : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Partner Function'
  key PartnerFunction : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Partner counter'
  key PartnerCounter : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Default Partner'
  DefaultPartner : Boolean;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Created On'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreationDate : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Created By'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  CreatedByUser : String(12);
  @sap.unicode : 'false'
  @sap.label : 'Ref. to suplr'
  ReferenceSupplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
};

@cds.persistence.skip : true
@sap.label : 'Purchasing Organization'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierPurchasingOrg {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Purch. Organization'
  key PurchasingOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Schema Grp, Supplier'
  CalculationSchemaGroupCode : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Del. flag POrg.'
  DeletionIndicator : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Incoterms'
  IncotermsClassification : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms (Part 2)'
  IncotermsTransferLocation : String(28);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms Version'
  IncotermsVersion : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms Location 1'
  IncotermsLocation1 : String(70);
  @sap.unicode : 'false'
  @sap.label : 'Incoterms Location 2'
  IncotermsLocation2 : String(70);
  @sap.unicode : 'false'
  @sap.label : 'GR-Based Inv. Verif.'
  InvoiceIsGoodsReceiptBased : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Planned Deliv. Time'
  MaterialPlannedDeliveryDurn : Decimal(3, 0);
  @sap.unicode : 'false'
  @sap.unit : 'PurchaseOrderCurrency'
  @sap.label : 'Minimum order value'
  MinimumOrderAmount : Decimal(15, 3);
  @sap.unicode : 'false'
  @sap.label : 'Payment Terms'
  PaymentTerms : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Pricing Date Control'
  PricingDateControl : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Automatic PO'
  PurOrdAutoGenerationIsAllowed : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Order currency'
  @sap.semantics : 'currency-code'
  PurchaseOrderCurrency : String(5);
  @sap.unicode : 'false'
  @sap.label : 'Purchasing Group'
  PurchasingGroup : String(3);
  @sap.unicode : 'false'
  @sap.label : 'Pur. block POrg'
  PurchasingIsBlockedForSupplier : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Shipping Conditions'
  ShippingCondition : String(2);
  @sap.unicode : 'false'
  @sap.label : 'ABC indicator'
  SupplierABCClassificationCode : String(1);
  @sap.unicode : 'false'
  @sap.label : 'Telephone'
  SupplierPhoneNumber : String(16);
  @sap.unicode : 'false'
  @sap.label : 'Salesperson'
  SupplierRespSalesPersonName : String(30);
  @sap.unicode : 'false'
  @sap.label : 'Confirmation Control'
  SupplierConfirmationControlKey : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Acknowledgment Reqd'
  IsOrderAcknRqd : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Account group'
  SupplierAccountGroup : String(4);
  @cds.ambiguous : 'missing on condition?'
  to_PartnerFunction : Association to many API_BUSINESS_PARTNER.A_SupplierPartnerFunc {  };
  @cds.ambiguous : 'missing on condition?'
  to_PurchasingOrgText : Association to many API_BUSINESS_PARTNER.A_SupplierPurchasingOrgText {  };
};

@cds.persistence.skip : true
@sap.label : 'Purchasing Organization Text'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierPurchasingOrgText {
  @sap.unicode : 'false'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Supplier : String(10);
  @sap.unicode : 'false'
  key PurchasingOrganization : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  key Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Text ID'
  key LongTextID : String(4);
  @sap.unicode : 'false'
  @sap.label : 'String'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : LargeString;
};

@cds.persistence.skip : true
@sap.label : 'Supplier Text'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierText {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  @sap.creatable : 'false'
  @sap.updatable : 'false'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Language'
  key Language : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Text ID'
  key LongTextID : String(4);
  @sap.unicode : 'false'
  @sap.label : 'String'
  @sap.sortable : 'false'
  @sap.filterable : 'false'
  LongText : LargeString;
};

@cds.persistence.skip : true
@sap.label : 'Company Withholding Tax'
@sap.content.version : '1'
entity API_BUSINESS_PARTNER.A_SupplierWithHoldingTax {
  @sap.unicode : 'false'
  @sap.label : 'Supplier'
  key Supplier : String(10);
  @sap.unicode : 'false'
  @sap.label : 'Company Code'
  key CompanyCode : String(4);
  @sap.unicode : 'false'
  @sap.label : 'Withholding Tax Type'
  key WithholdingTaxType : String(2);
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Exemption Start Date'
  ExemptionDateBegin : DateTime;
  @odata.type : 'Edm.DateTime'
  @odata.precision : 0
  @sap.unicode : 'false'
  @sap.label : 'Exemption End Date'
  ExemptionDateEnd : DateTime;
  @sap.unicode : 'false'
  @sap.label : 'Exemption Reason'
  ExemptionReason : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Subject to w/tx'
  IsWithholdingTaxSubject : Boolean;
  @sap.unicode : 'false'
  @sap.label : 'Recipient Type'
  RecipientType : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Exemption Number'
  WithholdingTaxCertificate : String(25);
  @sap.unicode : 'false'
  @sap.label : 'W/Tax Code'
  WithholdingTaxCode : String(2);
  @sap.unicode : 'false'
  @sap.label : 'Exemption Rate'
  WithholdingTaxExmptPercent : Decimal(5, 2);
  @sap.unicode : 'false'
  @sap.label : 'W/tax number'
  WithholdingTaxNumber : String(16);
  @sap.unicode : 'false'
  @sap.label : 'Authorization'
  AuthorizationGroup : String(4);
};

