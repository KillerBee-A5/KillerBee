import { FRIZBEE, FRIZBEEModel } from "../models/FRIZBEE";
import { ConnectionPool } from "mssql";

export class FRIZBEEService {
    private readonly frizbeeModel: FRIZBEEModel;

    constructor(pool: ConnectionPool) {
        this.frizbeeModel = new FRIZBEEModel(pool);
    }

    async getAllFRIZBEE(): Promise<FRIZBEE[]> {
        return this.frizbeeModel.getAllFRIZBEE();
    }

    async getFRIZBEEById(id: number): Promise<FRIZBEE | null> {
        return this.frizbeeModel.getFRIZBEEById(id);
    }

    async createFRIZBEE(
        frizbee: Omit<FRIZBEE, "ID_FRIZBEE">
    ): Promise<FRIZBEE> {
        return this.frizbeeModel.createFRIZBEE(frizbee);
    }

    async updateFRIZBEE(
        id: number,
        frizbee: Partial<Omit<FRIZBEE, "ID_FRIZBEE">>
    ): Promise<FRIZBEE | null> {
        return this.frizbeeModel.updateFRIZBEE(id, frizbee);
    }

    async deleteFRIZBEE(id: number): Promise<boolean> {
        return this.frizbeeModel.deleteFRIZBEE(id);
    }
}
