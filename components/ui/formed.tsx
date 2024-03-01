"use client";
import React, { useState } from "react";
import { Input } from "./input";
import { Button } from "./button";

function ProfileForm() {
	const [url, setUrl] = useState("");
	const [question, setQuestion] = useState("");
	const [answer, setAnswer] = useState("");
	const [error, setError] = useState(null);
	const [isLoading, setIsLoading] = useState(false);

	const submitHandler = async (e) => {
		e.preventDefault();
		setIsLoading(true);
		try {
			const response = await fetch("/api/qa", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ url, question }),
			});

			if (!response.ok) {
				throw new Error(`API request failed with status ${response.status}`);
			}

			const data = await response.json();
			setAnswer(data.data);
			setError(null);
		} catch (err) {
			console.error(err);
			setError(err.message);
		} finally {
			setIsLoading(false); // Set loading state to false after request finishes
		}
	};

	return (
		<form onSubmit={submitHandler}>
			<Input
				type="text"
				placeholder="Enter YouTube URL"
				value={url}
				onChange={(e) => setUrl(e.target.value)}
			/>
			<Input
				type="text"
				placeholder="Enter your question"
				value={question}
				onChange={(e) => setQuestion(e.target.value)}
			/>
			<div className="m-2 p-2">
				<Button type="submit" disabled={isLoading}>
					{isLoading ? "Loading..." : "Ask Question"}
				</Button>
				{answer && (
					<p className="mt-4 font-normal text-base text-neutral-300 max-w-lg text-left leading-loose mx-auto">
						{answer}
					</p>
				)}
				{error && <p style={{ color: "red" }}>Error: {error}</p>}
			</div>
		</form>
	);
}

export default ProfileForm;
