import SimpleCrypto from "simple-crypto-js"

export const _secretKey = SimpleCrypto.generateRandom()
export const simpleCrypto = new SimpleCrypto(_secretKey)