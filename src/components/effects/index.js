import React from 'react'
import { useAppContext } from '../../context'

export default () => {
  const { state, dispatch } = useAppContext()
  return Object.entries(state.effects).map(([k, v]) => (
    <button onClick={() => dispatch({ type: 'TOGGLE_EFFECT', payload: { name: k, value: !v } })}>
      {k}: {v ? 'on' : 'off'}
    </button>
  ))
}