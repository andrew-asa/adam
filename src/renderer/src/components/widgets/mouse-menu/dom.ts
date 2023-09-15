// fast create dom with id
export function createIdDom (tag: string, id: string, innerText?: string) {
  const el = document.createElement(tag);
  el.setAttribute('id', id);
  if (innerText) {
    el.innerText = innerText;
  }
  return el;
}

// fast create dom with class
export function createClassDom (tag: string, className: string, innerText?: string) {
  let el = document.createElement(tag);
  el.setAttribute('class', className);
  if (innerText) el.innerText = innerText;
  return el;
}

// insert an element after target element
export function insertAfter (newEl: HTMLElement, targetEl: HTMLElement) {
  const parentEl = targetEl.parentNode as HTMLElement;
  if (parentEl.lastChild === targetEl) {
    parentEl.appendChild(newEl);
  } else {
    parentEl.insertBefore(newEl, targetEl.nextSibling);
  }
}

