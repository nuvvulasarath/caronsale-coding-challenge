import * as sha512 from 'js-sha512';

export default class Helper {
    static prepareHashPassowrd(password: string) {
        for (let i = 0; i < 5; i++) {
            password = sha512.sha512(password);
        }
        return password;
    }
}