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

/**
 * Retrieves a JSON value from disk
 */
function get(key: string): any|null {
  let value = store.get(key, null)
  if (value != null) {
    return JSON.parse(value)
  } else {
    return null
  }
  
}

/**
 * Stores a JSONable value to disk
 * @param value Must be JSONable
 */
function set(key: string, value: string) {
    store.set(key, JSON.stringify(value))
    store.saveToDisk()
}

export default { get, set }