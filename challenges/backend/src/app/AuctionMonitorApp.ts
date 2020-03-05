import { inject, injectable } from "inversify";
import { ILogger } from "./services/Logger/interface/ILogger";
import { DependencyIdentifier } from "./DependencyIdentifiers";
import "reflect-metadata";

import { IAuction } from "./services/CarOnSaleClient/interface/IAuction";
import { ICarOnSaleClient } from "./services/CarOnSaleClient/interface/ICarOnSaleClient";
import axios from "axios";
import Helper from "./helper"

@injectable()
export class AuctionMonitorApp {

    public constructor(@inject(DependencyIdentifier.LOGGER) private logger: ILogger,
        @inject(DependencyIdentifier.AUCTIONS) private auctions: ICarOnSaleClient) {
    }

    public async start(): Promise<void> {

        this.logger.log(`Auction Monitor started.`);
        let userName = 'salesman@random.com'
        let hashedPwd = Helper.prepareHashPassowrd('123test');
        this.logger.log(hashedPwd);
        const request = {
            password: hashedPwd,
            meta: ''
        }
        axios({
            method: 'put',
            url: 'https://caronsale-backend-service-dev.herokuapp.com/api/v1/authentication',
            data: {
                userMailId: userName,
                authenticationRequest: {
                    password: hashedPwd,
                    meta: ''
                },
                headers: {
                    'Content-Type': 'application/json',
                }
            }
        }).then(res => {
            const authData = res;
            console.log(`[Token]: ${authData}`);
        })
            .catch((error) => {
                console.log(`[error]: ${error}`);
            })



        // TODO: Retrieve auctions and display aggregated information (see README.md)

    }
}