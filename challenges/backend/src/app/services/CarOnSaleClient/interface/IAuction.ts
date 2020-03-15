export interface IAuction {
    label: string;
    numBids: number;
    currentHighestBidValue: number;
    minimumRequiredAsk: number;
}