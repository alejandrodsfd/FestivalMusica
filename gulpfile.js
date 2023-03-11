const { src, dest, watch, parallel } = require("gulp");
//css
const sass = require("gulp-sass")(require("sass"));
const plumber = require("gulp-plumber");

// imagenes
const cache = require('gulp-cache')
const imagemin = require("gulp-imagemin");
const webp = require("gulp-webp");


function css(done) {
    src('src/scss/**/*.scss') //  identificar el archivo de SASS
        .pipe(plumber())
        .pipe(sass())   // Compilarlo 
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

function dev(done) {
    watch('src/scss/**/*.scss', css);

    done();
}

exports.css = css;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.dev = parallel(imagenes, versionWebp, dev);
