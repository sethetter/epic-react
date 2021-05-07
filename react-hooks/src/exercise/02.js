// useEffect: persistent state
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'

function useLocalStorageState(
  key,
  initialValue,
  {serialize = JSON.stringify, deserialize = JSON.parse} = {},
) {
  const [val, setVal] = React.useState(() => {
    const lsVal = window.localStorage.getItem(key)
    if (lsVal) return deserialize(lsVal)
    return typeof initialValue === 'function' ? initialValue() : initialValue
  })

  const keyRef = React.useRef(key)
  React.useEffect(() => {
    if (keyRef.current !== key) {
      window.localStorage.removeItem(keyRef.current)
    }
    keyRef.current = key
    window.localStorage.setItem(key, serialize(val))
  }, [key, val, serialize])

  return [val, setVal]
}

function Greeting({initialName = ''}) {
  const [name, setName] = useLocalStorageState('name', initialName)

  function handleChange(event) {
    setName(event.target.value)
  }

  return (
    <div>
      <form>
        <label htmlFor="name">Name: </label>
        <input value={name} onChange={handleChange} id="name" />
      </form>
      {name ? <strong>Hello {name}</strong> : 'Please type your name'}
    </div>
  )
}

function App() {
  return <Greeting />
}

export default App
