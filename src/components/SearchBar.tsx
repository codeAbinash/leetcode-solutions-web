import React from 'react';

export default function SearchBar({ onChange, onSearch }: { onChange?: Function; onSearch: Function }) {
  const searchInput = React.useRef<HTMLInputElement>(null);
  const keyDownHandler = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === 'k') {
      searchInput.current?.focus();
      event.preventDefault();
    }
  };
  React.useEffect(() => {
    window.addEventListener('keydown', keyDownHandler);

    return () => {
      window.removeEventListener('keydown', keyDownHandler);
    };
  }, []);

  return (
    <div className='mt-10 lg:mt-16'>
      <div className='mx-auto flex max-w-2xl items-center'>
        <label htmlFor='simple-search' className='sr-only'>
          Search
        </label>
        <div className='relative w-full'>
          <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3'>
            <svg
              aria-hidden='true'
              className='h-5 w-5 text-gray-500 dark:text-gray-400'
              fill='currentColor'
              viewBox='0 0 20 20'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                fillRule='evenodd'
                d='M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z'
                clipRule='evenodd'
              ></path>
            </svg>
          </div>
          <input
            onKeyDown={(e: any) => {
              if (e.keyCode === 13) {
                onSearch(e.target.value);
                // If it is blank then don't blur
                if (e.target.value.trim() === '') return;
                searchInput.current?.blur();
              } else onChange && onChange(e.target.value);
            }}
            ref={searchInput}
            type='search'
            id='simple-search'
            className='block w-full rounded-xl border-2 border-gray-200 bg-gray-50/60 p-3 pl-10 text-sm text-gray-900 outline-none focus:border-blue-500 focus:ring-blue-500 dark:border-gray-700/50 dark:bg-gray-800 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500 md:p-3.5 md:pl-11'
            placeholder='Paste LeetCode link or problem name (Ctrl+k)'
            required
          />
        </div>
        <button
          onClick={() => {
            searchInput.current ? onSearch(searchInput.current.value) : onSearch('');
          }}
          className='no-highlight ml-2 rounded-xl bg-blue-500 p-3 text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800 md:p-3.5'
        >
          <svg
            className='h-5 w-5'
            fill='none'
            stroke='currentColor'
            viewBox='0 0 24 24'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
            ></path>
          </svg>
          <span className='sr-only'>Search</span>
        </button>
      </div>
    </div>
  );
}
