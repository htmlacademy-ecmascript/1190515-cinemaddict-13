export const createFilmDescriptionTemplate = () => {
  const getDescriptionLength = (description) => {
    return description.length > 140
      ? description.substr(0, 139) + `...`
      : description;
  };

  export const createCardTemplate = (cardFilm) => {
    const { title, poster, description, comments, date, rating, genre, runtime, isWatchlist, isWatched, isFavorite} = cardFilm;
    const descriptionView = getDescriptionView(description);
    return (`<article class="film-card">
          <h3 class="film-card__title">${title}</h3>
            <p class="film-card__rating">${rating}</p>
            <p class="film-card__info">
              <span class="film-card__year">${date}</span>
              <span class="film-card__duration">${runtime}</span>
              <span class="film-card__genre">${genre[0]}</span>
            </p>
          <img src="${poster}" alt="" class="film-card__poster">
          <p class="film-card__description">${descriptionLength}</p>
          <a class="film-card__comments">${comments.length}</a>
          <div class="film-card__controls">
            <button class="film-card__controls-item button film-card__controls-item--add-to-watchlist${isWatchlist ? markTemplate : ``}" type="button">Add to watchlist</button>
            <button class="film-card__controls-item button film-card__controls-item--mark-as-watched${isWatched ? markTemplate : ``}" type="button">Mark as watched</button>
            <button class="film-card__controls-item button film-card__controls-item--favorite${isFavorite ? markTemplate : ``} " type="button">Mark as favorite</button>
          </div>
        </article>`
    );
