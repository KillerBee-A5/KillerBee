export interface COMPOSER {
    id: number;
    ID_PROCEDE: number;
    ID_ETAPE: number;
    ORDRE: number;
}

export interface CONSTITUER {
    id: number;
    ID_FRIZBEE: number;
    ID_INGREDIENT: number;
    GRAMMAGE: number;
}

export interface ETAPE {
    id: number;
    NOM_ETAPE: string;
    DESCRIPTION_ETAPE: string;
}

export interface FRIZBEE {
    id: number;
    NOM_FRIZBEE: string;
    DESCRIPTION_FRIZBEE: string;
    PUHT: number;
    STOCK: number;
    ID_PROCEDE: number;
    ID_GAMME: number;
    ORDRE: number;
}

export interface GAMME {
    id: number;
    NOM_GAMME: string;
}

export interface INGREDIENT {
    id: number;
    NOM_INGREDIENT: string;
    DESCRIPTION_INGREDIENT: string;
}

export interface PROCEDE {
    id: number;
    NOM_PROCEDE: string;
    DESCRIPTION_PROCEDE: string;
}
