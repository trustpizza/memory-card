function Selector({ handleChange, type, choices, name }) {
  const id = `${name}-select`
  // console.log(type)
  return (
    <>
      <div>
      <label htmlFor={id}>Select {name}:</label>
      <select onChange={handleChange} name={name} id={id} value={type}>
        <option disabled value="">--Choose an Option--</option>
        {Object.keys(choices).map((key) => (
          <option key={key} value={choices[key]}>{key}</option>
        ))}
      </select>
      </div>
    </>
  )
}

export default Selector;