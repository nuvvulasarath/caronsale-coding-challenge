import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";
import { AuctionsService } from "./services/auctions.service";
import Helper, { headerOptions, IAuthenticationResult } from "./helper"
import axios from "axios";



@injectable()
export class AuctionMonitorApp {
    auctionsData: IAuction[];
    authenticationResult: IAuthenticationResult;

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUCTIONS) private auctions: ICarOnSaleClient) {
    }

    getAuthToken() {
        let userName = 'salesman@random.com'
        let hashedPwd = Helper.prepareHashPassowrd('123test');
        console.log(`[Hashed Pwd]: ${hashedPwd}`);
        const url = 'https://caronsale-backend-service-dev.herokuapp.com/api/v1/authentication' + '/' + userName;

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
                console.log(`[Result]: ${result}`);
            })
            .catch((error) => {
                console.log(`[Error]: ${error}`);
            });
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);

        this.getAuthToken();

        // TODO: Retrieve auctions and display aggregated information (see README.md)

    }
}