import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import PokemonCard from '../../components/pokedex/PokemonCard'
import './styles/Pokedex.css'
import './styles/Pokemon.css'

const Pokedex = () => {
const [pokemons, setPokemon] = useState([])
const [pokemonFilter, setPokemonFilter] = useState([])
const [types, setTypes] = useState([])
const [selecttype, setSelectType] = useState("")
const [pokemonName, setPokemonName] = useState("")
const [currentPage, setCurrentPage] = useState(1)

const nameTrainer= useSelector(store=>store.nameTrainer)


const handleSelect =(e)=>{
 setSelectType(e.target.value)
}

const handelSubmit=(e)=>{
  e.preventDefault()
  setPokemonName(e.target.pokemonName.value)
}



const paginationLogic =()=>{
  const pokemonPerPage = 12

  const sliceStart = (currentPage -1 ) * pokemonPerPage
  const sliceEnd = sliceStart + pokemonPerPage
  const pokemonInPage = pokemonFilter.slice(sliceStart,sliceEnd)

  const lastPage = Math.ceil(pokemonFilter.length/pokemonPerPage)||1

  const pagesPerBlock = 5 
  const actualBlock = Math.ceil(currentPage/ pagesPerBlock)

  const pagesInBlock = []
  const minPage = (actualBlock * pagesPerBlock - pagesPerBlock )+1
  const maxPage = actualBlock * pagesPerBlock

  for(let i = minPage; i<=maxPage; i++){
    if(i<=lastPage){
      pagesInBlock.push(i)
    }
   
  }
  return {pagesInBlock,lastPage,pokemonInPage}
}

const {pagesInBlock,lastPage,pokemonInPage} = paginationLogic()

const handleNextPage =()=>{
  const nextPage = currentPage +1
  if(nextPage>lastPage){
    setCurrentPage(1)
  }
  else{
    setCurrentPage(nextPage)
  }
 
}

const handlePreviusPage =()=>{
const newPage = currentPage -1
if(newPage<1){
  setCurrentPage(lastPage)
}
else{
  setCurrentPage(newPage)
}
}

useEffect(()=>{
  const pokemonByNames = pokemons.filter(pokemon =>pokemon.name.includes(pokemonName.toLowerCase()))
  setPokemonFilter(pokemonByNames)
  },[pokemonName,pokemons])

useEffect(()=>{
  const URL =`https://pokeapi.co/api/v2/${selecttype ?`type/${selecttype}/`:"pokemon/"}`
  axios.get(URL)
  .then((res)=>{
    if(selecttype){
    const pokemonByType =  res.data.pokemon.map(pokemon=>({
       
          name: pokemon.pokemon.name,
          url: pokemon.pokemon.url
        
      }))
      setPokemon(pokemonByType)
    }
    else{
      setPokemon(res.data.results)
    }
   
  }
    )
  .catch((err)=>console.log(err))
},[selecttype])


useEffect(()=>{
  const URL =`https://pokeapi.co/api/v2/type/`
  axios.get(URL)
  .then((res)=>setTypes(res.data.results))
  .catch((err)=>console.log(err))
},[])

useEffect(()=>{
  setCurrentPage(1)
},[pokemons])

  return (
   <main className='pokedex'>
    <p><span> Welcome {nameTrainer}</span></p>

    <form onSubmit={handelSubmit}>
      <div>
        <input className='main_input' type="text" id='pokemonName' placeholder='Search your pokemon' />
        <button  className="css-button-rounded--blue">Search</button>
      </div>
      <select  className='main_input' onChange={handleSelect} >
        <option value="">All</option>
        {
          types.map(type=><option key={type.url} >{type.name}</option>)
        }
      </select>
    </form>
    <section className='PokedexCard'>
      {
        pokemonInPage.map(pokemon=>
         <PokemonCard key={pokemon.url} pokemonUrl={pokemon.url}/>
          )
      }
    </section>
    <section >
   <ul className='pagination'>
    <li onClick={handlePreviusPage}>{'<<'}</li>
   <li onClick={()=>{setCurrentPage(1)}}>...</li>
    {
      pagesInBlock.map(page=><li onClick={()=>{setCurrentPage(page)}} key={page}>{page}</li>)
    }
    <li onClick={()=>{setCurrentPage(lastPage)}}>...</li>
    <li onClick={handleNextPage}>{'>>'}</li>
   </ul>
   
   </section>
   </main>
  )
}

export default Pokedex