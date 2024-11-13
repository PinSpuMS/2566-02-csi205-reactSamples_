import { Button, Card } from 'react-bootstrap'

export const Products = ({ products, setProducts, carts, setCarts }) => {
  const addToCartsClick = (id) => {
    const selectedProduct = products.find((p) => p.id === id)
    setCarts([...carts, selectedProduct])
  }

  const productsHtml = products.map((p) => {
    return (
      <Card style={{ width: '200px' }} key={p.id}>
        <Card.Img variant='top' src={p.thumbnailUrl} />
        <Card.Body>
          <Card.Title>{p.title}</Card.Title>
          <Card.Text>${p.price.toFixed(2)}</Card.Text>
          {carts.find((c) => c.id === p.id) ? (
            <p className='h5'><span className='badge bg-danger'>added to carts</span></p>
          ) : (
            <Button
              variant='outline-primary'
              onClick={() => addToCartsClick(p.id)}
            >
              Add to carts
            </Button>
          )}
        </Card.Body>
      </Card>
    )
  })

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridRowGap: '25px',
        gridColumnGap: '30px',
        height: '630px',
        overflowY: 'auto',
        justifyItems: 'center',
        alignItems: 'start',
      }}
    >
      {productsHtml}
    </div>
  )
}
