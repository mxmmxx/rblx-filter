// Example usage of "filter.js"
const filterText = require('./filter');

(async () => {
    const text = 'hi this is cool text, phrases such as lmao will be filtered.';

    const filteredText = await filterText(text);

    console.log('Unfiltered text:', text);
    console.log('Filtered text:', filteredText);
})()