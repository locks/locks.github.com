<a href="#/" class="primary positive middle pill button">all</a>{{#langs}}<a href="#/{{.}}" class="pill button middle">{{.}}</a>{{/langs}}

<hr>

<ul>
{{#repos}}
  <style>
    ul {
      min-height: 2em;

      list-style: none;
      padding: 0;
    }
    .listing {
      width: 80%;
      margin: 0 auto;

      background: #666;
    }
    .listing:hover {
      background: #667;

      box-shadow: inset 0px 5px 10px black;
    }
    .listing:hover h1 {
      text-shadow: 0px 1px 1px black, 0px -1px 1px white;
    }
  </style>
  <li class="listing">
    <section>
      <header>
        <h1>{{name}}</h1>
      </header>

      <p>
        {{description}}
      </p>

      <footer>
      <a href="{{url}}" class="button"><span class="book icon"></span>source</a>
        <a href="github-mac://openRepo/{{url}}" class="button"> clone</a>
        <a href="{{url}}/zipball/master" class="button"><span class="downarrow icon"></span>zip</a>
      </footer>
    </section>
    &nbsp;
  </li>
{{/repos}}

</ul>