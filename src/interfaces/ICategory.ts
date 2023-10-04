export interface ICategory {
    name: string,
    hasArrow: boolean,
    opened?: Array<IOpenedCategory>;
}

export interface IOpenedCategory {
    name: string,
}