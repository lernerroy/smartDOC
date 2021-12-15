using com.legstate.smartdoc as smartdoc 
    from '../db/data-model';



@path : '/browse'
@impl : './AirportProfile-Service.js'
service smartDOCService { 
    
    entity PurHeader
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.PurHeader;

    entity Airports
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])    
    as projection on smartdoc.Airports;

    entity Carriers
    // @(restrict: [ { grant: ['*'], to: ['Admin','User']},
    //              { grant: ['READ'], to: ['API_user']}])
    as projection on smartdoc.Carriers;

};