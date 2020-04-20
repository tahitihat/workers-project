addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request))
})

/**
 * 1. Request URLs from the variants API
 * 2. Return response from randomly selected variant
 * @param {Request} request // Unused
 */
async function handleRequest(request) {
  const API_response = await fetch('https://cfw-takehome.developers.workers.dev/api/variants');
  let API_data = await API_response.json();

  // randomly choose URL from variants array
  const arr = API_data['variants'];
  variant_URL = arr[Math.round(Math.random())]

  // Return response from request to selected URL
  const variant_response = await fetch(variant_URL);
  let variant_data = await variant_response.text();
  return new Response(variant_data, {
    headers: { 'content-type': 'text/html' },
  });

}
