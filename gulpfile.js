import gulp from 'gulp'
import cleanCSS from 'gulp-clean-css'
import clean from 'gulp-clean'
import concat from 'gulp-concat'
import replace from 'gulp-replace'
import image from 'gulp-imagemin'
import browserSync from 'browser-sync'
import uglify from 'gulp-uglify'
import rename from 'gulp-rename'

browserSync.create()

const OUTPUT_PATH = 'dist'
const CSS_PATH = 'css/**/*.css'
const JS_PATH = 'js/main.js'
const HTML_PATH = 'index.html'

const js = () => gulp.src(JS_PATH)
  .pipe(rename('app.js'))
  .pipe(uglify())
  .pipe(gulp.dest(OUTPUT_PATH))

const cleanDist = () => gulp.src([
  `${OUTPUT_PATH}/*`,
], { read: false })
  .pipe(clean())

const html = () => gulp.src('index.html')
  .pipe(replace('<link rel="stylesheet" href="./css/main.css">', '<link rel="stylesheet" href="style.css">'))
  .pipe(replace('<script defer src="./js/main.js"></script>', '<script defer src="./app.js"></script>'))
  .pipe(gulp.dest(OUTPUT_PATH))

const css = () => gulp.src(CSS_PATH)
  .pipe(concat('style.css'))
  .pipe(cleanCSS({ compatibility: 'ie8' }))
  .pipe(gulp.dest(OUTPUT_PATH))

const favicon = () => gulp.src('favicon.ico')
  .pipe(gulp.dest(OUTPUT_PATH))

const images = () => gulp.src('img/*')
  .pipe(image())
  .pipe(gulp.dest(`${OUTPUT_PATH}/img`))

const fonts = () => gulp.src('fonts/*')
  .pipe(gulp.dest(`${OUTPUT_PATH}/fonts`))


const watcher = gulp.watch([CSS_PATH, JS_PATH, HTML_PATH])

export const watch = () => {
  browserSync.init({
    server: {
      baseDir: './'
    }
  })

  watcher.on('change', browserSync.reload)
}

export const dev = gulp.series(
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
