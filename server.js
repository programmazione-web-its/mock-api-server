const jsonServer = require('json-server')
const server = jsonServer.create()

const projects = ['health-shield', 'help-pet']

projects.forEach((project) => {
  const router = jsonServer.router(`projects/${project}/db.json`)
  server.use(`/${project}/api`, router)
})

server.listen(process.env.PORT || 3000)
