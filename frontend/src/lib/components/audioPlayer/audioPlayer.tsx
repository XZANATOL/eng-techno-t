"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"

import "./audioPlayer.css"

interface AudioPlayerProps {
	imgURL: string | undefined;
	audioURL: string | undefined;
	title: string | undefined;
	author: string | undefined;
}

const formatTime = (time: number) => {
	if (!time || isNaN(time)) return "0:00";
	const minutes = Math.floor(time / 60);
	const seconds = Math.floor(time % 60)
		.toString()
		.padStart(2, "0");
	return `${minutes}:${seconds}`;
};

export default function AudioPlayer({ imgURL, audioURL, title, author }: AudioPlayerProps) {
	const audioRef = useRef<HTMLAudioElement | null>(null)
	const audioBarRef = useRef<HTMLInputElement>(null)

	const [isPlaying, setIsPlaying] = useState(false)
	const [isRepeating, setIsRepeating] = useState(false)
	const [currentTime, setCurrentTime] = useState(0)
	const [duration, setDuration] = useState(0)

	const toggleIsPlaying = () => {
		if (!audioRef.current) return;
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	const toggleRepeat = () => {
		setIsRepeating(!isRepeating)
		if (audioRef.current) {
			audioRef.current.loop = !isRepeating
		}
	}

	const reset = () => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = 0;
		setCurrentTime(0);
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	const skip = () => {
		if (!audioRef.current) return;
		audioRef.current.currentTime = duration;
		setCurrentTime(duration);
		if (isPlaying) {
			audioRef.current.play();
		}
	};

	// for Chrome Browsers since we're using customized progressbar
	const updateSliderBackground = () => {
		if (!audioBarRef.current) return
		const min = parseFloat(audioBarRef.current.min) || 0
		const max = parseFloat(audioBarRef.current.max) || 1
		const val = parseFloat(audioBarRef.current.value)
		const percentage = ((val - min) / (max - min)) * 100
		audioBarRef.current.style.setProperty("--range-progress", `${percentage}%`)
	}

	const handleTimeUpdateForProgressBar = useCallback(() => {
		if (audioRef.current) {
			setCurrentTime(audioRef.current.currentTime)
			if (audioBarRef.current) {
				audioBarRef.current.value = audioRef.current.currentTime.toString()
				updateSliderBackground()
			}
		}
	}, [updateSliderBackground])

	const handleEnded = useCallback(() => {
		if (!audioRef.current) return;
		if (isRepeating) return;

		audioRef.current.pause()
		setIsPlaying(false)
	}, [isRepeating])

	const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (!audioRef.current) return;
		const value = parseFloat(e.target.value)
		audioRef.current.currentTime = value
		setCurrentTime(value)
		updateSliderBackground()
	}

	useEffect(() => {
	  const audio = audioRef.current;
	  if (!audio) return;

	  const handleTimeUpdate = () => {
	  	handleTimeUpdateForProgressBar()
	  	setCurrentTime(audio.currentTime)
	  };
	  const handleLoadedMetadata = () => setDuration(audio.duration);

	  audio.addEventListener("timeupdate", handleTimeUpdate);
	  audio.addEventListener("loadedmetadata", handleLoadedMetadata);
	  audio.addEventListener("ended", handleEnded)
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
	  	if (!audio) return;
	  	if (!audioURL) return;
	  	audio.src = audioURL
	}, [audioURL])

	return (
		<section className="audioPlayer">
			<audio ref={audioRef} src={audioURL} preload="metadata" />
			<div className="row gy-4 w-100">
				<div className="col-12 col-lg-12 d-flex justify-content-center align-items-center flex-column">
					<div className="image-wrapper">
						{imgURL ? (
							<Image src={imgURL} alt="player-image" fill />
						) : (
							<span>Select a podcast to listen to</span>
						)}
					</div>

					{audioURL ? (
						<>
							<h5>{title}</h5>
							<p>{author}</p>
						</>
					) : (
						<></>
					)}
				</div>

				<div className="col-12 col-lg-12 d-flex justify-content-center align-items-center flex-column">
					<div className="progress-bar-wrapper">
						<span>{formatTime(currentTime)}</span>
						<input
							ref={audioBarRef}
							type="range"
							min={0}
							max={duration}
							step={0.1}
							value={currentTime}
							onChange={handleSeek}
						/>
						<span>{formatTime(duration)}</span>
					</div>
					<div className="controls-wapper">
						{/* Shuffle icon (NOT IMPLEMENTED) */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							style={{ cursor: "not-allowed", opacity: 0.4 }}
						>
							<path
								fillRule="evenodd"
								d="M0 3.5A.5.5 0 0 1 .5 3H1c2.202 0 3.827 1.24 4.874 2.418.49.552.865 1.102 1.126 1.532.26-.43.636-.98 1.126-1.532C9.173 4.24 10.798 3 13 3v1c-1.798 0-3.173 1.01-4.126 2.082A9.6 9.6 0 0 0 7.556 8a9.6 9.6 0 0 0 1.317 1.918C9.828 10.99 11.204 12 13 12v1c-2.202 0-3.827-1.24-4.874-2.418A10.6 10.6 0 0 1 7 9.05c-.26.43-.636.98-1.126 1.532C4.827 11.76 3.202 13 1 13H.5a.5.5 0 0 1 0-1H1c1.798 0 3.173-1.01 4.126-2.082A9.6 9.6 0 0 0 6.444 8a9.6 9.6 0 0 0-1.317-1.918C4.172 5.01 2.796 4 1 4H.5a.5.5 0 0 1-.5-.5"
							/>
							<path d="M13 5.466V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m0 9v-3.932a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192" />
						</svg>

						{/* Previous icon */}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onClick={reset}>
							<path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
						</svg>

						<div className="play-wrapper" onClick={toggleIsPlaying}>
							{isPlaying ? (
								// Pause icon
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<path d="M5.5 3.5A1.5 1.5 0 0 1 7 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5m5 0A1.5 1.5 0 0 1 12 5v6a1.5 1.5 0 0 1-3 0V5a1.5 1.5 0 0 1 1.5-1.5" />
								</svg>
							) : (
								// Play icon
								<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
									<path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393" />
								</svg>
							)}
						</div>

						{/* Next icon */}
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onClick={skip}>
							<path d="m12.14 8.753-5.482 4.796c-.646.566-1.658.106-1.658-.753V3.204a1 1 0 0 1 1.659-.753l5.48 4.796a1 1 0 0 1 0 1.506z" />
						</svg>

						{/* Repeat icon */}
						<svg
							xmlns="http://www.w3.org/2000/svg"
							viewBox="0 0 16 16"
							onClick={toggleRepeat}
							style={{ cursor: "pointer", opacity: isRepeating ? 1 : 0.4 }}
						>
							<path d="M11 5.466V4H5a4 4 0 0 0-3.584 5.777.5.5 0 1 1-.896.446A5 5 0 0 1 5 3h6V1.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384l-2.36 1.966a.25.25 0 0 1-.41-.192m3.81.086a.5.5 0 0 1 .67.225A5 5 0 0 1 11 13H5v1.466a.25.25 0 0 1-.41.192l-2.36-1.966a.25.25 0 0 1 0-.384l2.36-1.966a.25.25 0 0 1 .41.192V12h6a4 4 0 0 0 3.585-5.777.5.5 0 0 1 .225-.67Z" />
						</svg>
					</div>
				</div>
			</div>
		</section>
	)
}
