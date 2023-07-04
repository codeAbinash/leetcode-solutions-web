import { useEffect, useRef, useState } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";
import SlimNotificationButton from "../components/SlimNotificationButton";
import Tabs from "../components/Tabs";
import highlight from "../lib/prism";
import { CODE_NOT_FOUND_TEXT, FILE_EXTENSIONS, HIGHLIGHT_TYPES, LANGUAGES, availableTabs, extractFileNameLink, findInitialIndex, generateLineNumbers, loadCodes } from "../util/util";
import Loading from "../components/Loading";
import Hero from "../components/Hero";
import quotes from "../quotes.json";

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)]


let codes: string[] = []
let currentSearchedProblem = ''

export default function Home() {
   const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0])
   const [currentCodeIndex, setCurrentCodeIndex] = useState(0)
   const [isLoading, setIsLoading] = useState(false)
   const tabsRef = useRef<HTMLDivElement>(null)
   const [currentCode, setCurrentCode] = useState('')

   async function onSearch(txt: string, scroll: boolean = true) {
      let extracted = extractFileNameLink(txt)
      if (extracted) {
         // setSearchStr(extracted)
         setIsLoading(true)
         scroll && setTimeout(() => { if (tabsRef.current) tabsRef.current.scrollIntoView({ behavior: 'smooth' }) }, 100);
         codes = await loadCodes(extracted)
         setCurrentCodeIndex(() => findInitialIndex(codes))
         setCurrentCode(codes[currentCodeIndex] || '')
         currentSearchedProblem = extracted
         setIsLoading(false)
      }
   }

   useEffect(() => {
      setCurrentLanguage(LANGUAGES[currentCodeIndex])
      setCurrentCode(codes[currentCodeIndex] || '')
   }, [currentCodeIndex])

   useEffect(() => {
      if (!isLoading && currentCode) highlight()
   }, [isLoading, currentCode])


   useEffect(() => {
      onSearch('hello-world', false)
   }, [])

   return <div className="screen bg-white dark:bg-[#0b1121]">
      <Header />
      <div className="bg-image bg-hero-pattern-light dark:bg-hero-pattern-dark mx-auto pt-4 md:pt-6">
         <div className="p-4 dark:text-white max-w-5xl mx-auto min-h-[60vh] md:min-h-[80vh] pb-[15vh] flex flex-col justify-center items-center">
            <div>
               <Hero />
               <SlimNotificationButton />
               <SearchBar onSearch={(txt: string) => { onSearch(txt) }} />
               <div className="flex-center mt-3 hidden md:flex text-sm">
                  <code className="bg-white/10 px-2 rounded-md ml-1">Ctrl+k</code>
               </div>
            </div>
         </div>
      </div>

      <div className="tabs scroll-margin-header" ref={tabsRef} id="solutionsTabs">
         <div className="bg-hero-pattern-light bg-image w-full pb-12">
            <div className="min-h-[80vh]">
               <Tabs active={currentLanguage} available={availableTabs(codes)} setTabValue={setCurrentCodeIndex} />
               <div className="max-w-5xl mx-auto p-4">
                  <div className="pb-5 pt-2 pl-2">
                     <p className="text-lg md:text-xl font-medium">{currentSearchedProblem}</p>
                  </div>
                  <div className="border-slate-500/30 border rounded-xl bg-gray-900/30 backdrop-blur-3xl text-[0.8rem] md:text-[0.9rem] lg:text-[1.05rem]">
                     <div>
                        <CodeHeader currentCode={currentCode} currentIndex={currentCodeIndex} />
                        <Code currentCode={currentCode} isLoading={isLoading} currentCodeIndex={currentCodeIndex} />
                     </div>
                  </div>
               </div>
               <Quote />

            </div>
         </div>
      </div>
      <Footer />
   </div >
}

function Quote() {
   console.log(randomQuote)
   return <figure className="max-w-screen-md mx-auto text-center mt-10 p-4">
      <svg className="w-10 h-10 mx-auto mb-3 text-gray-400 dark:text-gray-600" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 18 14">
         <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
      </svg>
      <blockquote>
         <p className="text-2xl italic font-medium text-gray-900 dark:text-white">{randomQuote.quote}</p>
      </blockquote>
      <figcaption className="flex items-center justify-center mt-6 space-x-3">
         <div className="flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700">
            <cite className="pr-3 font-medium text-gray-900 dark:text-white">
               ~ {randomQuote.author}</cite>
         </div>
      </figcaption>
   </figure>
}

function Code({ currentCode, isLoading, currentCodeIndex }: { currentCode: string, isLoading: boolean, currentCodeIndex: number }) {
   if (isLoading)
      return <div className="Code flex gap-3 p-8 flex-col overflow-auto">
         <Loading />
      </div>

   return <div className="Code flex gap-3 p-4">
      <div className="line-numbers select-none opacity-70">
         <pre><code>{generateLineNumbers(currentCode || CODE_NOT_FOUND_TEXT)}</code></pre>
      </div>
      <pre className="overflow-auto scrollbar-hidden">
         <code className={currentCode ? HIGHLIGHT_TYPES[currentCodeIndex] : 'text'}>
            {currentCode || CODE_NOT_FOUND_TEXT}
         </code>
      </pre>
   </div>
}

function CodeHeader({ currentCode, currentIndex }: { currentCode: string, currentIndex: number }) {
   const copyTextRef = useRef<HTMLDivElement>(null)
   const ext = FILE_EXTENSIONS[currentIndex]
   const fileName = `${currentSearchedProblem}.${ext}`
   const editLink = `https://github.com/codeAbinash/leetcode-solutions/edit/main/leetcode/problems/${ext}/${fileName}`
   const fileLink = `https://github.com/codeAbinash/leetcode-solutions/blob/main/leetcode/problems/${ext}/${fileName}`
   const fileDownloadLink = `https://codeabinash.github.io/leetcode-solutions/leetcode/problems//${ext}/${fileName}`
   const blameLink = `https://github.com/codeAbinash/leetcode-solutions/blame/main/leetcode/problems/${ext}/${fileName}`
   const leetCodeLink = `https://leetcode.com/problems/${currentSearchedProblem}/`

   return <div className="flex-none select-none flex items-center gap-3 border-b border-slate-500/30 p-1 overflow-auto scrollbar-hidden font-[450]">
      <div className="flex items-center h-8 space-x-1.5 px-3">
         <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
         <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
         <div className="w-2.5 h-2.5 bg-slate-600 rounded-full"></div>
      </div>
      <div className="flex gap-5 no-highlight text-sm pr-4">
         <p className="cursor-pointer opacity-70 hover:opacity-100" ref={copyTextRef} onClick={() => {
            if (copyTextRef.current) {
               copyTextRef.current.classList.add('limegreen')
               copyTextRef.current.innerText = 'Copied!'
               setTimeout(() => {
                  if (copyTextRef.current) copyTextRef.current.classList.remove('limegreen')
                  if (copyTextRef.current) copyTextRef.current.innerText = 'Copy'
               }, 2000)
            }
            navigator.clipboard.writeText(currentCode || CODE_NOT_FOUND_TEXT)
         }}>Copy</p>
         <a href={fileLink} target="_blank" className="cursor-pointer opacity-70 hover:opacity-100">File</a>
         <a href={editLink} target="_blank" className="cursor-pointer opacity-70 hover:opacity-100">Edit</a>
         <a href="#" className="cursor-pointer opacity-70 hover:opacity-100">Search</a>
         <a href={fileDownloadLink} target="_blank" download={true} className="cursor-pointer opacity-70 hover:opacity-100">Download</a>
         <a href={blameLink} target="_blank" className="cursor-pointer opacity-70 hover:opacity-100">Blame</a>
         <a href={leetCodeLink} target="_blank" className="cursor-pointer opacity-70 hover:opacity-100">LeetCode</a>
      </div>
   </div>
}