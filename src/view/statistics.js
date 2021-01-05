export const createStatisticsTemplate = () => {
  const getCountAllFilms = (filters) => {

    return filters.find(
      (filter) => {
        return filter.name === `all`;
      }).count;

  };

  export const createStatisticsTemplate = (filters) => {
    const countFilms = getCountAllFilms(filters);
    return (
      `<p>130 291 movies inside</p>`
        `<p>${countFilms} movies inside</p>`
    );
  };
};
