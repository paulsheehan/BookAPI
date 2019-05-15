var gulp = require('gulp'),
    nodemon = require('gulp-nodemon');

var port = 8000;
gulp.task('default', function() {
   nodemon({
       script: 'app.js',
       ext: 'js',
       env: {
           PORT:port
       },
       ignore: ['./node_modules/**']
   })
   .on('restart', function() {
       console.log('Gulp is running on PORT:' + port);
   }); 
});