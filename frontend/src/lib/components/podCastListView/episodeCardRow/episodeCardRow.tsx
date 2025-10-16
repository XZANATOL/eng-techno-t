import Image from "next/image"

/*
This component styling is coupled to the parent styling in
"@/lib/components/podCastListView/podCastListView.css"
*/

import PlayButton from "@/lib/components/sharedComponents/playButton/playButton"

// interfaces
import { CurrentAudio } from "@/lib/interfaces/currentAudio"

interface EpisodeCardProps{
	id: string;
	img_url: string;
	audio_url: string;
	title: string;
	members: string[];
	date: object;
	duration: string;
	audioChanger: React.Dispatch<React.SetStateAction<CurrentAudio | null>>;
	articleIDChanger: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function EpisodeCard({id, img_url, audio_url, title, members, date, duration, audioChanger, articleIDChanger}: EpisodeCardProps){
	const formatDate = (date: any) => {
	    // 1. Get the numeric day (e.g., 8)
	    const day = date.getDate();

	    // 2. Get the short month name (e.g., 'Jan'). 
	    const monthAbbr = date.toLocaleDateString('en-US', { month: 'short' });

	    // 3. Get the two-digit year (e.g., 21).
	    const yearTwoDigit = date.getFullYear().toString().slice(-2);

	    // 4. Combine them into the desired format.
	    return `${day} ${monthAbbr} ${yearTwoDigit}`;
	};

	const changeAudioHandler = () => (
		audioChanger({
			imgURL: img_url,
			audioURL: audio_url,
			title: title,
			author: members[0]
		})
	)

	const ArticleChangeHandler = () => {
		articleIDChanger(id)
	}

	return (
		<tr>
		  <td className="position-relative">
		  	<div className="flex-wrapper">
		  		<Image src={img_url} alt="podcast-img" fill />
		  		<h6 onClick={ArticleChangeHandler}>{title}</h6>
		  	</div>
		  </td>
		  <td>
		  	<div className="flex-wrapper">
		  		<span>{members.join(", ")}</span>
		  	</div>
		  </td>
		  <td>
		  	<div className="flex-wrapper">
		  		<span>{formatDate(date)}</span>
		  	</div>
		  </td>
		  <td>
		  	<div className="flex-wrapper">
		  		<span>{duration}</span>
		  	</div>
		  </td>
		  <td>
		  	<div className="flex-wrapper">
		  		<PlayButton onClickFunction={changeAudioHandler} />
		  	</div>
		  </td>
		</tr>
	)
}