import React, { useState, useRef } from "react";
import Button from "./ui/Button";
import { FaTrashCan } from "react-icons/fa6";
import { PiUploadFill } from "react-icons/pi";
import {
    uploadFileToS3,
    encryptFileName,
    addDocument,
} from "@/helpers/addHelpers";
import { useAuthStore } from "@/stores/AuthStore";
import { useUIStore } from "@/stores/UIStore";
import { useRouter } from "next/navigation";

const FileInput = ({
    id = "file-input",
    Title = "Choose a file",
    accept,
    disabled = false,
}) => {
    const router = useRouter()

    const [selectedFile, setSelectedFile] = useState(null);
    const [fileUrl, setFileUrl] = useState(null);
    const inputRef = useRef(null);

    const { userStore } = useAuthStore();
    const { setIsLoader } = useUIStore();

    const handleFileChange = async (e) => {
        try {
            const file = e.target.files?.[0] || null;
            setSelectedFile(file);

            if (fileUrl) {
                URL.revokeObjectURL(fileUrl);
            }

            if (file) {
                const url = URL.createObjectURL(file);
                setFileUrl(url);
            }
        } catch (error) {
            console.error("Error in handleFileChange:", error, e);
        }
    };

    const handleFileClear = () => {
        setSelectedFile(null);
        setFileUrl(null);
        if (inputRef.current) inputRef.current.value = "";
    };

    const handleFileUpload = async () => {
        if (!selectedFile) return;

        setIsLoader(true);

        try {
            // Step 1: Get signed URL from S3
            const signedURLResult = await uploadFileToS3();
            
            // Make sure the signed URL was returned successfully
            if (!signedURLResult?.success) {
                throw new Error('Failed to get signed URL from S3');
            }

            const { url } = signedURLResult.success;

            // Step 2: Upload the file to S3
            const uploadResponse = await fetch(url, {
                method: "PUT",
                headers: { "Content-Type": selectedFile.type },
                body: selectedFile,
            });

            if (!uploadResponse.ok) {
                throw new Error('File upload failed');
            }

            // Step 3: Encrypt the file name
            const file_name = encryptFileName(selectedFile.name);

            // Step 4: Prepare the request payload
            const request = {
                file_name: file_name,
                file_type: selectedFile.type,
                file_link: url.split("?")[0], 
                user_id: userStore.id,
            };

            // Step 5: Add document to your database
            const result = await addDocument(request);

            if (result.status) {
                handleFileClear();
                router.push("/view-docs");
            } else {
                throw new Error('Failed to add document');
            }
        } catch (error) {
            // Improved error logging
            console.error("Error in file upload:", error.message || error);
            if (error.stack) {
                console.error("Stack trace:", error.stack);
            }
        } finally {
            setIsLoader(false);
        }
    };

    const triggerFileInput = () => {
        if (inputRef.current) {
            inputRef.current.click();
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
