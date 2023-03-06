import KeyvFile, { makeField } from 'keyv-file'
 
class Kv extends KeyvFile {
  constructor() {
    super({
      filename: './db.json'
    })
  }
  someField = makeField(this, 'field_key')
}
const store = new Kv

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