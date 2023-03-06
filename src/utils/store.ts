import KeyvFile from 'keyv-file'
 
const store = new KeyvFile({ filename: "./db.json" });

type JSONableAny = any;

/**
 * Retrieves a JSON value from disk
 */
function get(key: string): JSONableAny|null {
  let value = store.get(key, null)
  if (value != null) {
    return JSON.parse(value)
  } else {
    return null
  }
}

function set(key: string, value: JSONableAny, ttl?: number) {
    store.set(key, JSON.stringify(value), ttl)
    store.saveToDisk()
}

export default { get, set }