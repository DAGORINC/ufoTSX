export interface IPromotionalFurniture {
    _id: string,
    name: string,
    description: string | null,
    price: number | null,
    width: number | null,
    depth: number | null,
    height: number | null,
    crossed: number | null,
    isPriceVissible: boolean | null,
    image: string
}