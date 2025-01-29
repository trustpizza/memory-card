function Selector({ handleChange, type, choices, name }) {
  const id = `${name}-select`

  return (
    <>
      <div className="w-full max-w-md mb-4">
        
        <label htmlFor={id}>Select {name}:</label>
        <select className="select select-primary w-full" onChange={handleChange} name={name} id={id} value={type}>
          <option disabled value="">--Choose a {name}--</option>
          {Object.keys(choices).map((key) => (
            <option key={key} value={choices[key]}>{key}</option>
          ))}
        </select>
      </div>
    </>
  )
}

export default Selector;