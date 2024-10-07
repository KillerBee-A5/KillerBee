import { BaseService } from "./baseService";
import { CONSTITUER } from "../models";

export class ConstituerService extends BaseService<CONSTITUER> {
    constructor() {
        super("CONSTITUER", "id");
    }
}
