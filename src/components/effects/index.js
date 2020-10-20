import React from 'react'
import styled from 'styled-components'
import { useAppContext } from '../../context'

const Column = styled.fieldset`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`

const Button = styled.button`
  border: none;
  background: ${({ theme }) => theme === 'light' ? '#333' : '#aaa'};
  color: ${({ theme }) => theme === 'light' ? '#aaa' : '#333'};
  border-bottom: 4px solid ${({ theme }) => theme === 'light' ? '#222' : '#666'};
  border-radius: 2px;
  padding: 10px;
  margin-bottom: 10px;
  ${({ enabled }) => enabled && `color: orange;`}
`

export default () => {
  const { state, dispatch } = useAppContext()
  
  return (
    <Column>
      <legend>Effects</legend>
      {Object.entries(state.effects).map(([k, v]) => (
        <Button
          enabled={v}
          theme={state.theme}
          onClick={() => dispatch({ type: 'TOGGLE_EFFECT', payload: { name: k, value: !v } })}
          key={k}
        >
          {k}: {v ? 'on' : 'off'}
        </Button>
      ))}
    </Column>
  )
}