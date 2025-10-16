import LatestReleaseCard from "./latestReleaseCard/latestReleaseCard"
import EpisodeCard from "./episodeCardRow/episodeCardRow"

// interfaces
import { PodcastRecords } from "@/lib/interfaces/podcastRecords"
import { CurrentAudio } from "@/lib/interfaces/currentAudio"

import "./podCastListView.css"

interface PodCastListViewProps{
	records: PodcastRecords[] | null;
	audioChanger: React.Dispatch<React.SetStateAction<CurrentAudio | null>>;
	articleIDChanger: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function PodCastListView({ records, audioChanger, articleIDChanger }: PodCastListViewProps){
	return (
		<main className="podCastListView">
			<h2>Latest Releases</h2>

			<div className="row gy-3 mb-5">
				{
					records !== null ?
						records?.slice(0, 2).map((record: any) => (
							<LatestReleaseCard
								key={record.id}
								id={record.id}
								img_url={record.imgURL}
								title={record.title}
								author={record.author}
								date={new Date(record.date)}
								duration={record.duration}
								audio_url={record.audioURL}
								audioChanger={audioChanger}
								articleIDChanger={articleIDChanger}
							/>
						))
					:
					<></>
				}
			</div>

			<h2>All episodes</h2>

			<div className="table-responsive-md podcast-table-wrapper">
				<table className="table table-hover">
				  <thead>
				    <tr>
				      <th scope="col">Podcast</th>
				      <th scope="col">Members</th>
				      <th scope="col">Date</th>
				      <th scope="col">Duration</th>
				      <th scope="col"></th>
				    </tr>
				  </thead>
				  <tbody>
				  	{
				  		records !== null ?
					  		records?.slice(2).map((record: any) => (
					  			<EpisodeCard
					  				key={record.id}
					  				id={record.id}
					  				img_url={record.imgURL}
					  				title={record.title}
					  				members={[record.author, ...record.members]}
					  				date={new Date(record.date)}
					  				audio_url={record.audioURL}
					  				duration={record.duration}
					  				audioChanger={audioChanger}
					  				articleIDChanger={articleIDChanger}
					  			/>
					  		))
					  	:
					  	<></>
				  	}
				  </tbody>
				</table>
			</div>
		</main>
	)
}