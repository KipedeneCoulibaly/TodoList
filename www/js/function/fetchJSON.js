/**
 * 
 * @param {string} url The http (https) address of the API
 * @param {Array} options Http (https) parameters
 */
export async function fetchJSON(url, options = {}){
    const headers = {Accept: 'application/json', ...options.headers}
    const r = await fetch(url, {...options, headers})
    if(r.ok){
        return r.json()
    }
    throw new Error('Server error', {cause: r})
}