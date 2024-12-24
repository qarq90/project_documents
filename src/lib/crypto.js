const CryptoJS = require("crypto-js");

export function encryptFileName(fileName, secretKey) {
    if (!fileName || !secretKey) {
        throw new Error("File name and secret key are required for encryption.");
    }

    // Encrypt the file name using AES and return the string
    const encryptedFileName = CryptoJS.AES.encrypt(fileName, secretKey).toString();
    return encryptedFileName;
}

export function decryptFileName(toDecrypt, secretKey) {
    if (!toDecrypt || !secretKey) {
        throw new Error("Encrypted data and secret key are required for decryption.");
    }

    try {
        // Decrypt the data using AES
        const bytes = CryptoJS.AES.decrypt(toDecrypt, secretKey);
        if (!bytes) {
            throw new Error("Failed to decrypt data.");
        }
        const decryptedFileName = bytes.toString(CryptoJS.enc.Utf8);

        // Check if the decryption was successful
        if (!decryptedFileName) {
            throw new Error("Decryption failed, invalid encrypted data.");
        }

        return decryptedFileName;
    } catch (error) {
        console.error("Error during decryption:", error);
        throw error;
    }
}
