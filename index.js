const alfy = require('alfy');

// test code
alfy.fetch('jsonplaceholder.typicode.com/posts').then(data => {
  const items = alfy
    .inputMatches(data, 'title')
    .map(x => ({
      title: x.title,
      subtitle: x.body,
      arg: x.id
    }));

  if (items.length) {
    alfy.output(items);
  } else {
    alfy.output([{
      title: alfy.input,
      subtitle: 'There is no result...'
    }]);
  }
});