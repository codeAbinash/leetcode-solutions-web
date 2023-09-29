import icons from '../assets/icons/icons';
import { LANGUAGES } from '../util/util';

function Tab({
  lang,
  active,
  available,
  setTabValue,
  index,
}: {
  lang: string;
  active: string;
  available: boolean;
  setTabValue: Function;
  index: number;
}) {
  if (!available)
    return (
      <li className='mr-2 cursor-not-allowed opacity-50'>
        <div className='inline-block rounded-t-lg border-b-2 border-transparent p-4'>{lang}</div>
      </li>
    );

  if (active === lang)
    return (
      <li className='mr-2 cursor-pointer'>
        <div
          className='active inline-block rounded-t-lg border-b-2 border-blue-600 p-4 text-blue-600 dark:border-blue-500 dark:text-blue-500'
          aria-current='page'
        >
          {lang}
        </div>
      </li>
    );
  return (
    <li
      className='mr-2  cursor-pointer'
      onClick={() => {
        setTabValue(index);
      }}
    >
      <div className='inline-block rounded-t-lg border-b-2 border-transparent p-4 hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300'>
        {lang}
      </div>
    </li>
  );
}

export default function Tabs({
  active,
  available,
  setTabValue,
}: {
  active: string;
  available: boolean[];
  setTabValue: Function;
}) {
  return (
    <div className='bg-white backdrop-blur-xl dark:bg-gray-900/50'>
      <div className=' mx-auto max-w-5xl'>
        <div className='highlight-none scrollbar-hidden select-none overflow-auto border-b border-gray-200 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400'>
          <ul className='-mb-px flex flex-nowrap'>
            {LANGUAGES.map((language, index) => {
              return (
                <Tab
                  lang={language}
                  active={active}
                  key={index}
                  available={available[index]}
                  setTabValue={setTabValue}
                  index={index}
                />
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
