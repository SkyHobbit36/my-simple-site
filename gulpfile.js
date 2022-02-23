const { parallel, series, src, dest, watch } = require('gulp')
const cleanCSS = require('gulp-clean-css')
const clean = require('gulp-clean')
const concat = require('gulp-concat')
const replace = require('gulp-replace')

const DIR_NAME = 'dist'

const cleanDist = () => {
  return src(`${DIR_NAME}/*`, { read: false })
    .pipe(clean())
}

const html = () => {
  return src('index.html')
    .pipe(replace('<link rel="stylesheet" href="./css/main.css">', '<link rel="stylesheet" href="style.css">'))
    .pipe(replace('./img/', '../img/'))
    .pipe(dest(DIR_NAME))
}

const css = () => {
  return src('css/**/*.css')
    .pipe(concat('style.css'))
    .pipe(cleanCSS({ compatibility: 'ie8' }))
    .pipe(dest(DIR_NAME))
}

const favicon = () => {
  return src('favicon.ico')
    .pipe(dest(DIR_NAME))
}

exports.default = series(
  cleanDist,
  parallel(css, html, favicon)
)