import { injectable } from "inversify";
import "reflect-metadata";
import { ICarOnSaleClient } from "../interface/ICarOnSaleClient";
import { IAuction } from "../interface/IAuction";
import { auctionsDetails } from "../testData";

@injectable()
export class Auctions implements ICarOnSaleClient {
    auctionsData: IAuction[];
    public constructor() {
        this.auctionsData = auctionsDetails;
    }

    getRunningAuctions(): any {
        return this.auctionsData;
    }

}