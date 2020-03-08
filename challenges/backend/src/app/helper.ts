import * as sha512 from 'js-sha512';

export default class Helper {
    static prepareHashPassowrd(password: string) {
        for (let i = 0; i < 5; i++) {
            password = sha512.sha512(password);
        }
        return password;
    }
}

export interface IAuthenticationResult {
    authenticated: boolean;
    privileges: string;
    token: string;
    type: null | number;
    userId: string;
}

export interface IAuctionFilterRequest {
    ids: [];
    uuid: [];
    externalIds: [];
    endingTimeAfter: string;
    needsReview: boolean;
    paymentProcesses: [];
}

export const headerOptions = {
    headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
    }
}


