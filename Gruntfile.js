module.exports = function (grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        ts: {
            build: {
                src: ['src/main/ts/**/*.ts', 'src/main/d.ts/**/*.d.ts'],
                out: 'build/out.js',
                reference: 'reference.ts',
                options: {
                    module: 'amd', //or commonjs
                    target: 'es5', //or es3
                    basePath: 'src/main/ts',
                    sourceMap: true,
                    declaration: false
                }
            }
        },
        clean: {
            all: ["build", "dist", "dist.zip"],
            dist: ["dist"],
            js: ["dist/*.js"]
        },
        copy: {
            dist: {
                files: [
                    { expand: true, src: ['lib/*.js'], dest: 'dist/' },
                    { expand: true, src: ['build/*.js'], dest: 'dist/' },
                    { expand: true, src: ['res/**/*'], dest: 'dist/' },
                    { src: 'index.html', dest: 'dist/index.html' }
                ]
            }
        },
        zip: {
            dist: {
                router: function (filepath) {
                    // Route each file to all/{{filename}}
                    var s = 'dist/';
                    var index = filepath.indexOf(s);
                    var result;
                    if (index == 0) {
                        result = filepath.substring(s.length + index);
                    } else {
                        result = filepath;
                    }
                    return result;
                },
                src: ['dist/**'],
                dest: 'dist.zip',
                compression: 'DEFLATE'
            }

        }
    });

    // clean
    grunt.loadNpmTasks('grunt-contrib-clean');
    // Load the plugin that provides the "TS" task.
    grunt.loadNpmTasks('grunt-ts');
    // zip
    grunt.loadNpmTasks('grunt-zip');
    // copy
    grunt.loadNpmTasks('grunt-contrib-copy');
    // replace text in file
    grunt.loadNpmTasks('grunt-text-replace');
    // inline js 
    grunt.loadNpmTasks('grunt-inline');

    // Default task(s).
    grunt.registerTask('reset', ['clean:all']);
    grunt.registerTask('prod', ['ts', 'copy']);
    grunt.registerTask('dist', ['prod', 'clean:js', 'zip:dist', 'clean:dist']);
    grunt.registerTask('default', ['ts']);

};