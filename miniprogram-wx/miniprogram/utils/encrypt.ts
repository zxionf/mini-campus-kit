import JSEncrypt from "jsencrypt";

const CryptoJS = require("crypto-js")
export const encryptByAES = (message: string, key: string) => {
    let CBCOptions = {
        iv: CryptoJS.enc.Utf8.parse(key),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    };
    let aeskey = CryptoJS.enc.Utf8.parse(key);
    let secretData = CryptoJS.enc.Utf8.parse(message);
    let encrypted = CryptoJS.AES.encrypt(
        secretData,
        aeskey,
        CBCOptions
    );
    return CryptoJS.enc.Base64.stringify(encrypted.ciphertext);
}

export const jsencrypt = (raw: string, PUB_KEY:string): string => {
    const encrypt = new JSEncrypt()
    encrypt.setPublicKey(PUB_KEY)
    const ret = encrypt.encrypt(raw)
    if (ret === false) throw new Error('jsencrypt err')
    return ret
}