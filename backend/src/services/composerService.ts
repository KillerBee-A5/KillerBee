import { BaseService } from "./baseService";
import { COMPOSER } from "../models";

export class ComposerService extends BaseService<COMPOSER> {
    constructor() {
        super("COMPOSER", "id");
    }
}
