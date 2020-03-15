import axios from "axios";
import { IAuction } from './CarOnSaleClient/interface/IAuction';
import { AppConstants } from "../app.constants";

export class AuctionsService {
  auctionsData: IAuction[];

  constructor() {
  }

  async getSalesmanAuctions(authentication: any): Promise<any> {
    const url = `${AppConstants.baseURL}auction/salesman/${authentication.userId}/_all`;
    console.log(`[URL]: ${url}`);
    const headerOptions = {
      headers: {
        'Content-Type': 'application/json',
        authToken: authentication.token,
        userid: authentication.userId
      }
    }
    return await axios.get(url, headerOptions);
  }
}
