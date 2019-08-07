const pug = require('pug');
const fs = require('fs');

module.exports.getHtml = (redditUsername, sections) => {
  const html = pug.renderFile('assets/template.pug', {
    redditUsername, sections
  });

  return html;
};

module.exports.getCss = (colors) => {
  return new Promise((resolve, reject) => {
    fs.readFile('assets/styles.css', 'utf8', (err, data) => {
      if(err) {
        reject(err);
      } else {
        let accumulator = '';

        accumulator += `body{background-color:${colors.backgroundColor.value}}`;
        accumulator += `h1{color:${colors.titleTextColor.value}}`;
        accumulator += `h2{color:${colors.titleTextColor.value};background-color:${colors.titleBackgroundColor.value}}`;
        accumulator += `h3{color:${colors.subtitleTextColor.value};background-color:${colors.subtitleBackgroundColor.value}}`;
        accumulator += `p{color:${colors.itemTextColor.value}}`;

        resolve(accumulator.concat(data));
      }
    });
  });
};