import algoliasearch from 'algoliasearch';
import instantsearch from 'instantsearch.js';
import { 
  hits, 
  pagination, 
  refinementList, 
  hierarchicalMenu, 
  numericMenu,
  ratingMenu,
  toggleRefinement,
  clearRefinements,
  currentRefinements,
  stats
 } from 'instantsearch.js/es/widgets';

import resultHit from '../templates/result-hit';

/**
 * @class ResultsPage
 * @description Instant Search class to display content on main page
 */
class ResultPage {
  constructor() {
    this._registerClient();
    this._registerWidgets();
    this._startSearch();
  }

  /**
   * @private
   * Handles creating the search client and creating an instance of instant search
   * @return {void}
   */
  _registerClient() {
    this._searchClient = algoliasearch(
      'STUNKNEZ7U',
      '6fd8be68ce099ddf825e764575b2b44c'
    );

    this._searchInstance = instantsearch({
      indexName: 'product_catalog',
      searchClient: this._searchClient,
      routing: true
    });
  }

  /**
   * @private
   * Adds widgets to the Algolia instant search instance
   * @return {void}
   */
  _registerWidgets() {
    this._searchInstance.addWidgets([
      hits({
        container: '#hits',
        templates: {
          item: resultHit,
        },
      }),
      pagination({
        container: '#pagination',
      }),
      refinementList({
        container: '#brand-facet',
        attribute: 'brand',
      }),
      numericMenu({
        container: '#price-slider',
        attribute: 'price',
        items: [
          { label: 'All' },
          { label: 'Less than $100', end: 100 },
          { label: 'Between $100 - $500', start: 100, end: 500 },
          { label: 'Between $500 - $1000', start: 500, end: 1000 },
          { label: 'More than $1000', start: 1000 },
        ],
      }),
      hierarchicalMenu({
        container: '#categories-facet',
        attributes: [
          'hierarchicalCategories.lvl0',
          'hierarchicalCategories.lvl1',
          'hierarchicalCategories.lvl2'
        ]
      }),
      ratingMenu({
        container: '#rating-menu',
        attribute: 'rating',
      }),
      toggleRefinement({
        container: '#toggle-refinement',
        attribute: 'free_shipping',
        templates: {
          labelText: 'Free shipping',
        },
      }),
      clearRefinements({
        container: '#clear-refinements',
      }),
      currentRefinements({
        container: '#current-refinements',
      }),
      stats({
        container: '#search-stats',
      })
      
    ]);
  }

  /**
   * @private
   * Starts instant search after widgets are registered
   * @return {void}
   */
  _startSearch() {
    this._searchInstance.start();
  }
}

export default ResultPage;
