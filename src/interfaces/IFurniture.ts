export interface IFurniture {
    '_id': string,
    'name': string,
    'producer': string,
    'partCollection': string | null,
    'price': number | null,
    'width': number | null,
    'depth': number | null,
    'height': number | null,
    'crossed': number | null,
    'isPriceVissible': boolean,
    'designedForTheLivingRoom': boolean,
    'designedForTheKitchen': boolean,
    'designedForTheBedroom': boolean,
    'designedForTheOffice': boolean,
    'designedForTheYouthRoom': boolean,
    'designedForTheHallway': boolean,
    'designedForTheChildrensRoom': boolean,
    'designedForTheBathroom': boolean,
    'categories': string | null,
    'image': string,
    'description': string | null,
}