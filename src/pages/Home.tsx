import { useEffect, useRef, useState } from 'react';
import Footer from '../components/Footer';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import SlimNotificationButton from '../components/SlimNotificationButton';
import Tabs from '../components/Tabs';
import highlight from '../lib/prism';
import {
  CODE_NOT_FOUND_TEXT,
  FILE_EXTENSIONS,
  HIGHLIGHT_TYPES,
  LANGUAGES,
  availableTabs,
  extractFileNameLink,
  findInitialIndex,
  generateLineNumbers,
  loadCodes,
} from '../util/util';
import Loading from '../components/Loading';
import Hero from '../components/Hero';
import quotes from '../quotes.json';

const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

let codes: string[] = [];
let currentSearchedProblem = '';

function setPageTitle(title: string) {
  if (title === 'hello-world') {
    document.title = 'LeetCode Solutions';
    return;
  }
  document.title = `${title} - Solution`;
}

export default function Home() {
  const [currentLanguage, setCurrentLanguage] = useState(LANGUAGES[0]);
  const [currentCodeIndex, setCurrentCodeIndex] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const tabsRef = useRef<HTMLDivElement>(null);
  const [currentCode, setCurrentCode] = useState('');

  async function onSearch(txt: string, scroll: boolean = true) {
    let extracted = extractFileNameLink(txt);
    if (extracted) {
      // setSearchStr(extracted)
      setIsLoading(true);
      scroll &&
        setTimeout(() => {
          if (tabsRef.current) tabsRef.current.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      codes = await loadCodes(extracted);
      setCurrentCodeIndex(() => findInitialIndex(codes));
      setCurrentCode(codes[currentCodeIndex] || '');
      currentSearchedProblem = extracted;
      setPageTitle(extracted);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    setCurrentLanguage(LANGUAGES[currentCodeIndex]);
    setCurrentCode(codes[currentCodeIndex] || '');
  }, [currentCodeIndex]);

  useEffect(() => {
    if (!isLoading && currentCode) highlight();
  }, [isLoading, currentCode]);

  useEffect(() => {
    onSearch('hello-world', false);
  }, []);

  return (
    <div className='screen bg-white dark:bg-[#0b1121]'>
      <Header />
      <div className='bg-image mx-auto bg-hero-pattern-light pt-4 dark:bg-hero-pattern-dark md:pt-6'>
        <div className='mx-auto flex min-h-[60vh] max-w-5xl flex-col items-center justify-center p-4 pb-[15vh] dark:text-white md:min-h-[80vh]'>
          <div>
            <Hero />
            <SlimNotificationButton />
            <SearchBar
              onSearch={(txt: string) => {
                onSearch(txt);
              }}
            />
            <div className='flex-center mt-3 hidden text-sm md:flex'>
              <code className='ml-1 rounded-md bg-white/10 px-2'>Ctrl+k</code>
            </div>
          </div>
        </div>
      </div>

      <div className='tabs scroll-margin-header' ref={tabsRef} id='solutionsTabs'>
        <div className='bg-image w-full bg-hero-pattern-light pb-12'>
          <div className='min-h-[80vh]'>
            <Tabs active={currentLanguage} available={availableTabs(codes)} setTabValue={setCurrentCodeIndex} />
            <div className='mx-auto max-w-5xl p-4'>
              <div className='pb-5 pl-2 pt-2'>
                <p className='text-lg font-medium md:text-xl'>{currentSearchedProblem}</p>
              </div>
              <div className='rounded-xl border border-slate-500/30 bg-gray-900/30 text-[0.8rem] backdrop-blur-3xl md:text-[0.9rem] lg:text-[1.05rem]'>
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
    </div>
  );
}

function Quote() {
  return (
    <figure className='mx-auto mt-10 max-w-screen-md p-4 text-center'>
      <svg
        className='mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600'
        aria-hidden='true'
        xmlns='http://www.w3.org/2000/svg'
        fill='currentColor'
        viewBox='0 0 18 14'
      >
        <path d='M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z' />
      </svg>
      <blockquote>
        <p className='text-2xl font-medium italic text-gray-900 dark:text-white'>{randomQuote.quote}</p>
      </blockquote>
      <figcaption className='mt-6 flex items-center justify-center space-x-3'>
        <div className='flex items-center divide-x-2 divide-gray-500 dark:divide-gray-700'>
          <cite className='pr-3 font-medium text-gray-900 dark:text-white'>~ {randomQuote.author}</cite>
        </div>
      </figcaption>
    </figure>
  );
}

function Code({
  currentCode,
  isLoading,
  currentCodeIndex,
}: {
  currentCode: string;
  isLoading: boolean;
  currentCodeIndex: number;
}) {
  if (isLoading)
    return (
      <div className='Code flex flex-col gap-3 overflow-auto p-8'>
        <Loading />
      </div>
    );

  return (
    <div className='Code flex gap-3 p-4'>
      <div className='line-numbers select-none opacity-70'>
        <pre>
          <code>{generateLineNumbers(currentCode || CODE_NOT_FOUND_TEXT)}</code>
        </pre>
      </div>
      <pre className='scrollbar-hidden overflow-auto'>
        <code className={currentCode ? HIGHLIGHT_TYPES[currentCodeIndex] : 'text'}>
          {currentCode || CODE_NOT_FOUND_TEXT}
        </code>
      </pre>
    </div>
  );
}

function CodeHeader({ currentCode, currentIndex }: { currentCode: string; currentIndex: number }) {
  const copyTextRef = useRef<HTMLDivElement>(null);
  const ext = FILE_EXTENSIONS[currentIndex];
  const fileName = `${currentSearchedProblem}.${ext}`;
  const editLink = `https://github.com/codeAbinash/leetcode-solutions/edit/main/leetcode/problems/${ext}/${fileName}`;
  const fileLink = `https://github.com/codeAbinash/leetcode-solutions/blob/main/leetcode/problems/${ext}/${fileName}`;
  const fileDownloadLink = `https://codeabinash.github.io/leetcode-solutions/leetcode/problems//${ext}/${fileName}`;
  const blameLink = `https://github.com/codeAbinash/leetcode-solutions/blame/main/leetcode/problems/${ext}/${fileName}`;
  const leetCodeLink = `https://leetcode.com/problems/${currentSearchedProblem}/`;

  return (
    <div className='scrollbar-hidden flex flex-none select-none items-center gap-3 overflow-auto border-b border-slate-500/30 p-1 font-[450]'>
      <div className='flex h-8 items-center space-x-1.5 px-3'>
        <div className='h-2.5 w-2.5 rounded-full bg-red-500'></div>
        <div className='h-2.5 w-2.5 rounded-full bg-yellow-500'></div>
        <div className='h-2.5 w-2.5 rounded-full bg-green-500'></div>
      </div>
      <div className='no-highlight flex gap-5 pr-4 text-sm'>
        <p
          className='cursor-pointer opacity-70 hover:opacity-100'
          ref={copyTextRef}
          onClick={() => {
            if (copyTextRef.current) {
              copyTextRef.current.classList.add('limegreen');
              copyTextRef.current.innerText = 'Copied!';
              setTimeout(() => {
                if (copyTextRef.current) copyTextRef.current.classList.remove('limegreen');
                if (copyTextRef.current) copyTextRef.current.innerText = 'Copy';
              }, 2000);
            }
            navigator.clipboard.writeText(currentCode || CODE_NOT_FOUND_TEXT);
          }}
        >
          Copy
        </p>
        <a href={fileLink} target='_blank' className='cursor-pointer opacity-70 hover:opacity-100'>
          File
        </a>
        <a href={editLink} target='_blank' className='cursor-pointer opacity-70 hover:opacity-100'>
          Edit
        </a>
        <a href='#' className='cursor-pointer opacity-70 hover:opacity-100'>
          Search
        </a>
        <a
          href={fileDownloadLink}
          target='_blank'
          download={true}
          className='cursor-pointer opacity-70 hover:opacity-100'
        >
          Download
        </a>
        <a href={blameLink} target='_blank' className='cursor-pointer opacity-70 hover:opacity-100'>
          Blame
        </a>
        <a href={leetCodeLink} target='_blank' className='cursor-pointer opacity-70 hover:opacity-100'>
          LeetCode
        </a>
      </div>
    </div>
  );
}
