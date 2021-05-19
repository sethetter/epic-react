// useEffect: HTTP requests
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'
import {ErrorBoundary} from 'react-error-boundary'
// 🐨 you'll want the following additional things from '../pokemon':
// fetchPokemon: the function we call to get the pokemon info
// PokemonInfoFallback: the thing we show while we're loading the pokemon info
// PokemonDataView: the stuff we use to display the pokemon info
import {
  PokemonForm,
  fetchPokemon,
  PokemonInfoFallback,
  PokemonDataView,
} from '../pokemon'

function PokemonInfo({pokemonName}) {
  // 🐨 Have state for the pokemon (null)
  const [state, setState] = React.useState({
    pokemon: null,
    error: null,
    status: 'idle',
  })
  const {pokemon, status, error} = state

  React.useEffect(() => {
    ;(async () => {
      if (!pokemonName || pokemonName === '') return
      setState(state => ({...state, status: 'pending'}))
      try {
        const pokemonData = await fetchPokemon(pokemonName)
        setState(state => ({
          ...state,
          pokemon: pokemonData,
          status: 'resolved',
        }))
      } catch (e) {
        setState(state => ({...state, error: e, status: 'rejected'}))
      }
    })()
  }, [pokemonName])

  if (status === 'idle') return 'Submit a pokemon'
  if (status === 'pending') return <PokemonInfoFallback name={pokemonName} />
  if (status === 'rejected') throw error
  if (status === 'resolved') return <PokemonDataView pokemon={pokemon} />
  throw new Error('unreachable')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary key={pokemonName} FallbackComponent={PokemonInfoError}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

function PokemonInfoError({error}) {
  return (
    <div role="alert">
      There was an error:
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

export default App
