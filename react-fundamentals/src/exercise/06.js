// Basic Forms
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function UsernameForm({onSubmitUsername}) {
  // 🐨 add a submit event handler here (`handleSubmit`).
  // 💰 Make sure to accept the `event` as an argument and call
  // `event.preventDefault()` to prevent the default behavior of form submit
  // events (which refreshes the page).
  //
  // 🐨 get the value from the username input (using whichever method
  // you prefer from the options mentioned in the instructions)
  // 💰 For example: event.target.elements[0].value
  // 🐨 Call `onSubmitUsername` with the value of the input

  // 🐨 add the onSubmit handler to the <form> below

  // 🐨 make sure to associate the label to the input.
  // to do so, set the value of 'htmlFor' prop of the label to the id of input

  const inputRef = React.useRef()

  const [username, setUsername] = React.useState('')
  const [validationError, setValidationError] = React.useState(null)

  const handleSubmit = event => {
    event.preventDefault()
    onSubmitUsername(username)
  }

  const handleUsernameChange = event => {
    const newVal = event.target.value
    if (newVal.toLowerCase() !== newVal) {
      setValidationError('Username must be lower case')
    } else {
      setUsername(newVal)
      setValidationError(null)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        {validationError && <p role="alert">{validationError}</p>}
        <label htmlFor="usernameInput">Username:</label>
        <input
          ref={inputRef}
          onChange={handleUsernameChange}
          type="text"
          id="usernameInput"
        />
      </div>
      <button type="submit" disabled={!!validationError}>
        Submit
      </button>
    </form>
  )
}

function App() {
  const onSubmitUsername = username => alert(`You entered: ${username}`)
  return <UsernameForm onSubmitUsername={onSubmitUsername} />
}

export default App
