import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest){
	const id = request.nextUrl.searchParams.get('id');

	if (!id) {
        return NextResponse.json(
            { data: [] },
            { status: 400 }
        );
    }

	const res = await fetch(`${process.env.BACKEND_URL}/get-article?id=${id}`)
	const json = await res.json()
	const article = json.data[0]

	const transformedArticle = {
		imgURL: article.image.url, // string URL
		audioURL: article.audio.url, // string URL
		title: article.title,
		author: article.author,
		date: article.date,
		duration: article.duration,
		content: article["rich-content"]
	};

	return NextResponse.json({ data: transformedArticle }, {status: 200})
}