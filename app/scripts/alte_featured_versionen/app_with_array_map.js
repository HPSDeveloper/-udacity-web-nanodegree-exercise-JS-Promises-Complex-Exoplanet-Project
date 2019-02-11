/*
 Instructions:
 (1) Wrap an XHR in a Promise in the get() function below. See: https://developer.mozilla.org/en-US/docs/Web/API/XMLHttpRequest/Using_XMLHttpRequest
 (a) Resolve on load and reject on error.
 (2) If the XHR resolves, use addSearchHeader to add the search header to the page.
 (3) If the XHR fails, console.log the error and pass 'unknown' to addSearchHeader
 */

// Inline configuration for jshint below. Prevents `gulp jshint` from failing with quiz starter code.
/* jshint unused: false */

(function (document) {
  'use strict';
  var home = null;

  /**
   * Helper function to show the search query.
   * @param {String} response - The unparsed JSON response from get.
   */
  function addSearchHeader(response) {
    home.innerHTML = '<h2 class="page-title">query: ' + response.query + '</h2>';
  }

  /**
   * Helper function to create a planet thumbnail.
   * @param  {Object} data - The raw data describing the planet.
   */
  function createPlanetThumb(data) {
    var pT = document.createElement('planet-thumb');
    for (var d in data) {
      pT[d] = data[d];
    }
    home.appendChild(pT);
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function get(url) {
    return fetch(url); //A promise saying "I'll fetch and return the HTTP response" is returned.
  }

  /**
   * XHR wrapped in a promise.
   * @param  {String} url - The URL to fetch.
   * @return {Promise}    - A Promise that resolves when the XHR succeeds and fails otherwise.
   */
  function getJson(url) {
    return get(url).then(function (response /* the fetch API style HTTP response */) {
      // The (fetch-API-style) response.json() will return a Promise, promising:
      //                       "I will hand a JavaScript object out (into you ".then(..)""
      return response.json();
    });
  }

  window.addEventListener('WebComponentsReady', function () {
    home = document.querySelector('section[data-route="home"]');

    getJson('../data/earth-like-results.json')
      .then(function (response) {

        addSearchHeader(response);

        response.results.map(function (url) {
          getJson(url).then(createPlanetThumb);
        });
      }).catch(function (response) {
      addSearchHeader(response);
    });
  });
})
(document);
