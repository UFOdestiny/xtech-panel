import CryptoJS from 'crypto-js'
// 由于AES加密的方式很多，所以需要先商量并确定好采用的 AES 的 vi (初始变量)、key(秘钥)、mode(加密模式)、padding(填充方式)。
const key = 'aaaabbbbccccdddd'
const iv = '1234567887654321'
// 加密
function Encrypt(text) {
    return CryptoJS.AES.encrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    }).toString()
}

// 解密
function Decrypt(text) {
    let decrypted = CryptoJS.AES.decrypt(text, CryptoJS.enc.Utf8.parse(key), {
        iv: CryptoJS.enc.Utf8.parse(iv),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    })
    return decrypted.toString(CryptoJS.enc.Utf8)
}

export default {
    Encrypt,
    Decrypt
}
