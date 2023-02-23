import React from "react";
import { useDispatch } from "react-redux";
import { setNameTrainerGlobal } from "../../store/slices/nameTrainer.slice";
import './styles/Home.css'

const Home = () => {
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    const nameTrainer = e.target.nameTrainer.value;
    dispatch(setNameTrainerGlobal(nameTrainer));
  };
  return (
    <main className="Main">
      <section className="main_section">
        <div className="main_img">
          <img src="/images/pokedex.png" alt="" />
        </div>
        <h2 className="main_tittle">Welcome Trainer!</h2>
        <p className="main_subtitle">Give me your name to Start!</p>
        <form  onSubmit={handleSubmit}>
          <input 
          className="main_input"
            id="nameTrainer"
            type="text"
            placeholder="your namesss..."
            required
          />
          <button className="css-button-rounded--blue">Start</button>
        </form>
      </section>
    </main>
  );
};

export default Home;
