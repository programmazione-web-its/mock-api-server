const jsonServer = require('json-server')
const server = jsonServer.create()

const projects = ['help-pet', 'health-shield', 'skillswap', 'match-to-match', 'gamebuster']

projects.forEach((project) => {
  const router = jsonServer.router(`projects/${project}/db.json`)
  server.use(`/${project}/api`, router)
})

server.listen(process.env.PORT || 3000)
