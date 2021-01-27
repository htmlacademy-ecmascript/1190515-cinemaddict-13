import AbstractSmartComponent from "./abstract-smart-component";
import {SNAKE_CLASS} from "../const";
import Keydown from "../const";

const Emoji = {
  SMILE: `smile`,
  SLEEPING: `sleeping`,
  PUKE: `puke`,
  ANGRY: `angry`,
};

const createEmojiInputTemplate = (emojis, checkedEmoji) => {
  return (emojis.map((emoji) =>
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emoji}" value="${emoji}" ${emoji === checkedEmoji ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emoji}">
      <img src="./images/emoji/${emoji}.png" width="30" height="30" alt="emoji">
    </label>`
  ).join(`\n`));
};

const createEmojiImageTemplate = (emoji) => {
  return `<img src="images/emoji/${emoji}.png" width="55" height="55" alt="emoji-${emoji}" data-emoji-type="${emoji ? emoji : `none`}">`;
};

const setImgTemplate = (emojiTemplate) => emojiTemplate ? emojiTemplate : ``;

const createFilmDetailsCommentTemplate = (comment, emojiTemplate, emoji) => {
  return (
    `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${setImgTemplate(emojiTemplate)}</div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ``}</textarea>
        </label>
        <div class="film-details__emoji-list">
        ${createEmojiInputTemplate(Object.values(Emoji), emoji)}
        </div>
      </div>`
  );
};

export default class FilmDetailsNewCommentView extends AbstractSmartComponent {
  constructor() {
    super();

    this._callback = null;

    this._emojiTemplate = null;
    this._emoji = null;
    this._comment = null;

    this._inputChangeHandler = this._inputChangeHandler.bind(this);
    this._subscribeOnEvents = this._subscribeOnEvents.bind(this);
    this._newCommentSubmitHandler = this._newCommentSubmitHandler.bind(this);

    this._subscribeOnEvents();
  }

  getTemplate() {
    return createFilmDetailsCommentTemplate(this._comment, this._emojiTemplate, this._emoji);
  }

  setAddCommentHandler(callback) {
    this._callback = callback;
    document.addEventListener(`keydown`, this._newCommentSubmitHandler);
  }

  removeCommentHandler() {
    document.removeEventListener(`keydown`, this._newCommentSubmitHandler);
  }

  snakeBlock() {
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    textarea.disabled = false;
    textarea.classList.add(SNAKE_CLASS);
  }

  reset() {
    this._emojiTemplate = null;
    this._emoji = null;
    this._comment = null;

    this.updateElement();
  }

  restoreHandlers() {
    this._subscribeOnEvents();
  }

  updateElement() {
    const prevElement = this.getElement();
    const parent = prevElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();

    parent.replaceChild(newElement, prevElement);

    this.restoreHandlers();
  }

  _inputChangeHandler(evt) {
    this._emoji = evt.target.value;
    this._emojiTemplate = createEmojiImageTemplate(this._emoji);
    this.updateElement();
  }

  _subscribeOnEvents() {
    this.getElement().querySelectorAll(`input`).forEach((emoji) => {
      emoji.addEventListener(`change`, this._inputChangeHandler);
    });

    this.getElement().querySelector(`.film-details__comment-input`)
      .addEventListener(`input`, (evt) => {
        this._comment = evt.target.value;
      });
  }

  _newCommentSubmitHandler(evt) {
    const isCtrlEnterPressed = Keydown.ENT && (evt.ctrlKey || evt.metaKey);
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);

    if (textarea.classList.contains(SNAKE_CLASS)) {
      textarea.classList.remove(SNAKE_CLASS);
    }

    if (isCtrlEnterPressed && this._comment && this._emoji) {
      textarea.disabled = true;

      const comment = {
        'emotion': this._emoji,
        'comment': this._comment,
        'date': new Date(),
      };

      this._callback(comment);
    } else if (isCtrlEnterPressed && (this._comment || this._emoji)) {
      this.snakeBlock();
    }
  }
}
