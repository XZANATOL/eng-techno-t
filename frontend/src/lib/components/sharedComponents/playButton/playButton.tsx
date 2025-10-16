import "./playButton.css"

interface PlayButtonProps {
	onClickFunction: () => void;
}

export default function PlayButton({ onClickFunction }: PlayButtonProps){
	// console.log(onClickFunction)
	return (
		<svg onClick={onClickFunction} className="play-button" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
			<rect x="0.5" y="0.5" width="39" height="39" rx="9.5" fill="white" stroke="#E6E8EB"/>
			<g clipPath="url(#clip0_1_131)">
				<path d="M15.8333 12.7083V27.2917L27.2916 20L15.8333 12.7083Z" fill="#04D361"/>
			</g>
			<defs>
				<clipPath id="clip0_1_131">
					<rect x="7.5" y="7.5" width="25" height="25" rx="10" fill="white"/>
				</clipPath>
			</defs>
		</svg>
	)
}