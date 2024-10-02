export interface COMPOSER {
    ID_PROCEDE: number;
    ID_ETAPE: number;
    ORDRE: number;
}

export interface CONSTITUER {
    ID_FRIZBEE: number;
    ID_INGREDIENT: number;
    GRAMMAGE: number;
}

export interface ETAPE {
    ID_ETAPE: number;
    NOM_ETAPE: string;
    DESCRIPTION_ETAPE: string;
}

export interface FRIZBEE {
    ID_FRIZBEE: number;
    NOM_FRIZBEE: string;
    DESCRIPTION_FRIZBEE: string;
    PUHT: number;
    STOCK: number;
    ID_PROCEDE: number;
    ID_GAMME: number;
    ORDRE: number;
}

export interface GAMME {
    ID_GAMME: number;
    NOM_GAMME: string;
}

export interface INGREDIENT {
    ID_INGREDIENT: number;
    NOM_INGREDIENT: string;
    DESCRIPTION_INGREDIENT: string;
}

export interface PROCEDE {
    ID_PROCEDE: number;
    NOM_PROCEDE: string;
    DESCRIPTION_PROCEDE: string;
}
