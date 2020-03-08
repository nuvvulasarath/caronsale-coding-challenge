import { Observable, throwError } from 'rxjs';
import axios from "axios";
import { headerOptions, IAuthenticationResult, IAuctionFilterRequest } from "../helper"
import { IAuction } from './CarOnSaleClient/interface/IAuction';

export class AuctionsService {
  auctionsData: IAuction[];
  auctionFilterRequest = {} as IAuctionFilterRequest;


  constructor() {
  }

  async getSalesmanAuctions(authentication: any): Promise<IAuction[]> {
    const url = `https://caronsale-backend-service-dev.herokuapp.com/api/v1/auction/salesman/${authentication.userId}/_all?filter=${this.auctionFilterRequest}`;
    console.log(`[URL]: ${url}`);
    return await axios.get(url, headerOptions);
  }
}
