export default function SlimNotificationButton() {
   return <div className="mt-7 md:mt-10 flex flex-center highlight-none">
      <a className="inline-flex items-center justify-between px-1 py-1 pr-2 mb-5 text-sm text-gray-700 bg-gray-100 rounded-full dark:bg-gray-800 dark:text-white hover:bg-gray-200 hover:dark:bg-gray-700" role="alert" href="https://github.com/codeAbinash/leetcode-solutions" target="_blank">
         <span className="text-xs bg-blue-700 dark:bg-blue-600 rounded-full text-white px-4 py-1.5 font-[450] mr-3">Contribute</span>
         <span className="mr-2 text-sm">Contribute to this Project</span><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true" className="w-5 h-5"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
      </a>
   </div>
}