function Selector({ handleChange, version, choices, name }) {
  const id = `${name}-select`

  return (
    <>
      <div>
      <label htmlFor={id}>Select version:</label>
      <select onChange={handleChange} name={name} id={id} value={version}>
        <option disabled value="">--Choose an Option--</option>
        {Object.keys(choices).map((key) => (
          <option value={choices[key]}>{key}</option>
        ))}
      </select>
      </div>
    </>
  )
}

export default Selector;