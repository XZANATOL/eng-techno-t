import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest){
	const res = await fetch(`${process.env.BACKEND_URL}/get-podcasts`)
	const json = await res.json()

	const transformedData = json.data.map((podcast: any) => {

		// Transform 'members' array to simple string array
		const simplifiedMembers = podcast.members.map((memberObj: any) => memberObj.member);

		// Extract only the 'url' from 'image' object
		const simplifiedImage = podcast.image?.url;

		// Extract only the 'url' from 'audio' object
		const simplifiedAudio = podcast.audio?.url;

		return {
			id: podcast.id,
			imgURL: simplifiedImage, // string URL
			audioURL: simplifiedAudio, // string URL
			title: podcast.title,
			members: simplifiedMembers, // list of strings
			author: podcast.author,
			date: podcast.date,
			duration: podcast.duration
		};
	});

	return NextResponse.json({ data: transformedData }, {status: 200})
}