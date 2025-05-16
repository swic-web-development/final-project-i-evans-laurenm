import React, { useState, useRef } from 'react'
import store from './store.jsx'
import { fetchPeople } from './actions.jsx'

function PeopleList({ people }) {
  return (
    <ul className="space-y-4">
      {people.map((person) => (
        <li key={person.name} className="rounded bg-gray-800 p-4 shadow">
          <h2 className="text-xl font-semibold">{person.name}</h2>
          <p>Height: {person.height}</p>
          <p>Gender: {person.gender}</p>
        </li>
      ))}
    </ul>
  )
}

export default function App() {
  const [state, setState] = useState(store.getState())
  const initialized = useRef(false)

  if (!initialized.current) {
    store.subscribe(setState)
    fetchPeople()
    initialized.current = true
  }

  return (
    <main className="min-h-screen bg-gray-900 p-4 text-white">
      <h1 className="mb-6 text-center text-3xl font-bold">Person 3</h1>

      {state.error && <p className="text-center text-red-800">{state.error}</p>}

      {state.isLoading && <p className="text-center text-black">Loading...</p>}

      {!state.isLoading && !state.error && <PeopleList people={state.people} />}
    </main>
  )
}
