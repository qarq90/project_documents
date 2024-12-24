import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import { Documents } from "@/models/Document";

export const POST = async (request) => {
    try {
        const { file_name, file_link, file_type,created_at, user_id } = await request.json();

        await connection();

        const result = await Documents.create({
            file_name:file_name,
            file_type:file_type,
            file_link:file_link,
            user_id:user_id,
            created_at:created_at
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
