export function Filters () {
  return (
    <section className='filters'>
      <div>
        <label htmlFor='price'>Price</label>
        <input
          type='range'
          id='price'
          name='price'
          min='0'
          max='1000'
        />
      </div>
      <div>
        <label htmlFor='category'>Category</label>
        <select id='category' name='category'>
          <option value='all'>All</option>
          <option value='laptops'>Laptops</option>
          <option value='smartphones'>Smartphones</option>
          <option value='toys'>Toys</option>
        </select>
      </div>
    </section>
  )
}
