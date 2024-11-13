import { Button, Card } from 'react-bootstrap'

export const Carts = ({ carts, setCarts }) => {
  const deleteFromCartsClick = (id) => {
    const selectedItems = carts.filter((c) => c.id !== id)
    setCarts(selectedItems)
  }

  const cartsHtml = carts.map((c) => {
    return (
      <Card style={{ width: '200px' }} key={c.id}>
        <Card.Img variant='top' src={c.thumbnailUrl} />
        <Card.Body>
          <Card.Title>{c.title}</Card.Title>
          <Card.Text>${c.price.toFixed(2)}</Card.Text>
          <Button
            variant='outline-danger'
            onClick={() => deleteFromCartsClick(c.id)}
          >
            Delete from Carts
          </Button>
        </Card.Body>
      </Card>
    )
  })

  return (
    <div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridRowGap: '25px',
          gridColumnGap: '30px',
          height: '520px',
          overflowY: 'auto',
          justifyItems: 'center',
          alignItems: 'start'

        }}
      >
        {cartsHtml}
      </div>
      {/* ----------------------------------------------- */}
      <h4 style={{ margin: '10px' }}>
        Products:{' '}
        <span className='badge bg-danger'>
          {carts.length}
          {carts.length > 1 ? ' items' : ' item'}
        </span>{' '}
        -
        Total price:{' '}
        <span className='badge bg-success'>
          ${carts.reduce((p, c) => p + c.price, 0).toFixed(2)}
        </span>
      </h4>
      <button className='btn btn-warning' style={{margin:'10px'}}>
        Checkout <i className='bi bi-credit-card'></i>
      </button>
    </div>
  )
}
