'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { FishIcon, ThumbsUp, Award } from 'lucide-react'

interface Meme {
  id: number
  imageUrl: string
  caption: string
  votes: number
}

export default function MemePlatform() {
  const [memes, setMemes] = useState<Meme[]>([
    { id: 1, imageUrl: '/placeholder.svg?height=200&width=300', caption: "When you buy the dip but it keeps dipping", votes: 15 },
    { id: 2, imageUrl: '/placeholder.svg?height=200&width=300', caption: "HODLing Greedy Whales be like", votes: 10 },
    { id: 3, imageUrl: '/placeholder.svg?height=200&width=300', caption: "To the moon? Nah, to the ocean floor!", votes: 8 },
  ])
  const [newMemeUrl, setNewMemeUrl] = useState('')
  const [newMemeCaption, setNewMemeCaption] = useState('')

  const handleVote = (id: number) => {
    setMemes(memes.map(meme => 
      meme.id === id ? { ...meme, votes: meme.votes + 1 } : meme
    ))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (newMemeUrl && newMemeCaption) {
      setMemes([...memes, {
        id: memes.length + 1,
        imageUrl: newMemeUrl,
        caption: newMemeCaption,
        votes: 0
      }])
      setNewMemeUrl('')
      setNewMemeCaption('')
    }
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4 flex items-center justify-center">
            <FishIcon className="mr-2 text-blue-400" size={36} />
            Greedy Whales Meme Factory
          </h1>
          <p className="text-xl text-gray-400">Create, share, and vote on the best Greedy Whales memes!</p>
        </header>

        <form onSubmit={handleSubmit} className="mb-12 bg-gray-800 p-6 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Create a New Meme</h2>
          <div className="flex flex-col space-y-4">
            <Input
              type="text"
              placeholder="Enter meme image URL"
              value={newMemeUrl}
              onChange={(e) => setNewMemeUrl(e.target.value)}
              className="bg-gray-700 text-white"
            />
            <Input
              type="text"
              placeholder="Enter meme caption"
              value={newMemeCaption}
              onChange={(e) => setNewMemeCaption(e.target.value)}
              className="bg-gray-700 text-white"
            />
            <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
              Submit Meme
            </Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {memes.sort((a, b) => b.votes - a.votes).map((meme) => (
            <Card key={meme.id} className="bg-gray-800">
              <CardHeader>
                <CardTitle className="flex items-center justify-between">
                  <span>{meme.caption}</span>
                  {meme.votes >= 10 && <Award className="text-yellow-400" />}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <img src={meme.imageUrl} alt={meme.caption} className="w-full h-48 object-cover rounded" />
              </CardContent>
              <CardFooter className="flex justify-between items-center">
                <span>{meme.votes} votes</span>
                <Button 
                  onClick={() => handleVote(meme.id)}
                  className="bg-green-600 hover:bg-green-700"
                >
                  <ThumbsUp className="mr-2" size={16} />
                  Vote
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}