define(['./module'], function(filters) {
  'use strict';

  filters.filter('card_sort', CardSortFilter);

  return;

  function CardSortFilter() {
    var _CompareFns;
    _InitCompareFns();

    return function(cards, bias) {
      cards.sort(_CompareFns[bias] || _CompareFns.Default);
      return cards;
    }

    function _InitCompareFns() {
      _CompareFns = {};

      _CompareFns.Default = function(a, b) {
        var cmp = a['generic_type'].localeCompare(b['generic_type']);
        if (cmp != 0) return cmp;
        else if (a['conv_cost'] !== b['conv_cost']) {
          return a['conv_cost'] - b['conv_cost'];
        }
        else if (a['generic_type'] !== 'Land') {
          cmp = a['mana_cost'].localeCompare(b['mana_cost']);
          if (cmp != 0) return cmp;
        }

        return a['name'].localeCompare(b['name']);
      };

      _CompareFns.ManaCost = function(a, b) {
        if (a['conv_cost'] !== b['conv_cost']) {
          return a['conv_cost'] - b['conv_cost'];
        }

        // Return 0 if both lands (we are never comparing lands and others)
        if (a['generic_type'] === 'Land') return 0;
        else return a['mana_cost'].localeCompare(b['mana_cost']);
      };

      _CompareFns.Type = function(a, b) {
        return a['generic_type'].localeCompare(b['generic_type']);
      };

      _CompareFns.Name = function(a, b) {
        return a['name'].localeCompare(b['name']);
      };
    }
  }
});
