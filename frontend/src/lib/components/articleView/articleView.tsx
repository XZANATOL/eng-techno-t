"use client"

import { RichText } from "@payloadcms/richtext-lexical/react";
import { useEffect, useRef } from "react"

// interfaces
import { Article } from "@/lib/interfaces/article"
import { CurrentAudio } from "@/lib/interfaces/currentAudio"

import "./articleView.css"

interface ArticleViewProps {
	article: Article | null;
	audioChanger: React.Dispatch<React.SetStateAction<CurrentAudio | null>>;
	articleRemover: () => void;
}

export default function ArticleView({article, audioChanger, articleRemover}: ArticleViewProps){
	const headerRef = useRef<HTMLDivElement>(null)

	const changeAudioHandler = () => (
		audioChanger({
			imgURL: article?.imgURL,
			audioURL: article?.audioURL,
			title: article?.title,
			author: article?.author
		})
	)

	useEffect(() => {
		if (!headerRef.current) return;
		headerRef.current.style.backgroundImage = `url(${article?.imgURL})`

	}, [article])

	return (
		<section className="container">
			<div className="articleView">
				<div ref={headerRef} className="header-wrapper">
					<button className="button-base back-button">
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onClick={articleRemover}>
						  <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0"/>
						</svg>
					</button>

					<button className="button-base play-button" onClick={changeAudioHandler}>
						<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16">
						  <path d="m11.596 8.697-6.363 3.692c-.54.313-1.233-.066-1.233-.697V4.308c0-.63.692-1.01 1.233-.696l6.363 3.692a.802.802 0 0 1 0 1.393"/>
						</svg>
					</button>
				</div>

				<div className="title-wrapper">
					<h1>{article?.title}</h1>
					<span>{article?.author} . {article?.date} . {article?.duration}</span>
				</div>

				<RichText data={article?.content} />
			</div>
		</section>
	)
}