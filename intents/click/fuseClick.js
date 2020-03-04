/* globals chrome, Fuse */

// FIXME: Return response to calling code when finished
chrome.runtime.onMessage.addListener((request) => {
  if (request.query) {
    clickIfFound(request.query.trim());
  }
});

function clickIfFound(query) {
  const options = getFuseOptions();
  const searchContent = getStructuredSearchContent();
  const fuse = new Fuse(searchContent, options);
  const matches = fuse.search(query);
  if (!matches.length) {
    return false;
  }
  let found;
  for (let i = 0; i < matches.length; i++) {
    const el = matches[i].item.element;
    if (isInViewport(el)) {
      found = el;
      break;
    }
  }
  if (!found) {
    found = matches[0].item.element;
  }
  highlightElement(found);
  setTimeout(() => {
    found.click();
  }, 100);
  return true;
}

function getStructuredSearchContent() {
  const content = [];
  const links = findLinks();
  for (let i = 0; i < links.length; i++) {
    content.push({
      element: links[i],
      text: links[i].innerText,
      label: links[i].getAttribute('aria-label'),
      title: links[i].getAttribute('title'),
      url: links[i].url,
    });
  }
  return content;
}

function getFuseOptions() {
  return {
    caseSensitive: false,
    shouldSort: true,
    tokenize: true,
    matchAllTokens: true,
    findAllMatches: true,
    includeScore: true,
    threshold: 0.1,
    location: 0,
    distance: 100,
    maxPatternLength: 32,
    minMatchCharLength: 3,
    keys: [
      {
        name: 'title',
        weight: 0.8,
      },
      {
        name: 'text',
        weight: 0.8,
      },
      {
        name: 'label',
        weight: 0.8,
      },
      {
        name: 'url',
        weight: 0.2,
      },
    ],
  };
}

function isInViewport(el) {
  const width = window.innerWidth || document.documentElement.clientWidth;
  const height = window.innerHeight || document.documentElement.clientHeight;
  const bounding = el.getBoundingClientRect();
  return (
    bounding.top + bounding.height >= 0
      && bounding.left + bounding.width >= 0
      && bounding.right - bounding.width <= width
      && bounding.bottom - bounding.height <= height
  );
}

function highlightElement(el) {
  el.style.backgroundColor = 'rgba(255, 0, 0, 0.3)'; // eslint-disable-line no-param-reassign
}

function findLinks() {
  return document.body.querySelectorAll('a');
}
