const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");
const autoprefixer = require("autoprefixer");
const cssnano = require("cssnano");
const postcss = require("gulp-postcss");
const sourcemaps = require("gulp-sourcemaps")

// imagenes
const cache = require('gulp-cache')
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");
const avif = require("gulp-avif");

// JavaScript
const terser = require('gulp-terser-js')


function css(done) {
    src('src/scss/**/*.scss') //  identificar el archivo de SASS
        .pipe(sourcemaps.init())
        .pipe(plumber())
        .pipe(sass())   // Compilarlo 
        .pipe(postcss([autoprefixer(), cssnano()]))
        .pipe(sourcemaps.write('.'))
        .pipe(dest("build/css"))   // almacenarla en el disco duro

    done();// es un callback que avisa a gulp que llegamos al final de la ejecucion de la funcion en esta caso css
}
function imagenes(done) {
    const opciones = {
        optimizationLevel: 3
    }
    src('src/img/**/*.{jpg,png}')
        .pipe(cache(imagemin(opciones)))
        .pipe(dest('build/img'))
    done();
}

function versionWebp(done) {
    const opciones = {
        quality: 50 //esta es la calidad a la que transfomaran las imagenes va de 0 a 100  
    };
    src('src/img/**/*.{jpg,png}') // identificar
        .pipe(webp(opciones))
        .pipe(dest('build/img'))
    done();
}

function versionAvif(done) {
    const opciones = {
        quality: 50 //esta es la calidad a la que transfomaran las imagenes va de 0 a 100  
    };
    src('src/img/**/*.{jpg,png}') // identificar
        .pipe(avif(opciones))
        .pipe(dest('build/img'))
    done();
}
function javascript(done) {
    src('src/js/**/*.js') // identific
        .pipe(sourcemaps.init())
        .pipe(terser())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('build/js'));

    done();
}

function dev(done) {
    watch('src/scss/**/*.scss', css);
    watch('src/js/**/*.js', javascript);
    done();
}

exports.css = css;
exports.js = javascript
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel(imagenes, versionWebp, versionAvif, javascript, dev);
