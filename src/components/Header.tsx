import icons from "../assets/icons/icons";


export default function Header() {
	return <header className="sticky top-[-1px] border-b border-gray-200 dark:border-gray-800 z-50">
		<nav className="bg-white/80 border-gray-200 px-4 py-3 md:py-4 lg:px-6 backdrop-blur-lg dark:bg-gray-900/80 h-[60px] md:h-[75px]">
			<div className="flex flex-wrap justify-between items-center mx-auto max-w-screen-xl">
				<a href="#" className="flex items-center">
					<img src={icons.logo192} className="mr-3 h-8 lg:h-10 rounded-full" alt="LeetCode Solutions Logo" />
					<span className="self-center text-md lg:text-xl font-semibold whitespace-nowrap dark:text-white">LeetCode Solutions</span>
				</a>
				<div className="flex items-center lg:order-2 no-highlight">
					<div className="p-1.5 tap95 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
						{/* <img src={icons.search_black_48dp} alt="Search Icon" className="opacity-60 h-6 dark:invert" /> */}
						<svg className="opacity-50" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="m19 19-3.5-3.5"></path><circle cx="11" cy="11" r="6"></circle></svg>
					</div>
					<button type="button" className="tap95 inline-flex items-center p-1.5 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="mobile-menu-2" aria-expanded="false">
						<span className="sr-only">Open main menu</span>
						<svg width="24" height="24" fill="none" aria-hidden="true"><path d="M12 6v.01M12 12v.01M12 18v.01M12 7a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm0 6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
						{/* <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd"></path></svg> */}
						<svg className="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
					</button>
				</div>
				<div className="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
					<ul className="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
						<li>
							<a href="#" className="block py-2 pr-4 pl-3 text-gray-900 rounded bg-primary-700 lg:bg-transparent lg:text-primary-700 lg:p-0 dark:text-white" aria-current="page">Home</a>
						</li>
						<li>
							<a href="#solutionsTabs" className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Solutions</a>
						</li>
						<li>
							<a target="_blank" href="https://github.com/codeAbinash/leetcode-solutions/tree/main/leetcode/problems" className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Files</a>
						</li>
						<li>
							<a target="_blank" href="https://github.com/codeAbinash/leetcode-solutions/graphs/contributors" className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Contributors</a>
						</li>
						<li>
							<a target="_blank" href="https://github.com/codeAbinash/leetcode-solutions/" className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Github</a>
						</li>
						<li>
							<a target="_blank" href="https://github.com/codeAbinash/leetcode-solutions-web/" className="block py-2 pr-4 pl-3 text-gray-500 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:hover:text-primary-700 lg:p-0 dark:text-gray-400 lg:dark:hover:text-white dark:hover:bg-gray-700 dark:hover:text-white lg:dark:hover:bg-transparent dark:border-gray-700">Development</a>
						</li>
					</ul>
				</div>
			</div>
		</nav>
	</header>
}

// export default function Header() {
// 	const headerTitle = useRef<HTMLParagraphElement>(null)
// 	const [isIntersecting, setIsIntersecting] = useState(true)

// 	// onsearch
// 	useEffect(() => {
// 		headerIntersect(headerTitle.current as Element, setIsIntersecting)
// 		// headerTitle.current?.scrollIntoView()
// 	}, [])
// 	return <>
// 		<header>
// 			<div className="px-5 pt-4 pb-2 heading flex flex-row justify-between items-center gap-2">
// 				<p className='text-xl font-bold' ref={headerTitle}>LeetCode Solutions</p>
// 			</div>
// 		</header>
// 		<div className="sticky top-0">
// 			<div className={`${isIntersecting ? '' : 'shadow-sm dark:shadow-[#77777715]'} mt-[-1px] transition input-div px-5 py-3
// 								sticky top-0 z-50 bg-white/70 dark:bg-black/60 backdrop-blur-md`}>
// 				<div className='flex rounded-[var(--border-radius)] dark:bg-[#fff]/10 font-[470] bg-[#0000000f]'>
// 					<div className="search-icon flex justify-center items-center pl-3.5">
// 						<img src={icons.search_black_48dp} className='h-[1.65rem] w-[1.65rem] dark:invert opacity-30' />
// 					</div>
// 					<input type="search" placeholder="Search Problems"
// 						className='search-full font-[470] bg-transparent placeholder:text-[#000]/30 dark:placeholder:text-[#fff]/30'
// 					/>
// 				</div>
// 			</div>
// 		</div>
// 	</>
// }