import { NextResponse } from "next/server";
import connect from "@/lib/connection";
import {Documents} from "@/models/Document";

export const POST = async (request) => {
    try {
        const { _id } = await request.json();

        await connect();

        const result = await Documents.deleteOne({
            _id: _id,
        });

        if (result.deletedCount) {
            return NextResponse.json({
                message: "Document deleted successfully",
                status: true,
                result: result,
            });
        } else {
            return NextResponse.json({
                message: "Failed to delete document",
                status: false,
                result: result,
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
