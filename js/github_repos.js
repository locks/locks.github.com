var githubRepos = Sammy("#repos" , function () {
  this.use('Mustache','ms');

  var endPoint = 'https://api.github.com/users/locks/repos?per_page=100&callback=?'
  var groupLanguages = function (repos) {
    return _(repos).chain()
                   .reject(function (r) { return r.fork })
                   .groupBy(function (n) { return n.language })
                   .tap(function (obj) {
                     obj['none'] = obj['null'] ; delete obj['null'] })
                   .value()
  }

  var getJSON = function (ctx, callback) {
    $.getJSON(endPoint).success(function (data) {
      data = groupLanguages(data['data'])

      ctx.langs = _(data).keys()
      ctx.repos = callback(data);

      ctx.partial('templates/repositories.ms')
    })
  }

  this.get('/', function (ctx) {
    getJSON(ctx, function (data) {
      return _.compose(_.flatten, _.values)(data)
    })
  })

  this.get('#/:language' , function (ctx) {
    getJSON(ctx, function (data) {
      return data[ctx.params.language]
    })
  })

})
