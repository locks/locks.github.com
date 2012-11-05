var githubRepos = Sammy("#repos" , function () {

  this.use('Mustache','ms');

  var groupLanguages = function (repos) {
    return _(repos).chain()
                   .reject(function (r) { return r.fork })
                   .groupBy(function (n) { return n.language })
                   .tap(function (obj) {
                     obj['none'] = obj['null'] ; delete obj['null'] })
                   .value()
  }

  this.get('/', function (ctx) {
    $.ajax('https://api.github.com/users/locks/repos?per_page=100').success(function (data) {
      data = groupLanguages(data)

      ctx.langs = _(data).keys()
      ctx.repos = _.compose(_.flatten, _.values)(data)

      ctx.partial('repositories.ms')
    })
  })

  this.get('#/language/:language' , function (ctx) {
    $.ajax('https://api.github.com/users/locks/repos?per_page=100').success(function (data) {
      data = groupLanguages(data)

      ctx.langs = _(data).keys()
      ctx.repos = data[ctx.params.language]

      ctx.partial('repositories.ms')
    })
  })

})
