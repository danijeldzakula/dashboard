function uuidv4() {
  return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) => (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16));
}

function scrollFreeze() {
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

function scrollUnfreeze() {
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

function arrayMoveMutable(array, fromIndex, toIndex) {
  const startIndex = fromIndex < 0 ? array.length + fromIndex : fromIndex;

  if (startIndex >= 0 && startIndex < array.length) {
    const endIndex = toIndex < 0 ? array.length + toIndex : toIndex;

    const [item] = array.splice(fromIndex, 1);
    array.splice(endIndex, 0, item);
  }
}

function arrayMoveImmutable(array, fromIndex, toIndex) {
  const newArray = [...array];
  arrayMoveMutable(newArray, fromIndex, toIndex);
  return newArray;
}

export { uuidv4, scrollFreeze, scrollUnfreeze, arrayMoveImmutable };
