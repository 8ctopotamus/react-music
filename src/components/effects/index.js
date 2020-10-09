import React from 'react'
import { useAppContext } from '../../context'

export default () => {
  const { state, dispatch } = useAppContext()

  return Object.entries(state.effects).map(effect => {

    const [k, v] = effect
    console.log(k, v)
    
    return (
      <button onClick={() => dispatch({ type: 'TOGGLE_EFFECT', payload: { name: k, value: !v } })}>{k}: {v ? 'on' : 'off'}</button>
    )
  })
}