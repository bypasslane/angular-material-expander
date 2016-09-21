var srcPath = 'src/';
var appPath = 'testApp/';
var publicPath = 'public/';
var buildPath = 'dist/';



exports.paths = {
  src: srcPath,
  app: appPath,
  public: publicPath,
  build: buildPath,
  scripts: [srcPath+'mdCalendar.js', srcPath+'*.js', srcPath+'**/*.js', '!'+srcPath+'*spec.js', '!'+srcPath+'**/*spec.js'],
  appScripts: [appPath+'app.js', appPath+'*.js', appPath+'**/*.js'],
  css: [srcPath+'*.scss', srcPath+'*.css', '!'+srcPath+'*spec.css', '!'+srcPath+'*-theme.scss'],
  appCss: [appPath+'style.css', appPath+'**/*.css'],
  injectCss: [publicPath+'*.css', publicPath+'**/*.css'],
  partials: [appPath+'**/*.html'],
  icons: [srcPath+'**/*.svg'],
  bower: './bower.json'
};
