'use client'

import React, { useState, useRef, useEffect } from 'react'
import { Bot, Search, Calendar, User, ChevronDown } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"

const exampleConversation = [
  { role: 'user', content: "I'm a digital nomad looking for a vibrant city with good internet and a reasonable cost of living. Any suggestions?" },
  { role: 'assistant', content: "Based on your requirements, I'd recommend Lisbon, Portugal. Here's why:\n<ol><li>Digital nomad-friendly atmosphere</li><li>Reliable internet infrastructure</li><li>Affordable cost of living</li><li>Great work-life balance</li></ol>Would you like more details about Lisbon?" },
  { role: 'user', content: "Lisbon sounds interesting! Can you tell me more about the co-working spaces and the expat community there?" },
  { role: 'assistant', content: "Lisbon's co-working scene and expat community are thriving:\n<ol><li>Popular spaces: Second Home, Heden, IDEA Spaces</li><li>Active expat community with regular events</li><li>Networking via Meetup.com and Facebook groups</li><li>English widely spoken in tech scenes</li><li>Affordable co-working costs (€100-€200/month)</li></ol>Need help finding specific spaces or events?" },
  { role: 'user', content: "This is really helpful! I think I'm convinced. Can you suggest some neighborhoods that are popular among digital nomads?" },
  { role: 'assistant', content: "Great! Here are some popular neighborhoods for digital nomads in Lisbon:\n<ol><li>Bairro Alto: Bustling nightlife, central location</li><li>Cais do Sodré: Trendy, good public transport</li><li>LX Factory (Alcântara): Creative hub, startup-friendly</li><li>Graça: Quiet, great city views</li><li>Intendente: Up-and-coming, affordable</li><li>Santos: Riverside, balanced atmosphere</li></ol>Want more info on any of these areas?" }
]

export function LandingPageUpdated() {
  const [chatMessages, setChatMessages] = useState([
    { role: 'assistant', content: "Hello! Where would you like to travel?" }
  ])
  const [userInput, setUserInput] = useState('')
  const [cityInput, setCityInput] = useState('')
  const [days, setDays] = useState(1)
  const [lookingForOthers, setLookingForOthers] = useState(false)
  const chatEndRef = useRef(null)

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [chatMessages])

  const handleSendMessage = () => {
    if (!userInput.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', content: userInput }, { role: 'assistant', content: `Great choice! ${userInput} is a wonderful destination. How can I help you plan your trip?` }])
    setUserInput('')
  }

  const handleGoClick = () => {
    if (!cityInput.trim()) return
    setChatMessages(prev => [...prev, { role: 'user', content: `I want to go to ${cityInput}` }, { role: 'assistant', content: `Excellent! Let's plan your trip to ${cityInput}. How many days are you planning to stay?` }])
    setCityInput('')
  }

  return (
    <div className="min-h-screen bg-cover bg-center relative" style={{backgroundImage: 'url(https://hebbkx1anhila5yf.public.blob.vercel-storage.com/pedro-lastra-157071-unsplash-Hsx5fx9B2H9jcfMjQZtUZgsvafaKSb.webp)'}}>
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-black/90"></div>
      
      <div className="relative z-10">
        <header className="flex justify-between items-center p-4">
          <div className="flex items-center space-x-2">
            <Bot className="h-8 w-8 text-white" />
            <span className="text-2xl font-bold text-white">TravelwithmAI</span>
          </div>
          <nav>
            <Button variant="destructive" className="mr-2">Check Booking</Button>
            <Button variant="destructive" className="mr-2">User Privacy</Button>
            <Button variant="destructive">Find a New City</Button>
          </nav>
        </header>

        <main className="container mx-auto mt-20 p-6 bg-white/80 rounded-lg shadow-lg max-w-2xl">
          <div className="mb-4 h-40 overflow-y-auto bg-gray-100 p-4 rounded">
            {chatMessages.map((message, index) => (
              <div key={index} className={`mb-4 ${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-3 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                  {message.content}
                </span>
              </div>
            ))}
            <div ref={chatEndRef} />
          </div>
          <div className="flex mb-4">
            <Input
              type="text"
              placeholder="Feeling like Paris... but for Digital Nomads... Here's my budget X..."
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              className="flex-grow mr-2"
            />
            <Button onClick={handleSendMessage}>Send</Button>
          </div>
          <div className="flex flex-col items-center space-y-4 mb-4">
            <div className="w-full">
              <label htmlFor="cityInput" className="block text-sm font-medium text-gray-700 mb-1">
                Already know your City?
              </label>
              <div className="flex">
                <Input
                  id="cityInput"
                  type="text"
                  placeholder="Enter city name"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  className="flex-grow mr-2"
                />
                <Button onClick={handleGoClick} variant="outline" className="bg-white text-red-500 border-red-500 hover:bg-red-50">
                  Go
                </Button>
              </div>
            </div>
            <div className="flex items-center">
              <Calendar className="h-5 w-5 mr-2" />
              <Input
                type="number"
                min="1"
                value={days}
                onChange={(e) => setDays(parseInt(e.target.value))}
                className="w-16 mr-2"
              />
              <span>days</span>
            </div>
          </div>
          <div className="flex items-center justify-center">
            <Checkbox
              id="lookingForOthers"
              checked={lookingForOthers}
              onCheckedChange={setLookingForOthers}
            />
            <label htmlFor="lookingForOthers" className="ml-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Looking for others like you?
            </label>
          </div>
        </main>

        <div className="h-40"></div>

        <section className="container mx-auto p-6 bg-white/80 rounded-lg shadow-lg max-w-2xl">
          <h2 className="text-2xl font-bold mb-6">Examples</h2>
          <div className="space-y-8">
            {exampleConversation.map((message, index) => (
              <div key={index} className={`${message.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-4 rounded-lg ${message.role === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>
                  <div dangerouslySetInnerHTML={{ __html: message.content }} />
                </span>
              </div>
            ))}
          </div>
        </section>

        <div className="text-center mt-8 mb-16">
          <ChevronDown className="h-8 w-8 text-white animate-bounce mx-auto" />
        </div>
      </div>
    </div>
  )
}