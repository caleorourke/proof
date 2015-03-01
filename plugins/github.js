/*
 #  GitHub
 #  Fetches payloads for contributors, stargazers, and tags from GitHub
 #
 #  Copyright © SoftLayer, an IBM Company
 #  Code and documentation licensed under MIT
 */

calloutElement = document.getElementById('js-callout-element');

if (typeof(calloutElement) !== undefined && calloutElement !== null) {
  $.getJSON('https://api.github.com/repos/softlayer/softlayer-python/contributors?callback=?', function(result) {
    numContributors = result.data;
    $(function() {
      $('#js-github-contributors').text(numContributors.length);
    });
  });

  $.ajax({
    url: 'https://api.github.com/repos/softlayer/softlayer-python?callback?',
    dataType: 'jsonp',
    success: function(json) {
      numStargazers = json.data;
      $('#js-github-stargazers').text(numStargazers.stargazers_count);
    }
  });

  $.ajax({
    url: 'https://api.github.com/repos/softlayer/softlayer-python/tags?callback?',
    dataType: 'jsonp',
    success: function(json) {
      lastTag = json.data[0];
      $('#js-github-version').text(lastTag.name);
    }
  });
}
