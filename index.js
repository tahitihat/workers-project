addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

class AttributeRewriter {
  constructor(new_copy) {
    this.new_copy = new_copy
  }

  element(element) {
    element.setInnerContent(this.new_copy)
    const href = element.getAttribute('href')
    if (href) {
      element.setAttribute(
        'href',
        href.replace('https://cloudflare.com', 'http://isabeltripp.me/')
      )
    }
  }
}

const text_replacements = {
  title: 'Variant 3.14159265...',
  h1: 'Variant 3.14159265...',
  a: 'Learn more about me (Isabel)',
  p: 'Notice anything different? This HTML has been parsed with HTMLRewritter! Note that the button color still reflects which variant was selected.'
}

const rewriter = new HTMLRewriter()
  .on('title', new AttributeRewriter(text_replacements['title']))
  .on('h1', new AttributeRewriter(text_replacements['h1']))
  .on('a', new AttributeRewriter(text_replacements['a']))
  .on('p', new AttributeRewriter(text_replacements['p']));

/*
 * 1. Request URLs from the variants API
 * 2. Return response from randomly selected variant
 * @param {Request} request // Unused
 */
async function handleRequest(request) {
  const API_response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let API_data = await API_response.json();

  // randomly choose URL from variants array
  const arr = API_data['variants'];
  variant_URL = arr[Math.round(Math.random())];

  // Return response from request to selected URL
  const variant_response = await fetch(variant_URL);
  let variant_data = await variant_response.text();

  // Transform HTML using HTMLRewriter
  new_response = new Response(variant_data, {
    headers: { 'content-type': 'text/html' },
  });
  return rewriter.transform(new_response);
}
