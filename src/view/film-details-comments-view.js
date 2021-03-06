import AbstractSmartView from "./abstract-smart-view";
import {SHAKE_CLASS} from "../const";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import he from "he";

const ButtonText = {
  DELETE: `Delete`,
  DELETING: `Deleting...`
};

const createCommentsTemplate = (allComments) => {
  return allComments.map(({emotion, comment, date, author, id}) => {
    return `<li class="film-details__comment">
        <span class="film-details__comment-emoji">
          <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}">
        </span>
        <div>
          <p class="film-details__comment-text">${he.encode(comment)}</p>
          <p class="film-details__comment-info">
            <span class="film-details__comment-author">${author}</span>
            <span class="film-details__comment-day">${dayjs(date).fromNow()}</span>
            <button data-id="${id}" class="film-details__comment-delete">Delete</button>
          </p>
        </div>
      </li>`;
  }).join(`\n`);
};

const createFilmDetailsCommentsTemplate = (comments) => {
  const commentsTemplate = createCommentsTemplate(comments);

  return (
    `<section class="film-details__comments-wrap">
        <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments ? comments.length : `0`} </span></h3>
        <ul class="film-details__comments-list">
          ${commentsTemplate}
        </ul>
      </section>`
  );
};

export default class FilmDetailsCommentsView extends AbstractSmartView {
  constructor(comments) {
    super();

    this._comments = comments;

  }

  getTemplate() {
    return createFilmDetailsCommentsTemplate(this._comments);
  }

  setDeleteButtonHandler(callback) {
    this.getElement().addEventListener(`click`, (evt) => {
      if (evt.target.tagName !== `BUTTON`) {
        return;
      }
      evt.preventDefault();
      this._disableComment(evt.target.closest(`.film-details__comment`));
      this._disableDeleteButton(evt.target);
      callback(evt.target.dataset.id);
    });
  }

  shakeComment(commentId) {
    const index = this._comments.findIndex((comment) => comment.id === commentId);
    const comment = this.getElement().querySelectorAll(`.film-details__comment`)[index];
    const deleteButton = comment.querySelector(`.film-details__comment-delete`);
    this._activateComment(comment);
    this._activateDeleteButton(deleteButton);
  }

  _disableComment(comment) {
    if (comment.classList.contains(SHAKE_CLASS)) {
      comment.classList.remove(SHAKE_CLASS);
    }
    comment.disabled = true;
  }

  _disableDeleteButton(button) {
    button.disabled = true;
    button.textContent = ButtonText.DELETING;
  }

  _activateDeleteButton(button) {
    button.disabled = false;
    button.textContent = ButtonText.DELETE;
  }

  _activateComment(comment) {
    comment.disabled = false;
    comment.classList.add(SHAKE_CLASS);
  }
}
