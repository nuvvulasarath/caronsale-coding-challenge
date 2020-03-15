import { expect } from 'chai';
import { Auctions } from '../Auctions';

describe('getRunningAuctions', () => {
    it('Running auctions count should be greater than 0', () => {
        var component = new Auctions();
        component.getRunningAuctions();
        expect(component.auctionsData.length).greaterThan(0);
    });
});