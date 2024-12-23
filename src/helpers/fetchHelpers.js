import crypto from "crypto";

export const fetchDocuments = async (user_id) => {
    const response = await fetch("/api/post/fetch-docs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            user_id: user_id,
        }),
    });

    return await response.json();
};

export const decryptFileName = (encryptedFileName) => {
    const [ivHex, encrypted] = encryptedFileName.split(":");
    const iv = Buffer.from(ivHex, "hex");
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        process.env.NEXT_PUBLIC_ENCRYPTION_KEY,
        iv
    );
    let decrypted = decipher.update(encrypted, "hex", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
};
