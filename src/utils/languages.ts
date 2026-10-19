// GitHub Linguist colors for the languages used in the project snapshot.
const LANGUAGE_COLORS: Record<string, string> = {
  Dart: '#00B4AB',
  Dockerfile: '#384D54',
  HTML: '#E34C26',
  JavaScript: '#F1E05A',
  'Jupyter Notebook': '#DA5B0B',
  Kotlin: '#A97BFF',
  Python: '#3572A5',
  TypeScript: '#3178C6',
  Vue: '#41B883',
}

export const getLanguageColor = (language: string): string | undefined => {
  return LANGUAGE_COLORS[language]
}
