import { injectable } from "inversify";
import "reflect-metadata";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IAuction } from "../interface/IAuction";

@injectable()
export class Auctions implements ICarOnSaleClient {

    public constructor() {
    }


    getRunningAuctions(): Promise<IAuction[]> {
        throw new Error("Method not implemented.");
    }

}