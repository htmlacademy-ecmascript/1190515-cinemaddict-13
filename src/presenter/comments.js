import CommentsView from "../view/comments";

import {render, replace} from "../utils/render";
import Keydown from "../const";
import {nanoid} from "nanoid";

const createComment = (comment, emotion) => {
  return {
    id: nanoid(),
    comment,
    emotion,
    author: `user`,
    date: new Date()
  };
};

export default class CommentsPresenter {
  constructor(container, comments, commentDeleteHandler, commentAddHandler) {
    this._container = container;
    this._comments = comments;
    this._commentDeleteHandler = commentDeleteHandler;
    this._commentAddHandler = commentAddHandler;

    this._commentsComponent = null;

    this.destroy = this.destroy.bind(this);
    this._keydownEnterHandler = this._keydownEnterHandler.bind(this);
  }

  render() {
    const prevCommentsComponent = this._commentsComponent;

    this._commentsComponent = new CommentsView(this._comments);

    this._commentsComponent.setDeleteHandler(this._commentDeleteHandler);
    document.addEventListener(`keydown`, this._keydownEnterHandler);

    if (prevCommentsComponent) {
      replace(this._commentsComponent, prevCommentsComponent);

      return;
    }

    render(this._container, this._commentsComponent);
  }

  destroy() {
    this._commentsComponent.removeElement();
    document.removeEventListener(`keydown`, this._keydownEnterHandler);
  }

  getComments() {
    return this._currentComments;
  }

  setComments(comments) {
    this._comments = comments;
    this.render();
  }

  _keydownEnterHandler(evt) {
    if (evt.key === Keydown.ENT && (evt.ctrlKey || evt.metaKey)) {
      this._commentAddHandler(createComment(...Object.values(this._commentsComponent.getInput())));
    }
  }

  _addComment(text, emoji) {
    if (text && emoji) {
      this._currentComments.push(createComment(text, emoji));
      this.render();
    }
  }

  _deleteComment(id) {
    this._currentComments = this._currentComments.filter((comment) => comment.id !== id);
    this.render();
  }
}
