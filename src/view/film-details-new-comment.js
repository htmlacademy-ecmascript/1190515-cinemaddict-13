import AbstractSmartComponent from "./abstract-smart-component";
import {Keydown, SHAKE_ANIMATION_TIMEOUT} from "../const";
import dayjs from "dayjs";

const EmojiAddress = {
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

const createFilmDetailsCommentSectionTemplate = (comment, emojiTemplate, emoji) => {

  const setImgTemplate = () => emojiTemplate ? emojiTemplate : ``;

  return `<div class="film-details__new-comment">
        <div for="add-emoji" class="film-details__add-emoji-label">${setImgTemplate()}</div>
        <label class="film-details__comment-label">
          <textarea class="film-details__comment-input"
          placeholder="Select reaction below and write comment here" name="comment">${comment ? comment : ``}</textarea>
        </label>
        <div class="film-details__emoji-list">
        ${createEmojiInputTemplate(Object.values(EmojiAddress), emoji)}
        </div>
      </div>`;
};

export default class FilmDetailsNewComment extends AbstractSmartComponent {
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

  getTemplate() {
    return createFilmDetailsCommentSectionTemplate(this._comment, this._emojiTemplate, this._emoji);
  }

  setAddCommentHandler(callback) {
    this._callback = callback;
    document.addEventListener(`keydown`, this._newCommentSubmitHandler);
  }

  removeCommentHandler() {
    document.removeEventListener(`keydown`, this._newCommentSubmitHandler);
  }

  _newCommentSubmitHandler(evt) {
    const isCommentPush = evt.ctrlKey && evt.key === Keydown.ENT;

    if (isCommentPush && this._comment && this._emoji) {
      this.getElement().querySelector(`.film-details__comment-input`).disabled = true;

      const comment = {
        'emotion': this._emoji,
        'comment': this._comment,
        'date': dayjs(),
      };
      this._callback(comment);
    } else if (isCommentPush && (this._comment || this._emoji)) {
      this.shakeBlock();
    }
  }

  shakeBlock() {
    const textarea = this.getElement().querySelector(`.film-details__comment-input`);
    textarea.disabled = false;
    textarea.style.animation = `shake ${SHAKE_ANIMATION_TIMEOUT / 1000}s`;

    setTimeout(() => {
      textarea.style.animation = ``;

    }, SHAKE_ANIMATION_TIMEOUT);
  }
}

