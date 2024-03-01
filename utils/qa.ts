import "dotenv/config";
import { MemoryVectorStore } from "langchain/vectorstores/memory";
import { OpenAIEmbeddings } from "langchain/embeddings/openai";
import { YoutubeLoader } from "langchain/document_loaders/web/youtube";
import { CharacterTextSplitter } from "langchain/text_splitter";
import { openai } from "./openai.js";

async function qa(question, url) {
	const createStore = (docs) =>
		MemoryVectorStore.fromDocuments(docs, new OpenAIEmbeddings());

	const docsFromYTVideo = async (url) => {
		const loader = YoutubeLoader.createFromUrl(url, {
			language: "en",
			addVideoInfo: true,
		});
		return loader.loadAndSplit(
			new CharacterTextSplitter({
				separator: " ",
				chunkSize: 2500,
				chunkOverlap: 100,
			}),
		);
	};

	const loadStore = async () => {
		const videoDocs = await docsFromYTVideo(url);
		return createStore([...videoDocs]);
	};

	const query = async () => {
		const store = await loadStore();
		const results = await store.similaritySearch(question, 1);

		const response = await openai.chat.completions.create({
			model: "gpt-3.5-turbo-16k-0613",
			temperature: 0,
			messages: [
				{
					role: "assistant",
					content:
						"You are a helpful AI assistant. Answer questions to your best ability.",
				},
				{
					role: "user",
					content: `Answer the following question using the provided context.\n\nQuestion: ${question}\n\nContext: ${results
						.map((r) => r.pageContent)
						.join("\n")}`,
				},
			],
		});

		return `Answer: ${response.choices[0].message.content}\n`;
	};

	// Call the query function and return the answer
	const answer = await query();
	console.log(answer);
	return answer;
}

export default qa;
