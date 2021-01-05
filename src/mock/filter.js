import {filterTypeKeys, filterTypes} from "../const";

const filmToFilterMap = {
  [filterTypeKeys.ALL]: (films) => films.length,
  [filterTypeKeys.WATCHLIST]: (films) => films.filter((film) => film.isInWatchlist).length,
  [filterTypeKeys.HISTORY]: (films) => films.filter((film) => film.isWatched).length,
  [filterTypeKeys.FAVORITES]: (films) => films.filter((film) => film.isFavorite).length,
};

export const generateFilters = (films) => {
  return Object.entries(filmToFilterMap).map(([filterTypeKey, getCount]) => {
    return {
      label: filterTypes[filterTypeKey].label,
      link: filterTypes[filterTypeKey].link,
      count: getCount(films),
    };
  });
};
