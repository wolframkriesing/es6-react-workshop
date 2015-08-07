export function useOfflineUrls(s) {
  return s
    .replace('https://cdnjs.cloudflare.com/ajax/libs/', '../vendor/')
    .replace('http://yui.yahooapis.com/', '../vendor/');
}

