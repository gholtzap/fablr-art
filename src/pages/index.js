// React.js and Next.js 
import React from "react";
import { useCallback, useState, useEffect } from "react";

// TS Particles
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

// React icons
import { AiOutlineDown } from 'react-icons/ai';

// Home definition
export default function Home() {

  // Image declaration
  const [image, setImage] = useState('');

  // Particle settings 
  const particlesSettings = {
    background: {
      color: {
        value: "#0d47a1",
      },
      opacity: 0
    },
    fpsLimit: 120,
    interactivity: {
      events: {
        resize: true,
      },
      modes: {
        push: {
            quantity: 4,
        },
        repulse: {
            distance: 200,
            duration: 0.4,
        },
      },
    },
    particles: {
      color: {
        value: "#6f18c7",
      },
      move: {
        directions: "none",
        enable: true,
        outModes: {
            default: "bounce",
        },
        random: false,
        speed: 1,
        straight: false,
      },
      number: {
        density: {
          enable: true,
          area: 800,
        },
        value: 50,
      },
      opacity: {
        value: 0.5,
      },
      shape: {
        type: "circle",
      },
      size: {
        value: { min: 1, max: 5 },
      },
    },
    detectRetina: true,
  }

  // Particle engine initialization
  const particlesInit = useCallback(async engine => {
    await loadSlim(engine);
  }, []);

  // Scroll behavior definition
  function scrollToElement() {
    const element = document.getElementById('bp1');
    element.scrollIntoView({behavior: 'smooth'});
  }

  // "Generate" button handling function
  async function generateButtonHandler(){
    fetch(
      'http://127.0.0.1:8080/generate', 
    )
      .then(res => res.json())
      .then(data => setImage(data[0]["data"]))
      .catch(error => console.log(error));
  }

  // "Process raw text to a list of storyline and drop image description text"
  function parseRawText(raw_test){
    let texts = raw_test.split("  ")
    let stories = [] 
    let images_desc= [] 
    for (let i = 0; i<texts.length; i++){
      if (texts[i].includes("Image description:")){
        images_desc.push(texts[i])
      } else stories.push(texts[i])
    }
    // console.log(images_desc)
    // console.log(stories)
    return stories, images_desc
  }

  function storyLayout(){
      return (
        <div className="flex flex-col bg-grey">

        </div>
      )
  }

  // 
  const submitContact = async (event) =>{
    event.preventDefault();
    parseRawText(event.target.name.value)
    // console.log(event.target.name.value)
  }

  // Render content
  return (
    <main className="h-screen bg-gradient-to-b">
      <div className="relative">
        <div className="absolute">
          <Particles
            id="tsparticles"
            init={particlesInit}
            options={particlesSettings}
          />
        </div>
        <div children="flex flex-col">
          <div className='drop-shadow-xl flex flex-col justify-center items-center'>
            <div className="text-gray-700 text-8xl mt-60">
              Fablr
            </div>
            <div className="text-gray-700 text-3xl pt-10">
              A New way to make your stories happen
            </div>
          </div>
          <div className='drop-shadow-xl flex flex-col justify-center items-center h-full'>
            <div className="flex items-center justify-center w-full">
              <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="5%" stopColor="#f5f5f5"></stop><stop offset="95%" stopColor="#8a5cb5"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,250 0,250 C 111,223.28571428571428 222,196.57142857142858 342,226 C 462,255.42857142857142 590.9999999999999,341 723,342 C 855.0000000000001,343 990,259.42857142857144 1110,230 C 1230,200.57142857142856 1335,225.28571428571428 1440,250 C 1440,250 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
              <div className="absolute flex flex-col justify-center items-center">
                <div className="text-3xl mb-5">
                  Try it out below!
                </div>
                <button onClick={scrollToElement} className="animate-bounce">
                  <AiOutlineDown size={48}/>
                </button>
              </div>
            </div>
            <div className="bg-[#f5f5f5] h-screen w-full flex justify-center py-10">
              <form className="w-full max-w-3xl" onSubmit={submitContact}>
                <div className='flex justify-center text-gray-700 py-6' id="bp1">
                  <p className='text-3xl'>Enter a storyline</p>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-full">
                    <input className="bg-gray-200 appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-300" id="inline-full-name" name="name" type="text"></input>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <button type="submit" onClick={generateButtonHandler} className="bg-[#8a5cb5] hover:bg-[#BA55D3] text-white font-bold py-2 px-4 border-b-4 border-[#8B008B] hover:border-[#8a5cb5] rounded">
                    Generate
                  </button>
                  <img src={`data:image/png;base64,${image}`} alt="example image" />
                </div>
              </form>
            </div>
          </div>
        </div>
                
      </div>
    </main>
  )
}