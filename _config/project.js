module.exports = function() {

  return {
    source: './_source',
    public: './public',
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
