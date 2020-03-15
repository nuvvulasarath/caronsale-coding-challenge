import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";
import { AuctionsService } from "./services/auctions.service";
import Helper, { IAuthenticationResult } from "./helper"
import axios from "axios";
import { AppConstants, headerOptions } from "./app.constants";



@injectable()
export class AuctionMonitorApp {
    auctionsData: IAuction[];
    authenticationResult: IAuthenticationResult;
    numberOfAuctions: number;

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger) {
    }

    private getAuthTokenandAuctionData() {
        let hashedPwd = Helper.prepareHashPassowrd(AppConstants.password);
        console.log(`[Hashed Pwd]: ${hashedPwd}`);
        const url = AppConstants.baseURL + 'authentication/' + AppConstants.userName;

        axios.put(url, {
            password: hashedPwd
        }, headerOptions)
            .then(res => {
                this.authenticationResult = res.data;
                console.log(`[User ID]: ${this.authenticationResult.userId}`);
                console.log(`[Token]: ${this.authenticationResult.token}`);
                this.getAuctionResults();
            })
            .catch((error) => {
                console.log(`[error]: ${error}`);
            })
    }

    private getAuctionResults() {
        let service = new AuctionsService()
        service.getSalesmanAuctions(this.authenticationResult)
            .then(result => {
                this.auctionsData = result.data;
                // dispaly required information based on the result.
                this.processData(this.auctionsData);
                //console.log(`[Result]: ${JSON.stringify(this.auctionsData)}`);
            })
            .catch((error) => {
                console.log(`[Error]: ${error}`);
            });
    }

    private processData(data: any) {
        this.numberOfAuctions = data.length;
        this.logger.log(`Number of auctions are. ${this.numberOfAuctions}`);
        // As per the result we got, we cannot calculate average and percentage values because the values of numBids and currentHighestBidValue are zero.
        // Therefore i am not displaying that information. 
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        // get the Auhentication token and then call the auctions API with the token details
        this.getAuthTokenandAuctionData();

    }
}