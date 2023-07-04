import React from "react"

export default function SearchBar({ onChange, onSearch }: { onChange?: Function, onSearch: Function }) {
   const searchInput = React.useRef<HTMLInputElement>(null)
   const keyDownHandler = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === "k") {
         searchInput.current?.focus()
         event.preventDefault()
      }
   };
   React.useEffect(() => {
      window.addEventListener("keydown", keyDownHandler);

      return () => {
         window.removeEventListener("keydown", keyDownHandler);
      }
   }, []);


   return <div className="mt-10 lg:mt-16">
      <div className="flex items-center max-w-2xl mx-auto">
         <label htmlFor="simple-search" className="sr-only">Search</label>
         <div className="relative w-full" >
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
               <svg aria-hidden="true" className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input onKeyDown={(e: any) => {
               if (e.keyCode === 13) {
                  onSearch(e.target.value)
                  // If it is blank then don't blur
                  if (e.target.value.trim() === "") return
                  searchInput.current?.blur()
               }
               else
                  onChange && onChange(e.target.value)
            }}
               ref={searchInput}
               type="search" id="simple-search" className="bg-gray-50/60 border-2 outline-none border-gray-200 text-gray-900 text-sm rounded-xl focus:ring-blue-500 focus:border-blue-500 block w-full p-3 md:p-3.5 pl-10 md:pl-11 dark:bg-gray-800 dark:border-gray-700/50 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               placeholder="Paste LeetCode link or problem name (Ctrl+k)" required />
         </div>
         <button
            onClick={() => { searchInput.current ? onSearch(searchInput.current.value) : onSearch("") }}
            className="p-3 md:p-3.5 ml-2 text-sm font-medium text-white bg-blue-500 rounded-xl hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 no-highlight">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            <span className="sr-only">Search</span>
         </button>
      </div>
   </div >
}