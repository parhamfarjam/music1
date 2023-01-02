import React, { createContext, useContext, useReducer } from 'react'

export const StateContect = createContext()

export const StateProvider = ({reducer ,initialState , children})=> (
    <StateContect.Provider value={useReducer(reducer,initialState)}>
        {children}
    </StateContect.Provider>
)

export const useStateValue = ()=> useContext(StateContect) 