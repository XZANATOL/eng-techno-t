import Image from "next/image"

import PlayButton from "@/lib/components/sharedComponents/playButton/playButton"

// interfces
import { CurrentAudio } from "@/lib/interfaces/currentAudio"

import "./latestReleaseCard.css"

interface LatestReleaseCardProps {
	id: string;
	img_url: string;
	audio_url: string;
	title: string;
	author: string;
	date: object;
	duration: string;
	audioChanger: React.Dispatch<React.SetStateAction<CurrentAudio | null>>;
	articleIDChanger: React.Dispatch<React.SetStateAction<string | null>>;
}

export default function LatestReleaseCard({id, img_url, audio_url, title, author, date, duration, audioChanger, articleIDChanger}: LatestReleaseCardProps) {
	const formatDate = (date: any) => {
	    // Get the numeric day (e.g., 8)
	    const day = date.getDate();
	    // Get the short month name (e.g., 'Jan'). 
	    const monthAbbr = date.toLocaleDateString('en-US', { month: 'short' });
	    // Get the two-digit year (e.g., 21).
	    const yearTwoDigit = date.getFullYear().toString().slice(-2);

	    return `${day} ${monthAbbr} ${yearTwoDigit}`;
	};

	const changeAudioHandler = () => (
		audioChanger({
			imgURL: img_url,
			audioURL: audio_url,
			title: title,
			author: author
		})
	)

	const ArticleChangeHandler = () => {
		articleIDChanger(id)
	}

	return (
		<div className="col-12 col-lg-6">
			<div className="release-box-wrapper d-flex align-items-stretch">
				<div className="row w-100 d-flex align-items-stretch">
					<div className="col-5 d-flex justify-content-center align-items-center">
						<div className="podcast-img-wrapper">
							<Image src={img_url} alt="podcast-img" fill />
						</div>
					</div>

					<div className="col-7 d-flex justify-content-center flex-column">
						<h5 onClick={ArticleChangeHandler}>{title}</h5>
						<div className="d-flex justify-content-between">
							<div>
								<p>{author}</p>
								<span>{formatDate(date)} . {duration}</span>
							</div>

							<PlayButton onClickFunction={changeAudioHandler} />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}