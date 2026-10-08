const LANGUAGE_COLORS: Record<string, string> = {
  TypeScript: '#3178c6',
  JavaScript: '#f1e05a',
  HTML: '#e34c26',
  CSS: '#563d7c',
  Vue: '#41b883',
  PHP: '#4f5d95',
  Python: '#3572a5',
  Rust: '#dea584',
  Go: '#00add8',
  Shell: '#89e051',
}

export const getLanguageColor = (language?: string): string => {
  if (!language) return '#94a3b8'
  return LANGUAGE_COLORS[language] || '#94a3b8'
}
