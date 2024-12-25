import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";

const generateFileName = (bytes = 32) => {
    return crypto.randomBytes(bytes).toString("hex");
};

export const encryptFileName = (fileName) => {
    // Ensure the encryption key is exactly 32 bytes (256 bits)
    const key = Buffer.from(process.env.NEXT_PUBLIC_ENCRYPTION_KEY, "hex");
    if (key.length !== 32) {
        throw new Error("Encryption key must be exactly 32 bytes long.");
    }

    // Generate a 16-byte initialization vector (IV)
    const iv = crypto.randomBytes(16);

    // Create a Cipher instance using AES-256-CBC
    const cipher = crypto.createCipheriv("aes-256-cbc", key, iv);

    // Encrypt the fileName
    let encrypted = cipher.update(fileName, "utf8", "hex");
    encrypted += cipher.final("hex");

    // Combine the IV and encrypted data as the result
    return `${iv.toString("hex")}:${encrypted}`;
};


const s3 = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_BUCKET_REGION,
    credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    },
});

export async function uploadFileToS3() {
    const fileName = generateFileName();  

    const putObjCommand = new PutObjectCommand({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
        Key: fileName,
    });

    const signedUrl = await getSignedUrl(s3, putObjCommand, {
        expiresIn: 60,  
    });

    return { success: { url: signedUrl } };
}

export const addDocument = async (request) => {
    const response = await fetch("/api/post/upload-doc", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(request),  
    });

    return await response.json();
};
