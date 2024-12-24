import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import Documents from "@/models/Document";

export const POST = async (request) => {
    try {
        const { user_id } = await request.json();

        await connection();

        const result = await Documents.find({ user_id });

        if (result) {
            return NextResponse.json({
                message: "Documents fetched successfully",
                status: true,
                result: result,
            });
        } else {
            return NextResponse.json({
                message: "No documents found",
                status: false,
                result: [],
            });
        }
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            message:
                "Error connecting to Database: " +
                (error instanceof Error ? error.message : "Unknown error"),
            status: false,
        });
    }
};
