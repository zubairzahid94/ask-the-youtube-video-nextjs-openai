import qa from "@/utils/qa";
import { NextResponse } from "next/server";

export const POST = async (request) => {
	const { question, url } = await request.json();

	const answer = await qa(question, url);
	return NextResponse.json({ data: answer });
};
