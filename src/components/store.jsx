function createStore(initialState = {}) {
  let state = initialState
  const listeners = new Set()

  const getState = () => Object.freeze({ ...state })

  const setState = (newState) => {
    const nextState = typeof newState === 'function' ? newState(state) : { ...state, ...newState }

    const hasChanged = Object.keys(nextState).some((key) => nextState[key] !== state[key])

    if (!hasChanged) return

    state = nextState
    listeners.forEach((listener) => listener(getState()))
  }

  const subscribe = (listener) => {
    listeners.add(listener)

    listener(getState())
    return () => listeners.delete(listener)
  }

  const reset = () => setState(initialState)

  return { getState, setState, subscribe, reset }
}

const store = createStore({
  people: [],
  isLoading: false,
  error: null,
})

export default store
