import {generateDate, createElement} from "../utils";

export const createCommentsTemplate = (comments) => {
  const result = comments.map((comment) => {
    const {emotion, text, author, date} = comment;
    return `<li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="${emotion}" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${text}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${generateDate(date)}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`;
  }).join(`\n`);
  return `<ul class="film-details__comments-list">${result}</ul>`;
};

export default class Comment {
  constructor(commentData) {
    this._comment = commentData;

    this._element = null;
  }

  getTemplate() {
    return createCommentsTemplate(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
