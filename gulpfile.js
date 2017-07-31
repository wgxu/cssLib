/**
 * auther: xuwg
 * createTime: 2017/4/17 0017
 * describe: [gulp工程打包文件]
 */

var config = require('./config.js'),
    gulp = require('gulp'),
    sass = require('gulp-sass'),
    contact = require('gulp-concat'),
    connect = require('gulp-connect');


// 打包项目util文件（工具文件）
gulp.task('build-util',function () {
    gulp.src(config.url.utilArr)
       .pipe(contact('util.js'))
       .pipe(gulp.dest(config.sourceUrl + 'util'))
    　 .pipe(connect.reload());
});

//实时刷新页面
gulp.task('html',function () {
   gulp.src(['./src/module/**/*.html'])
       .pipe(connect.reload());
});


//定义livereload服务（浏览器实时刷新）
gulp.task('connect',function () {
    connect.server({
        livereload: true
    });
});

//定义业务sass打包 任务
gulp.task('sass',function () {
    gulp.src(config.url.sassArr)
        .pipe(contact('style.css'))
        .pipe(sass())
        .pipe(gulp.dest('./src/static/style/'))
        .pipe(connect.reload());
});

//定义公用sass打包任务
gulp.task('commSass',function () {
    gulp.src(config.url.commCssArr)
        .pipe(contact('hb.css'))
        .pipe(sass())
        .pipe(gulp.dest('./src/module/comm/css'))
        .pipe(connect.reload());
});

//定义看守任务
gulp.task('watch',function () {
    gulp.watch('src/scss/**/*.scss',['commSass']);
    gulp.watch('src/module/**/*.html',['html']);
    gulp.watch('src/module/**/*.js',['html']);
    gulp.watch('src/util/**/*.js',['build-util']);
});

//设置默认任务
gulp.task('default',['watch','connect','html','build-util','commSass']);
