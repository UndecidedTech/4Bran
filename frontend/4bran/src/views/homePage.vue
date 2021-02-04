<template>
  <div id="doc">
      <div id="hd">
          <div id="logo-fp">
              <a href="/" title="Home">
                <img alt="4bran" src="@/assets/4branLogo.png" width="300" height="120">
              </a>
          </div>
      </div>
    <div class="box-outer top-box" id="boards">
      <div class="box-inner">
        <div class="boxbar">
          <h2>Boards</h2>
        </div>
        <div class="boxcontent">
          <div class="column">
            <h3 style="text-decoration: underline; display: inline">
              Japanese Culture
            </h3>
            <ul>
              <li>
                <a href="#" @click="goBoard('a')" class="boardlink"
                  >Anime &amp; Manga</a
                >
              </li>
            </ul>
            <h3 style="text-decoration: underline; display: inline">
              Video Games
            </h3>
            <ul>
              <li>
                <a href="#" class="boardlink"
                  >Video Games</a
                >
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Video Game Generals</a
                >
              </li>
            </ul>
          </div>
          <div class="column">
            <h3 style="text-decoration: underline; display: inline">
              Interests
            </h3>
            <ul>
              <li>
                <a href="#" class="boardlink"
                  >Technology</a
                >
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Television &amp; Film</a
                >
              </li>
              <li>
                <a href="#" class="boardlink">Weapons</a>
              </li>
              <li>
                <a href="#" class="boardlink">Auto</a>
              </li>
              
              <li>
                <a href="#" class="boardlink">Sports</a>
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Outdoors</a
                >
              </li>
            </ul>
          </div>
          <div class="column">
            <h3 style="text-decoration: underline; display: inline">
              Creative
            </h3>
            <ul>
              <li>
                <a href="#" class="boardlink"
                  >Literature</a
                >
              </li>
              <li>
                <a href="#" class="boardlink">Music</a>
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Fashion</a
                >
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Worksafe GIF</a
                >
              </li>
            </ul>
          </div>
          <div class="column">
            <h3 style="text-decoration: underline; display: inline">Other</h3>
            <ul>
              <li>
                <a href="#" class="boardlink"
                  >Business &amp; Finance</a
                >
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Fitness</a
                >
              </li>
            </ul>
            <h3 style="text-decoration: underline; display: inline">Misc.</h3>
            <h3 style="display: inline">
              <span class="warning" title="Not Safe For Work"
                ></span
              >
            </h3>
            <ul>
              <li>
                <a href="#" @click="goBoard('b')" class="boardlink">Random</a>
              </li>
              <li>
                <a href="#" class="boardlink"
                  >Politically Incorrect</a
                >
              </li>
            </ul>
          </div>
          <div class="column">
            <h3 style="text-decoration: underline; display: inline">Adult</h3>
            <h3 style="display: inline">
              <span class="warning" title="Not Safe For Work"
                ></span
              >
            </h3>
            <ul>
              <li>
                <a href="//boards.4chan.org/h/" class="boardlink">Hentai</a>
              </li>
            </ul>
          </div>
          <br class="clear-bug" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    goBoard(boardName) {
        this.$router.push({path: `/${boardName}/catalog`, params: {board: boardName}});
    }
  }
};
</script>

<style>
#doc {
    background: #eef2ff url(/image/fade-blue.png) top center repeat-x;
    color: #000;
}

#doc {
    font: 13px/1.231 arial,helvetica,clean,sans-serif;
    *font-size: small;
    *font: x-small;
}

#doc, #doc2, #doc3, #doc4 {
    margin: auto;
    text-align: left;
    width: 57.69em;
    *width: 56.301em;
    min-width: 750px;
}

#hd {
    margin-bottom: 0;
}

#logo-fp img {
    margin: auto;
    display: block;
    border: none;
}

.top-box {
    background: #fff;
}

.box-outer {
    border: 1px solid;
    zoom: 100%;
    margin-bottom: .5em;
    padding-bottom: .5em;
    margin: 0;
    padding: 0;
}

#boards .boxcontent {
    text-align: center;
}

.boxcontent, #ft, #whatis {
    font-size: 93%;
}

#boards .boxcontent {
    text-align: center;
}

.boxcontent {
    padding: .5em;
    padding-top: .25em;
    padding-bottom: 0;
    line-height: 130%;
}

#boards .column {
    float: left;
    width: 12em;
}

#boards .column {
    text-align: left;
    display: inline-block;
    float: none;
    vertical-align: top;
}



h2 {
    font-size: 131%;
    font-weight: 700;
}


h3 {
    display: block;
    font-size: 1.17em;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
}

h3 {
    font-size: 100%;
    font-weight: 700;
}

li {
    display: list-item;
    text-align: -webkit-match-parent;
}

li {
    list-style: none;
}

#boards a {
    color: #34345c;
    text-decoration: none;
}

a:-webkit-any-link {
    color: -webkit-link;
    cursor: pointer;
    text-decoration: underline;
}

.boxbar {
    background: #98e;
}

.boxbar {
    position: relative;
    zoom: 100%;
}

.boxbar {
    padding-left: .5em;
    line-height: 2em;
}



.doc {
    text-align: left;
}

.boardlink:hover {
    text-decoration: underline;
}
</style>