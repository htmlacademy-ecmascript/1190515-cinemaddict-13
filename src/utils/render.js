import AbstractComponent from "../view/abstract-component";
export const POSITION = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
  AFTEREND: `afterend`,
};

export const render = (container, child, place) => {
  if (container instanceof AbstractComponent) {
    container = container.getElement();
  }

  if (child instanceof AbstractComponent) {
    child = child.getElement();
  }
  switch (place) {
    case POSITION.AFTERBEGIN:
      container.prepend(child);
      break;
    case POSITION.BEFOREEND:
      container.append(child);
      break;
    case POSITION.AFTEREND:
      container.after(child);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const remove = (component) => {
  if (!(component instanceof AbstractComponent)) {
    throw new Error(`Can remove only components`);
  }
  component.getElement().remove();
  component.removeElement();
};

export const toggleElement = (container, component, action) => {
  const element = component.getElement();
  switch (action) {
    case `show`:
      container.appendChild(element);
      break;
    case `hide`:
      if (container.contains(element)) {
        container.removeChild(element);
      }
      break;
  }
};

export const replace = (newChild, oldChild) => {
  if (oldChild instanceof AbstractComponent) {
    oldChild = oldChild.getElement();
  }

  if (newChild instanceof AbstractComponent) {
    newChild = newChild.getElement();
  }

  const parent = oldChild.parentElement;

  if (parent === null || oldChild === null || newChild === null) {
    throw new Error(`Can't replace unexisting elements`);
  }

  parent.replaceChild(newChild, oldChild);
};

