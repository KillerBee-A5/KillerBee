import { BaseService } from "./baseService";
import { GAMME } from "../models";

export class GammeService extends BaseService<GAMME> {
    constructor() {
        super("GAMME", "id");
    }

    // Ajoutez ici des méthodes spécifiques à GAMME si nécessaire
}
