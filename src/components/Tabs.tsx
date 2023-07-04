import icons from "../assets/icons/icons";
import { LANGUAGES } from "../util/util";


function Tab({ lang, active, available, setTabValue, index }: { lang: string, active: string, available: boolean, setTabValue: Function, index: number }) {
   if (!available)
      return <li className="mr-2 cursor-not-allowed opacity-50">
         <div className="inline-block p-4 border-b-2 border-transparent rounded-t-lg">{lang}</div>
      </li>

   if (active === lang)
      return <li className="mr-2 cursor-pointer">
         <div className="inline-block p-4 text-blue-600 border-b-2 border-blue-600 rounded-t-lg active dark:text-blue-500 dark:border-blue-500" aria-current="page">{lang}</div>
      </li>
   return <li className="mr-2  cursor-pointer" onClick={() => {
      setTabValue(index)
   }}>
      <div className="inline-block p-4 border-b-2 border-transparent rounded-t-lg hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300">{lang}</div>
   </li>
}

export default function Tabs({ active, available, setTabValue }: { active: string, available: boolean[], setTabValue: Function }) {
   return <div className="bg-white dark:bg-gray-900/50 backdrop-blur-xl">
      <div className=" max-w-5xl mx-auto">

         <div className="highlight-none select-none text-sm overflow-auto scrollbar-hidden font-medium text-center text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
            <ul className="flex flex-nowrap -mb-px">
               {
                  LANGUAGES.map((language, index) => {
                     return <Tab lang={language} active={active} key={index} available={available[index]} setTabValue={setTabValue} index={index} />
                  })
               }
            </ul>
         </div>
      </div>
   </div>
}