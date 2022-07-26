export class Keyword {
    type!: number;
    keyword!: string;
    hasLocution!: boolean;
}

export class ArasaacPictogram {
    _id!: number;
    created!: Date;
    downloads!: number;
    tags!: string[];
    synsets!: string[];
    sex!: boolean;
    lastUpdated!: Date;
    schematic!: boolean;
    keywords!: Keyword[];
    desc!: string;
    categories!: string[];
    violence!: boolean;
    hair!: boolean;
    skin!: boolean;
    aac!: boolean;
    aacColor!: boolean;
}