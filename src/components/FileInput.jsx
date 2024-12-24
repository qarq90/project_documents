import React, { useState, useRef } from "react";
import Button from "./ui/Button";
import { FaTrashCan } from "react-icons/fa6";
import { PiUploadFill } from "react-icons/pi";
import { uploadFileToS3, encryptFileName } from "@/helpers/addHelpers";
import { useAuthStore } from "@/stores/AuthStore";
import { useUIStore } from "@/stores/UIStore";
import { useRouter } from "next/navigation";

const FileInput = ({
    id = "file-input",
    Title = "Choose a file",
    accept,
    disabled = false,
}) => {
    const router = useRouter();

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const inputRef = useRef(null);

    const { userStore } = useAuthStore();
    const { setIsLoader } = useUIStore();

    const handleFileChange = async (e) => {
        try {
            const file = e.target.files?.[0] || null;
            setSelectedFile(file);
            console.log("File selected:", file);

            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
                console.log("Previous file URL revoked");
            }

            if (file) {
                const url = URL.createObjectURL(file);
                setFileUrl(url);
                console.log("Generated file preview URL:", url);
            }
        } catch (error) {
            console.error("Error in handleFileChange:", error);
        }
    };

    const handleFileClear = () => {
        setSelectedFile(null);
        setFileUrl(null);
        if (inputRef.current) inputRef.current.value = "";
        console.log("File cleared");
    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            console.log("No file selected for upload");
            return alert("No file selected!");
        }

        setIsLoader(true);
        console.log("Loader set to true");

        try {
            // Step 1: Get Signed URL
            const signedURLResult = await uploadFileToS3();
            console.log("Signed URL result:", signedURLResult);

            if (!signedURLResult?.success) {
                throw new Error("Failed to get signed URL from S3");
            }

            const { url } = signedURLResult.success;

            // Step 2: Upload File
            const uploadResponse = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": selectedFile.type },
                body: selectedFile,
            });

            console.log("File uploaded to S3:", uploadResponse.ok);

            if (!uploadResponse.ok) {
                throw new Error("File upload failed");
            }

            // Step 3: Prepare Request
            const file_name = encryptFileName(selectedFile.name);
            console.log("Encrypted file name:", file_name);

            const request = {
                file_name: file_name,
                file_type: selectedFile.type,
                file_link: url.split("?")[0], // Get the public link without query params
                user_id: userStore?.id, // Ensure userStore and id are valid
                created_at: Date.now(),
            };

            console.log("Request prepared for API:", request);

            // Step 4: Save File Metadata
            const response = await fetch("/api/post/upload-doc", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(request), // Send `request` directly
            });

            const result = await response.json();
            console.log("API response:", result);

            if (result.status) {
                console.log("File metadata saved successfully, navigating to /view-docs");
                router.push("/view-docs");
            } else {
                throw new Error("Failed to add document");
            }
        } catch (error) {
            console.error("Error in file upload:", error);
        } finally {
            setIsLoader(false);
            console.log("Loader set to false");
        }
    };

    const triggerFileInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
            console.log("File input triggered");
        }
    };

    return (
        <div className="grid w-full max-w-sm items-center gap-3">
            <div className="relative w-full cursor-pointer hover:opacity-50">
                <input
                    ref={inputRef}
                    id={id}
                    type="file"
                    accept={accept}
                    disabled={disabled}
                    onChange={handleFileChange}
                    className="file-input absolute inset-0 z-10 cursor-pointer opacity-0"
                />
                <div
                    className="flex cursor-pointer items-center justify-center rounded-md bg-[#222] px-4 py-2 text-xl"
                    onClick={triggerFileInput}
                >
                    {selectedFile ? selectedFile.name : Title}
                </div>
            </div>
            <div className="flex w-full gap-3">
                <Button onClick={handleFileClear} disabled={!selectedFile}>
                    <FaTrashCan /> Clear File
                </Button>
                <Button onClick={handleFileUpload} disabled={!selectedFile}>
                    <PiUploadFill /> Upload File
                </Button>
            </div>
            <span className="text-center">
                {selectedFile ? "File Selected" : "No File Selected"}
            </span>
        </div>
    );
};

export default FileInput;
