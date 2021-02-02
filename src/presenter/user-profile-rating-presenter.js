import UserProfileRatingView from "../view/user-profile-rating-view";
import {render, replace} from "../utils/render-utils";
import {getUserRank} from "../utils/user-rank-utils";

export default class UserProfileRatingPresenter {
  constructor(container, filmsModel) {
    this._container = container;
    this._filmsModel = filmsModel;

    this._userProfileRatingView = null;

    this._onDataChange = this._onDataChange.bind(this);
    this._filmsModel.setDataChangeHandlers(this._onDataChange);
  }

  render() {
    const prevUserProfileRatingView = this._userProfileRatingView;
    this._userProfileRatingView = new UserProfileRatingView(getUserRank(this._filmsModel.getWatchedFilms().length));

    if (prevUserProfileRatingView) {
      replace(this._userProfileRatingView, prevUserProfileRatingView);
    } else {
      render(this._container, this._userProfileRatingView);
    }
  }

  _onDataChange() {
    this.render();
  }
}
