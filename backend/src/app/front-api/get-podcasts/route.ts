import { NextRequest, NextResponse } from 'next/server';

import { getPayload } from 'payload'
import config from '@payload-config'

export async function GET(request: NextRequest){
	const payload = await getPayload({ config })

	try{
		const podcasts = await payload.find({
			collection: "podcasts",
			limit: 0,
			pagination: false, // To Do: Implement pagination
			sort: ["-date", "-updatedAt"],
			select: {
				id: true,
				title: true,
				date: true,
				author: true,
				members: {
					member: true
				},
				duration: true,
				image: true,
				audio: true,
			}
		})

		return NextResponse.json({ data: podcasts.docs }, {status: 200})
	}catch(err){
		console.log(err)
		return NextResponse.json({ data: null }, {status: 500})
	}
}