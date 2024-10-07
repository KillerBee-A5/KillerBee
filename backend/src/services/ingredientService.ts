import { BaseService } from "./baseService";
import { INGREDIENT } from "../models";

export class IngredientService extends BaseService<INGREDIENT> {
    constructor() {
        super("INGREDIENT", "id");
    }

    // Ajoutez ici des méthodes spécifiques à INGREDIENT si nécessaire
}
