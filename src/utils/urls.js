/**
 * Decode the provided URLs.
 *
 * If is an invalid URL the the string will be: 'ERROR: Invalid URL!' and not the URL.
 * @param {string[]} urlsToDecode An string array of URls to decode.
 * @returns {string[]} An string array of decoded URls.
 */
const decodeURLs = (urlsToDecode) => {
  const resultDecodedURLs = urlsToDecode
    .filter((url) => url.trim().length > 0)
    .map((url) => {
      let decodedURL = '';
      try {
        decodedURL = decodeURI(url.trim());
        new URL(decodedURL);
      } catch (error) {
        decodedURL = 'ERROR: Invalid URL!';
      }
      return decodedURL;
    });

  return resultDecodedURLs;
};

/**
 * Check if one the URLs include the word: 'ERROR' (case sensitive).
 * @param {string[]} urls An string array of decoded URLs.
 */
const arrayHaveInvalidUrl = (urls) => urls.some((url) => url.includes('ERROR'));

export { decodeURLs, arrayHaveInvalidUrl };
