import { BaseService } from "./baseService";
import { FRIZBEE } from "../models";

/**
 * Service spécifique pour le modèle FRIZBEE.
 */
export class FrizbeeService extends BaseService<FRIZBEE> {
    constructor() {
        super("FRIZBEE", "id");
    }
}
