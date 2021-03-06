import AbstractSmartView from "./abstract-smart-view";

const createFilmDetailsControlsTemplate = ({isInWatchlist, isInHistory, isInFavorites}) => {
  const getCheckState = (isChecked) => isChecked ? `checked` : ``;
  return `<section class="film-details__controls">
      <input type="checkbox" class="film-details__control-input visually-hidden" id="watchlist" name="watchlist" ${getCheckState(isInWatchlist)}>
      <label for="watchlist" class="film-details__control-label film-details__control-label--watchlist">Add to watchlist</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="watched" name="watched" ${getCheckState(isInHistory)}>
      <label for="watched" class="film-details__control-label film-details__control-label--watched">Already watched</label>

      <input type="checkbox" class="film-details__control-input visually-hidden" id="favorite" name="favorite" ${getCheckState(isInFavorites)}>
      <label for="favorite" class="film-details__control-label film-details__control-label--favorite">Add to favorites</label>
    </section>`;
};

export default class FilmDetailsControls extends AbstractSmartView {
  constructor(controls) {
    super();

    this._controls = controls;
  }

  getTemplate() {
    return createFilmDetailsControlsTemplate(this._controls);
  }

  setAddToWatchlistHandler(callback) {
    this.getElement().querySelector(`input[name="watchlist"]`).addEventListener(`change`, callback);
  }

  setAlreadyWatchedHandler(callback) {
    this.getElement().querySelector(`input[name="watched"]`).addEventListener(`change`, callback);
  }

  setAddToFavoritesHandler(callback) {
    this.getElement().querySelector(`input[name="favorite"]`).addEventListener(`change`, callback);
  }
}
