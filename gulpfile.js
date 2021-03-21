"use strict"

let prodject_folder = /*require("path").basename(__dirname)*/"dist";
let source_folder = "#src";

let fs = require('fs');

let path = {
    build: {
        html: prodject_folder + "/",
        css: prodject_folder + "/css/",
        js: prodject_folder + "/js/",
        img: prodject_folder + "/img/",
        fonts: prodject_folder + "/fonts/",
    },
    src: {
        html: [source_folder + "/*.pug", "!" + source_folder + "/_*.pug"],
        css:[ source_folder + "/scss/style.scss", source_folder + "component/**/*.scss"],
        js: [ source_folder + "/js/script.js", source_folder + "component/**/*.js"] ,
        img: source_folder + "/img/**/*.{jpg,JPG,png,svg,gif,ico,webp}",
        fonts: source_folder + "/fonts/*.ttf",
    },

    watch: {
        html: source_folder + "/**/*.pug",
        css: source_folder + "/scss/**/*.scss",
        js: source_folder + "/js/**/*.js",
        img: source_folder + "/img/**/*.{jpg,png,svg,gif,ico,webp}",
    },
    clean: "./" + prodject_folder + "/"
}


let {src, dest} = require('gulp'),
    gulp = require('gulp'),
    browsersync = require('browser-sync').create(),
    fileinclude = require('gulp-file-include'),
    del = require('del'),
    scss = require('gulp-sass'),
    pug = require('gulp-pug'),
    stripCssComments = require('gulp-strip-css-comments'),
    //autoprefixer = require('gulp-autoprefixer'),
    group_media = require('gulp-group-css-media-queries'),
    clean_css = require('gulp-clean-css'),
    uglify = require('gulp-uglify-es').default,
    rename = require('gulp-rename'),
    ttf2woff = require('gulp-ttf2woff'),
    ttf2woff2 = require('gulp-ttf2woff2'),
    //babel = require('gulp-babel'),
    fonter = require('gulp-fonter'),
    imagemin = require('gulp-imagemin'),
    svgSprite = require('gulp-svg-sprite');

function browserSync(params) {
    browsersync.init({
        server: {
            baseDir: "./" + prodject_folder + "/"
        },
        port: 3000,
        notify: false
    })
}

function html() {
    return src(path.src.html)
        .pipe(pug({
            pretty:true
        }))
        .pipe(fileinclude())
        .pipe(dest(path.build.html))
        .pipe(browsersync.stream())
}

function css() {
    return src(path.src.css)
        .pipe(stripCssComments())
        .pipe(
            scss({
                outputStyle: "expanded"
            })
        )
        .pipe(
            group_media()
        )
         //.pipe(
         //autoprefixer("last 10 version", ">1%", "ie 9")
          //)
        //.pipe(webpcss())
        .pipe(dest(path.build.css))
        .pipe(clean_css())
        .pipe(
            rename({
                extname: ".min.css"
            })
        )
        .pipe(dest(path.build.css))
        .pipe(browsersync.stream())
}

function js() {
    return src(path.src.js)
        .pipe(fileinclude())
        .pipe(dest(path.build.js))
        .pipe(
            uglify()
        )
        .pipe(
            rename({
                extname: ".min.js"
            })
        )
        .pipe(dest(path.build.js))
        .pipe(browsersync.stream())
}

function images() {
    return src(path.src.img)
        .pipe(
            imagemin({
                interlaced: true,
                progressive: true,
                optimizationLevel: 3,
                svgoPlugins: [{removeViewBox: true}]
            })
        )
        .pipe(dest(path.build.img))
        .pipe(browsersync.stream())
}

function fonts() {
    src(path.src.fonts)
        .pipe(ttf2woff())
        .pipe(dest(path.build.fonts));
    return src(path.src.fonts)
        .pipe(ttf2woff2())
        .pipe(dest(path.build.fonts));

}

gulp.task('otf2ttf', function () {
    return src([source_folder + '/fonts/*.otf'])
        .pipe(fonter({
            formats: ['ttf']
        }))
        .pipe(dest(source_folder + '/fonts/'))

})

gulp.task('svgSprite', function () {
    return gulp.src([source_folder + '/iconsprite/*.svg'])
        .pipe(svgSprite({
            mode: {
                stack: {
                    sprite: "../icons/icons.svg",
                    example: true
                }
            }
        }))
        .pipe(dest(path.build.img))
})

function fontsStyle(params) {

    let file_content = fs.readFileSync(source_folder + '/scss/fonts.scss');
    if (file_content == '') {
        fs.writeFile(source_folder + '/scss/fonts.scss', '', cb);
        return fs.readdir(path.build.fonts, function (err, items) {
            if (items) {
                let c_fontname;
                for (var i = 0; i < items.length; i++) {
                    let fontname = items[i].split('.');
                    fontname = fontname[0];
                    if (c_fontname != fontname) {
                        fs.appendFile(source_folder + '/scss/fonts.scss', '@include font("' + fontname + '", "' + fontname + '", "400", "normal");\r\n', cb);
                    }
                    c_fontname = fontname;
                }
            }
        })
    }
}

function cb() {

}

function watchFiles(params) {
    gulp.watch([path.watch.html], html);
    gulp.watch([path.watch.css], css);
    gulp.watch([path.watch.js], js);
    gulp.watch([path.watch.img], images);
}

function clean(params) {
    return del(path.clean);
}

let build = gulp.series(clean, gulp.parallel(js, css, html, images,/*fonts*/), /*fontsStyle*/);
let watch = gulp.parallel(build, watchFiles, browserSync);

exports.fontsStyle = fontsStyle;
exports.fonts = fonts;
exports.images = images;
exports.js = js;
exports.css = css;
exports.html = html;
exports.build = build;
exports.watch = watch;
exports.default = watch;