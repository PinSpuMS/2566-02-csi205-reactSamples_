import React, { useEffect, useRef } from 'react'
import { apiPostTokenLogin } from '../data/logins'

export const Login = ({setToken }) => {
  const userRef = useRef()
  const passRef = useRef()

  useEffect(() => {
    userRef.current.focus()
  })

  const loginClick = (e) => {
    const data = { user: userRef.current.value, pass: passRef.current.value }
    const token = apiPostTokenLogin('dummyUrl', data)
    if (token === '') {
      alert('login/pass is unknown')
    } else {
      setToken(token)
    }

    e.preventDefault()
  }

  return (
    <div>
      <form>
        <div>USER:</div>
        <input
          type='text'
          style={{ textAlign: 'center' }}
          placeholder='user'
          ref={userRef}
          id='user'
        />
        <div>PASS:</div>
        <input
          type='password'
          style={{ textAlign: 'center' }}
          placeholder='pass'
          ref={passRef}
          id='pass'
        ></input>
        <div>
          <button
            className='btn btn-success'
            style={{ marginTop: '10px' }}
            type='submit'
            onClick={loginClick}
          >
            Login
          </button>
        </div>
      </form>
    </div>
  )
}
