import { NextResponse } from "next/server";
import connect from "@/lib/connection";
import { Documents } from "@/models/Document";

export const POST = async (request) => {
    try {
        const { file_name, file_link, file_type, user_id } = await request.json();

        await connect();

        const result = await Documents.create({
            file_name,
            file_type,
            file_link,
            user_id,
        });

        if (result) {
            return NextResponse.json({
                message: "Document uploaded successfully.",
                status: true,
                result,
            });
        } else {
            return NextResponse.json({
                message: "Failed to upload document.",
                status: false,
                result: null,
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message: "An error occurred.",
            status: false,
            result: null,
        });
    }
};
