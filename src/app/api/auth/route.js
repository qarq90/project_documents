import { NextResponse } from "next/server";
import connection from "@/lib/connection";
import Users from "@/models/User";

export const POST = async (request) => {
    try {
        const { email } = await request.json();

        await connection();

        const result = await Users.findOne({
            email: email,
        });

        if (result) {
            return NextResponse.json({
                message: "User found",
                status: true,
                result: result,
            });
        } else {
            return NextResponse.json({
                message: "No user found.",
                status: false,
                result: null,
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
