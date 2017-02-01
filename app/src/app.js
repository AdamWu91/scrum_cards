const css = require('./assets/styles/style.css');
const choo = require('choo')
const html = require('choo/html')
const app = choo()
const socket = io()

app.model(require('./scripts/modules/main'))

app.router(['/', require('./scripts/pages/home')])

const tree = app.start()
document.body.appendChild(tree)