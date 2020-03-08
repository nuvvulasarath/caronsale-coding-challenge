import { injectable } from "inversify";
import "reflect-metadata";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IAuction } from "../interface/IAuction";

@injectable()
export class Auctions implements ICarOnSaleClient {
    auctionsData: IAuction[];
    public constructor() {
        this.auctionsData = [];
    }

    getRunningAuctions(): any {
        return this.auctionsData;
    }

}