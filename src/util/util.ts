export const LANGUAGES = ['C++', 'Java', 'Python', 'C', 'JavaScript', 'TypeScript', 'Rust'];
export const FILE_EXTENSIONS = ['cpp', 'java', 'py', 'c', 'js', 'ts', 'rs'];

export const HIGHLIGHT_TYPES = [
  'language-clike',
  'language-java',
  'language-python',
  'language-clike',
  'language-javascript',
  'language-typescript',
  'language-rust',
];

export const CODE_NOT_FOUND_TEXT = `No solution found for this problem.
Maybe this problem is not solved yet.
You can contribute to this project by solving this problem.
Github : https://github.com/codeAbinash/leetcocode-solutions/`;

export function extractFileNameLink(searchStr: string) {
  searchStr = searchStr.trim().toLowerCase();
  if (!searchStr) return null;
  if (searchStr.includes('leetcode.com')) {
    searchStr = searchStr.replace('https://leetcode.com/problems/', '');
    if (searchStr.includes('/')) searchStr = searchStr.substring(0, searchStr.indexOf('/'));
  }
  searchStr = searchStr.split(' ').join('-');
  return searchStr;
}

export function findInitialIndex(codes: string[]) {
  for (let i = 0; i < codes.length; i++) {
    if (codes[i]) return i;
  }
  return 0;
}

export async function loadCodes(searchStr: string) {
  const codes = Array.from({ length: LANGUAGES.length }, () => '');
  const promises = LANGUAGES.map(async (_, index) => {
    const link = `https://codeAbinash.github.io/leetcode-solutions/leetcode/problems/${FILE_EXTENSIONS[index]}/${searchStr}.${FILE_EXTENSIONS[index]}`;
    const response = await fetch(link);
    if (response.status === 200) {
      const code = await response.text();
      codes[index] = code;
    }
  });
  await Promise.all(promises);
  return codes;
}

export function generateLineNumbers(code: string) {
  let lineNumbers = '';
  let len = code.length;
  let count = 1;
  for (let i = 0; i < len; i++) {
    if (code[i] == '\n') {
      lineNumbers += count + '\n';
      count++;
    }
  }
  lineNumbers += count;
  return lineNumbers;
}

export function availableTabs(codes: string[]) {
  const available = Array.from({ length: LANGUAGES.length }, () => false);
  codes.forEach((code, index) => {
    if (code) available[index] = true;
  });
  return available;
}
