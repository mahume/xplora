const fs = require('fs');

exports.icon = name => fs.readFileSync(`./public/images/icons/${name}.svg`);

exports.siteName = 'Xplora';

exports.menu = [
  { slug: '/stores', title: 'Stores', icon: 'store' },
  { slug: '/tags', title: 'Tags', icon: 'tag' },
  { slug: '/top', title: 'Top', icon: 'top' },
  { slug: '/add', title: 'Add', icon: 'add' },
  { slug: '/map', title: 'Map', icon: 'map' },
];
