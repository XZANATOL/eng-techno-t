"use client";

import { useEffect, useState, useCallback } from "react"
import Image from "next/image"

import Header from "@/lib/components/header/header"
import PodCastListView from "@/lib/components/podCastListView/podCastListView"
import AudioPlayer from "@/lib/components/audioPlayer/audioPlayer"
import ArticleView from "@/lib/components/articleView/articleView"

// interfaces
import { PodcastRecords } from "@/lib/interfaces/podcastRecords"
import { Article } from "@/lib/interfaces/article"
import { CurrentAudio } from "@/lib/interfaces/currentAudio"

import "./page.css"

export default function Home() {
  const [podcasts, setPodcasts] = useState<PodcastRecords[] | null>(null)

  const [articleID, setArticleID] = useState<string | null>(null)
  const [currentArticle, setCurrentArticle] = useState<Article | null>(null)
  const [currentAudio, setCurrentAudio] = useState<CurrentAudio | null>(null)

  const getArticle = useCallback(async () => {
    if (articleID === null) return;
    const articleRes = await fetch(`/api/get-article?id=${articleID}`)
    const articleJSON = await articleRes.json()
    setCurrentArticle(articleJSON.data ? articleJSON.data : null)
  }, [articleID, setCurrentArticle])

  const removeArticle = () => {
    setArticleID(null)
    setCurrentArticle(null)
  }

  useEffect(() => {
    const fetchPodcasts = async () => {
      const podcastsRes = await fetch("/api/get-podcasts")
      const podcastsJSON = await podcastsRes.json()
      setPodcasts(podcastsJSON.data) 
    }
    fetchPodcasts()
  }, [])

  useEffect(() => {
    getArticle()
  }, [articleID, getArticle])

  return (
    <section className="row gx-0 h-100">
      <div className="col-12 col-lg-8">
        <Header />
        {
          articleID !== null ?
            <ArticleView
              article={currentArticle}
              audioChanger={setCurrentAudio}
              articleRemover={removeArticle}
            />
          :
            <PodCastListView
              records={podcasts}
              audioChanger={setCurrentAudio}
              articleIDChanger={setArticleID}
            />
        }
      </div>

      <div className="col-12 col-lg-4 player-section-wrapper">
        <Image
          src="/public/logo-player.png"
          alt="player logo"
          fill
          className="logo-wrapper d-none d-lg-block"
        />

        <AudioPlayer
          imgURL={currentAudio?.imgURL}
          audioURL={currentAudio?.audioURL}
          title={currentAudio?.title}
          author={currentAudio?.author}
        />
      </div>
    </section>
  );
}
