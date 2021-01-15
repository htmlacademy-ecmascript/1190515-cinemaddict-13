export const generateFilters = (films) => {
  return [
    {
      name: `All movies`,
      link: `#all`,
      count: films.length,
    },
    {
      name: `Watchlist`,
      link: `#watchlist`,
      count: films.filter((elm) => elm.isWatchlist).length,
    },
    {
      name: `History`,
      link: `#history`,
      count: films.filter((elm) => elm.isWatched).length,
    },
    {
      name: `Favorites`,
      link: `#favorites`,
      count: films.filter((elm) => elm.isFavorites).length,
    }
  ];
};

export default generateFilters;
