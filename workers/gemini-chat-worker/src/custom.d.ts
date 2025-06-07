// This declaration allows importing .txt files as raw strings using the ?raw suffix
// e.g., import myText from './myFile.txt?raw';
declare module '*.txt?raw' {
  const content: string;
  export default content;
}
