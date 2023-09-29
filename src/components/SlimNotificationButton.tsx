export default function SlimNotificationButton() {
  return (
    <div className='flex-center highlight-none mt-7 flex md:mt-10'>
      <a
        aria-label='Contribute'
        className='mb-5 inline-flex items-center justify-between rounded-full bg-gray-100 px-1 py-1 pr-2 text-sm text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-white hover:dark:bg-gray-700'
        role='alert'
        href='https://github.com/codeAbinash/leetcode-solutions'
        target='_blank'
      >
        <span className='mr-3 rounded-full bg-blue-700 px-4 py-1.5 text-xs font-[450] text-white dark:bg-blue-600'>
          Contribute
        </span>
        <span className='mr-2 text-sm'>Contribute to this Project</span>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          viewBox='0 0 20 20'
          fill='currentColor'
          aria-hidden='true'
          className='h-5 w-5'
        >
          <path
            fillRule='evenodd'
            d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
            clipRule='evenodd'
          ></path>
        </svg>
      </a>
    </div>
  );
}
