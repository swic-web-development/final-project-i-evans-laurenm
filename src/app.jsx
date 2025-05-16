import React, { useState, useRef } from 'react'
import store from './store.jsx'
import { fetchPeople } from './actions.jsx'

function PeopleList({ people }) {
  return (
    <ul className="space-y-4">
      {people.map((person) => (
        <li
          key={person.name}
          className="rounded-lg bg-gray-900 p-6 shadow-lg transition-transform duration-300 hover:scale-105"
        >
          <h2 className="h-24 w-24 rounded-full border-2 border-yellow-400 px-2 py-8 text-center text-xl font-bold">
            {person.name}
          </h2>
          <section className="py-8">
            <p>Birth Date: {person.birth_year}</p>
            <p>Height: {person.height}</p>
            <p>Gender: {person.gender}</p>
            <p>Color: {person.skin_color}</p>
            <p>Eye Color: {person.eye_color}</p>
          </section>
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
    <main className="min-h-screen bg-gradient-to-r from-gray-900 via-black to-gray-800 p-4 text-white">
      <h1 className="mb-6 text-center text-3xl font-bold">Star Wars: Person 3</h1>

      {state.error && <p className="text-center text-red-800">{state.error}</p>}

      {state.isLoading && <p className="text-center text-black">Loading...</p>}

      {!state.isLoading && !state.error && <PeopleList people={state.people} />}
    </main>
  )
}
