  'use strict';

  var gulp = require('gulp'),
	jade = require('gulp-jade'),
  // coffee = require('gulp-coffee'),
  less = require('gulp-less'),
  path = require('path'),
  concatCss = require('gulp-concat-css'),
  uglifycss = require('gulp-uglifycss'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
  watch = require('gulp-watch'),
  livereload = require('gulp-livereload'),
  connect = require('gulp-connect'),
  autoprefixer = require('gulp-autoprefixer'),
  imagemin = require('gulp-imagemin'),
  pngcrush = require('imagemin-pngcrush'),
  mainBowerFiles = require('main-bower-files');
	
  var paths = {
    
    coffee: './coffee/*.coffee',
    jade: './jade/*.jade',
    js: './js/*.js',
    less: './less/*.less',
    css: './css/*.css',
    bcss: '/dist/bower_components/bootstrap/dist/css/bootstrap.css',
    html: 'dist/index.html',
    images: './img/**/*',
    bower: '/bower_components/'
  };

 /* // Coffee
  gulp.task('coffee', function() {
  gulp.src(paths.coffee)
    .pipe(coffee())
    .pipe(gulp.dest('./js/'));
  });
*/
  //Bower
  gulp.task('bower', function() {
    return gulp.src(mainBowerFiles({ base: paths.bower }))
        .pipe(gulp.dest('./dist/assets/'));
});

  //Javacsript compress
  gulp.task('scripts', function() {
  gulp.src(paths.js)
    .pipe(uglify())
    .pipe(concat('all.min.js'))      
    .pipe(gulp.dest('./dist/js/'))
    .pipe(connect.reload());
});

  //jade
  gulp.task('jade', function() {
    var YOUR_LOCALS = {};

    gulp.src(paths.jade)
      .pipe(jade({
        locals: YOUR_LOCALS
      }))
      .pipe(gulp.dest('./dist/'));
  });

  //Less
  gulp.task('less', function () {
  gulp.src(paths.less)
    .pipe(less())
    .pipe(gulp.dest('./css/'));
});
  // Concat & Uglify concatCss
  gulp.task('css', function () {
  gulp.src(paths.css)
    .pipe(concatCss("all.min.css"))
    .pipe(autoprefixer())
    .pipe(uglifycss())
    .pipe(gulp.dest('./dist/css/'))
    .pipe(connect.reload());
});
  //Html
  gulp.task('html', function () {
    gulp.src('dist/index.html')
    .pipe(connect.reload());
  });
  //Image minification
  gulp.task('images', function() {
  gulp.src(paths.images)    
    .pipe(imagemin({
      optimizationLevel: 6,
      progressive: true,
      svgoPlugins: [{removeViewBox: false}],
      use: [pngcrush()]
    }))  
    .pipe(gulp.dest('dist/img'));
  });


  //watch
  gulp.task('watch', function () {
    gulp.watch(paths.less, ['less']);
    gulp.watch(paths.jade, ['jade']);
    gulp.watch(paths.js, ['scripts']);
    gulp.watch(paths.css, ['css']);
    gulp.watch(paths.html, ['html']);
    //gulp.watch(paths.coffee, ['coffee']);
   

    
  });

  gulp.task('connect', function() {
  connect.server({
    root: 'dist',
    livereload: true
  });
});

gulp.task('default', ['connect','html','css', 'scripts', 'watch' ]);