import gulp from 'gulp'
import cleanCSS from 'gulp-clean-css'
import clean from 'gulp-clean'
import replace from 'gulp-replace'
import image from 'gulp-imagemin'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'
import concatCss from 'gulp-concat-css'


const inpitDir = 'src'
const outputDir = 'dist'
const path = {
  input: {
    js: inpitDir + '/js/main.js',
    css: inpitDir + '/css/',
    html: inpitDir + '/index.html',
    image: inpitDir + '/img/*',
    font: inpitDir + '/fonts/*',
    favicon: inpitDir + '/favicon.ico',
  },
  output: {
    js: outputDir,
    css: outputDir,
    html: outputDir,
    image: outputDir + '/img',
    font: outputDir + '/fonts',
    favicon: outputDir,
  },
}

const js = () => gulp.src(path.input.js)
  .pipe(rename('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest(path.output.js))

export const css = () => gulp.src(path.input.css + 'main.css')
  .pipe(concatCss('style.css'))
  .pipe(rename('style.css'))
  .pipe(cleanCSS({
    compatibility: 'ie8',
    rebaseTo: 'outputDir'
  }))
  .pipe(gulp.dest(path.output.css))

const cleanDist = () => gulp.src(outputDir + '/*', { read: false })
  .pipe(clean())

const html = () => gulp.src(path.input.html)
  .pipe(replace('<link rel="stylesheet" href="./css/main.css" />', '<link rel="stylesheet" href="./style.css" />'))
  .pipe(replace('<script defer src="./js/main.js"></script>', '<script defer src="./app.js"></script>'))
  .pipe(gulp.dest(path.output.html))

const images = () => gulp.src(path.input.image)
  .pipe(image())
  .pipe(gulp.dest(path.output.image))

const fonts = () => gulp.src(path.input.font)
  .pipe(gulp.dest(path.output.font))

const favicon = () => gulp.src(path.input.favicon)
  .pipe(gulp.dest(path.output.favicon))

export const dev = () => {
  gulp.watch(path.input.js, js)
  gulp.watch(path.input.css + '**/*.css', css)
  gulp.watch(path.input.html, html)
}

export default gulp.series(
  cleanDist,
  gulp.parallel(
    css,
    html,
    js,
    favicon,
    images,
    fonts
  ),
)
