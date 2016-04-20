module.exports = function() {

  return {
    source: './_source',
    client: './_client',
    build: './build',
    src: {
      styles: '/sass',
      scripts: '/scripts',
      fonts: '/font'
    },
    dest: {
      styles: '/styles',
      scripts: '/scripts',
      fonts: '/font'
    }
  };

}();
