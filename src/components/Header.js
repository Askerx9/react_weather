import React from 'react'
import './Header.css'



const Header = ({zip, zipcodes, handleChange,handleSubmit, selectZip}) => {

  const liste = zipcodes.map((el, index) => (
    <li
    className="zipcode_list"
    onClick={() => selectZip(el)}
    key={index}>
      <p className="zipcode__zip">
        {el.Code_postal} {el.Localité_FR}
      </p>
    </li>
  ))

  return (
    <header className="container header">
      <form
      onSubmit= {handleSubmit}>
        <input
        type="texte"
        value= {zip}
        placeholder="zip code"
        onChange={handleChange} />
        <ul>
          {liste}
        </ul>
        <button type="submit">submit</button>
      </form>
    </header>
  )
}

export default Header