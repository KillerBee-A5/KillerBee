import { BaseService } from "./baseService";
import { PROCEDE } from "../models";

export class ProceedService extends BaseService<PROCEDE> {
    constructor() {
        super("PROCEDE", "id");
    }

    // Ajoutez ici des méthodes spécifiques à PROCEDE si nécessaire
}
