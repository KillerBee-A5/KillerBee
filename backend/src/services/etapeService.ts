import { BaseService } from "./baseService";
import { ETAPE } from "../models";

export class EtapeService extends BaseService<ETAPE> {
    constructor() {
        super("ETAPE", "id");
    }

    // Ajoutez ici des méthodes spécifiques à ETAPE si nécessaire
}
