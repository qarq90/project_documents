"use client";

import Title from "@/components/ui/Title";
import FileInput from "@/components/FileInput";
import { useAuthStore } from "@/stores/AuthStore";
import { AuthWrapper } from "@/components/Wrapper";
import { AccountRequired } from "@/components/empty/AccountRequired";

export default function AddDocument() {
    const { userStore } = useAuthStore();

    if (userStore === null)
        return (
            <AuthWrapper>
                <AccountRequired />
            </AuthWrapper>
        );
    return (
        <AuthWrapper>
            <div className="flex h-screen flex-col items-center justify-center gap-4">
                <Title>Add Document</Title>
                <p className="text-center text-lg opacity-50">
                    Upload your important documents to keep them safe <br /> and
                    accessible whenever you need them.
                </p>

                <FileInput
                    id="document-upload"
                    Title="Choose a document to upload"
                    accept="application/pdf, image/*, .docx"
                />

                <p className="mt-2 text-center text-sm opacity-50">
                    Your files are securely stored and accessible. <br />
                    Upload clear and relevant documents to stay organized.{" "}
                    <br />
                    Supported file types: PDFs, images, and Word documents.
                </p>
            </div>
        </AuthWrapper>
    );
}
