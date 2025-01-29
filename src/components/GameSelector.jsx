function GameSelector({ handleChange, version }) {

  return (
    <>
      <div>
      <label htmlFor="version-select">Select version:</label>
      <select onChange={handleChange} name="version" id="version-select" value={version}>
        <option disabled value="">--Choose an Option--</option>
        <option value="gif">Gif</option>
        <option value="poke">Pokemon</option>
      </select>
      </div>
    </>
  )
}

export default GameSelector;