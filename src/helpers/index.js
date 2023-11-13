export function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

export function scrollFreeze() {
  let html = document.documentElement;
  let htmlPosition = html.style.position;
  let scrollPosition = html.scrollTop;

  if (!htmlPosition) {
    html.style.position = 'fixed';
    html.style.width = '100%';
    html.style.height = '100%';
    html.style.top = '-' + scrollPosition + 'px';
    html.style.overflowY = 'scroll';
  }
}

export function scrollUnfreeze() {
  let html = document.documentElement;
  let htmlPosition = html.style.position;

  if (htmlPosition === 'fixed') {
    html.style.position = 'static';
    html.scrollTop = -parseInt(html.style.top);
    html.style.position = '';
    html.style.top = '';
    html.style.width = '';
    html.style.height = '';
    html.style.overflowY = '';
  }
}

export function arrayMoveImmutable(array, fromIndex, toIndex) {
  const element = array.splice(fromIndex, 1)[0];
  array.splice(toIndex, 0, element);
  return array;
};


export function isValidEmail(value) {
  const emailRegex = /^[\w.-]+@[a-zA-Z\d.-]+\.[a-zA-Z]{2,}$/;
  return emailRegex.test(value);
}
