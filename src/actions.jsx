import store from './store.jsx'

export async function fetchPeople() {
  store.setState({ isLoading: true, error: null })

  try {
    const res = await fetch('https://www.swapi.tech/api/people/3/')
    const data = await res.json()

    const person = data.result?.properties

    const detailedPeople = person ? [person] : []

    console.log('Detailed People:', detailedPeople)

    store.setState({ people: detailedPeople, isLoading: false })
  } catch (err) {
    store.setState({ error: err.message, isLoading: false, people: [] })
  }
}
