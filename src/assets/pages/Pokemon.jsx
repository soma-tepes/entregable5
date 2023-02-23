import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './styles/Pokemon.css'

const Pokemon = () => {

const [pokemon, setPokemon] = useState()

const {id}= useParams()

const getPerBar =(stat)=>{
  const percen = (stat * 100) / 255
  return `${percen}%`
}

useEffect(()=>{
  const URL = `https://pokeapi.co/api/v2/pokemon/${id}/`
  axios.get( URL)
  .then((res)=>setPokemon(res.data))
  .catch((err)=>console.log(err))
},[])


  return (
    <main  >
      <section>
        <section>
          <div className="pokemon ">
            <img src={pokemon?.sprites.other["official-artwork"].front_default} alt="" />
          </div>
        </section>
      </section>

      <section className="habilidades">
        <div className="hab">
        <h2>{pokemon?.id}</h2>
        <h2>{pokemon?.name}</h2>
        <div>
          <div>
            <h5>Weignt</h5>
            <h4>{pokemon?.weight}</h4>
          </div>
          <h5>heing</h5>
          <h4>{pokemon?.height}</h4>
        </div>

        <div>
          <div>
            <h3>type</h3>
            <div>
              {
                pokemon?.types.map(type=> <div key={type.type.name}> <span>{type.type.name}</span></div>)
              }
             </div>
          </div>

          <div>
            <h3>habilites</h3>
            <div>
              {
                pokemon?.abilities.map(ability=> <div key={ability.ability.name}><span>{ability.ability.name}</span></div>)
              }
            
            </div>
          </div>
        </div>
        </div>
        
      <section className="pokemon_stats">
        <h2 className="pokemon_stats_title">stats</h2>
        <section>
          {
            pokemon?.stats.map(stat=>(

              <article className="pokemon_stat" key={stat.stat.name}>
              <div className="pokemon_stat_header">
                <h4 className="pokemon_stat_name">{stat.stat.name}</h4>
                <h5 className="pokemon_stat_value">{stat.base_stat}/255</h5>
                </div>
              <div className="pokemon_stat_barGray" >
                <div className="pokemon_stat_barProgress " style={{width: getPerBar(stat.base_stat)}}>
  
                </div>
              </div>
          </article>

            ))
          }
       
        </section>
      </section>
      </section>
    </main>
  );
};

export default Pokemon;
