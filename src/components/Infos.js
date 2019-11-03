import React from 'react'
import './Infos.css'



const Infos = ({city}) => {
  const date = new Date()
  const day = date.getDate()
  const month = new Intl.DateTimeFormat('fr-BE', {month: 'long'}).format(date)

  return (
    <section className="container section section__infos">
      <p className="infos__date">
        {day} {month}
      </p>
      <p className="infos__location">
        {city}
      </p>
      <p>Belgique</p>
    </section>
  )
}

export default Infos