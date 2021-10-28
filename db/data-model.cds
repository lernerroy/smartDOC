namespace my.smartdoc;
using { TripService } from '../srv/external/cat-service';
//using { PlantService } from '../srv/external/plant';

type airportsCode : Association to TripService.airportsCodes;

entity airports_enh {
    key airport : airportsCode; //Association to one TripService.airportsCodes on airport.code = airport;
    //key airport : TripService.airportsCodes.airport_enh;
    plant  : String(4); //PlantService.werks;
}

entity carriers_enh {
    key carrier_code        : Integer;
    companyCode             : String(4);
    mainWorkCenter          : String(8);
    orderType               : String(4);
    awbOrderType            : String(4);
    purchaseOrganization    : String(4);
    plant                   : String(4);
    materialGroup           : String(9);
    purchasingGroup         : String(3);
    controlKey              : String(4);
    profitCenter            : String(10);
}
