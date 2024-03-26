export default function routes(app) {
    app.route('/').get((req, res) => {
        res.sendFile(__dirname + '/dist/views/index.html')
    })
    // app.set('view engine', 'pug') // server.js
    // app.set('views', './dist/views') 
    // 
    // app.route('/').get((req, res) => {
    //     res.render('index')
    // });
}