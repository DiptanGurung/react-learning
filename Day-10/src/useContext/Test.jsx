import React from 'react'
import { useCounter } from './CounterContext'

function Test() {

    const { counter } = useCounter();
    return (
        <div>
            Testing Values:{counter}
        </div>
    )
}

export default Test