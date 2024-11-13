import React, { useState, useEffect, useRef } from 'react'
import { Button, Modal } from 'react-bootstrap'

import { fetchTodos } from '../data/todos'

export const Todos = () => {

  const [todosRaw, setTodosRaw] = useState([])

  const [itemsPerPage, setItemPerPage] = useState(10)
  const [todos, setTodos] = useState([])
  const [curPage, setCurPage] = useState(0)
  const [numPages, setNumPages] = useState(0)
  const [onlyWaiting, setOnlyWaiting] = useState(false)

  const newTitleRef = useRef()
  const newIdRef = useRef()

  useEffect(() => {
    setTodosRaw(fetchTodos)
  }, []) // fetch => todosRaw

  useEffect(() => {
    const selectedItems = todosRaw.filter(
      (todo) => !onlyWaiting || !todo.completed
    )
    setTodos(selectedItems)
  }, [todosRaw, onlyWaiting, itemsPerPage]) // todosRaw, onlyWaiting, itemsPerpage => todos

  useEffect(() => {
    setNumPages(Math.ceil(todos.length / itemsPerPage))
  }, [todos]) // todos => numPages

  useEffect(() => {
    if (numPages === 0) setCurPage(0)
    else if (curPage === 0) setCurPage(1)
    else if (curPage > numPages) setCurPage(numPages)
  }, [numPages]) // numPages => curPage

  const waitingClick = (id) => {
    const selectedItem = todosRaw.find((todo) => {
      return todo.id === id
    })
    selectedItem.completed = true
    setTodosRaw([...todosRaw]) // force update
  }

  const deleteClick = (id) => {
    setTodosRaw(
      todosRaw.filter((todo) => {
        return todo.id !== id
      })
    )
  }

  const todosHtml = todos.map((todo, index) => {
    const start = (curPage - 1) * itemsPerPage
    const end = start + itemsPerPage
    if (start <= index && index < end)
      return (
        <tr key={todo.id}>
          <td>
            <span className='badge bg-secondary'>{todo.id}</span>
          </td>
          {/* <td>{todo.userId}</td> */}
          <td style={{ textAlign: 'left' }}>{todo.title}</td>
          <td style={{ textAlign: 'right' }}>
            {todo.completed ? (
              <span className='badge bg-success'>
                done <i className='bi bi-check-lg'></i>
              </span>
            ) : (
              <button
                className='btn btn-sm btn-warning'
                onClick={() => waitingClick(todo.id)}
              >
                waiting <i className='bi bi-clock'></i>
              </button>
            )}
            {/* <button
              className='btn btn-sm btn-info button-spacing'
              onClick={() => handleEditOpen(todo.id)}
            >
              <i className='bi bi-pencil-square'></i>
            </button> */}
            <button
              className='btn btn-sm btn-danger button-spacing'
              onClick={() => deleteClick(todo.id)}
            >
              <i className='bi bi-trash button'></i>
            </button>
          </td>
        </tr>
      )
  })

  const [showNewModal, setShowNewModal] = useState(false)

  useEffect(() => {
    if (showNewModal) newTitleRef.current.focus()
  }, [showNewModal])

  const handleNewSave = () => {
    const newTodo = {
      id: Number(newIdRef.current.innerText),
      userId: 0,
      title: newTitleRef.current.value,
      completed: false,
    }
    setTodosRaw([...todosRaw, newTodo])
    newIdRef.current.innerText = ''
    newTitleRef.current.value = ''
    setShowNewModal(false)
  }

  const selectedChange = (e) => {
    setItemPerPage(Number(e.target.value))
  }

  return (
    <div>
      {/* New ------------------------- */}
      <Modal show={showNewModal} onHide={() => setShowNewModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            <span className='badge bg-primary'>
              <i className='bi bi-plus'></i>
            </span>{' '}
            Add todo
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='mb-3'>
            ID:{' '}
            <span className='badge bg-secondary' ref={newIdRef}>
              {todosRaw.reduce(
                (prev, cur) => (prev >= cur.id ? prev : cur.id),
                0
              ) + 1}
            </span>
          </div>
          <div className='mb-3'>
            <label htmlFor='new-title' className='form-label'>
              Title:
            </label>
            <input
              type='text'
              className='form-control'
              id='new-title'
              placeholder='typing your todo title here...'
              ref={newTitleRef}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant='secondary' onClick={() => setShowNewModal(false)}>
            Close
          </Button>
          <Button variant='primary' onClick={() => handleNewSave()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
      {/* ------------------------- */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div className='form-check form-switch' style={{ textAlign: 'left' }}>
          <input
            className='form-check-input'
            type='checkbox'
            role='switch'
            id='flexSwitchCheckDefault'
            checked={onlyWaiting}
            onChange={(e) => setOnlyWaiting(e.target.checked)}
          />
          <label className='form-check-label' htmlFor='flexSwitchCheckDefault'>
            Show only{' '}
            <button className='btn btn-sm btn-warning'>
              waiting <i className='bi bi-clock' />
            </button>
          </label>
        </div>
        <div style={{ marginBottom: '5px' }}>
          <select
            className='form-select'
            aria-label='Default select example'
            onChange={selectedChange}
            defaultValue={10}
            id='form-select'
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </select>
        </div>
      </div>
      <table className='table table-striped'>
        <thead>
          <tr className='table-dark'>
            <th>ID</th>
            {/* <th>User ID</th> */}
            <th>Title</th>
            <th style={{ textAlign: 'right' }}>
              Completed{' '}
              <button
                className='btn btn-sm btn-primary button-spacing'
                onClick={() => {
                  setShowNewModal(true)
                }}
              >
                <i className='bi bi-plus'></i>
              </button>
            </th>
          </tr>
        </thead>
        <tbody>{todosHtml}</tbody>
      </table>
      <button
        className='btn btn-sm btn-outline-primary button-spacing'
        onClick={() => setCurPage(1)}
        disabled={curPage <= 1}
      >
        First
      </button>
      <button
        className='btn btn-sm btn-outline-primary button-spacing'
        onClick={() => (curPage > 1 ? setCurPage((p) => p - 1) : null)}
        disabled={curPage <= 1}
      >
        Previous
      </button>
      {curPage} / {numPages}
      <button
        className='btn btn-sm btn-outline-primary button-spacing'
        onClick={() => (curPage < numPages ? setCurPage((p) => p + 1) : null)}
        disabled={curPage === numPages}
      >
        Next
      </button>
      <button
        className='btn btn-sm btn-outline-primary button-spacing'
        onClick={() => setCurPage(numPages)}
        disabled={curPage === numPages}
      >
        Last
      </button>
    </div>
  )
}
