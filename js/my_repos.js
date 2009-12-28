$(function() {
  var user = new GitHub.User('locks');
  user.load('basic', getUser)
});

function getUser(user) {
  $('#repos').text('loading...');
  user.load('repos', getRepos);
}
   
function getRepos(user) {
  var str = ''

  for (var i in user.repos) {
    var repo = user.repos[i];

		if (repo.fork == false) {
      str += '<a href="' + repo.url + '">' + repo.name + '</a><br />'
		}
  }

  $('#repos').html(str)
}