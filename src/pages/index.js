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
  const [gptOut, setGPTOut] = useState([]);
  const [output, setOutput] = useState();

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
    element.scrollIntoView({ behavior: 'smooth' });
  }

  // Grid Row component 
  function getRow(item, index) {
    // Create the paragraph and image sections
    const textOutput = (
      <div class="max-w rounded overflow-hidden shadow-lg">
        <div class="px-10 py-5">
          <p class="text-gray-700 text-xl">
            {item["paragraph"]}
          </p>
        </div>
      </div>
    );
    const imageOutput = (
      <div class="max-w rounded overflow-hidden shadow-lg col-span-2">
        <img class="w-full object-fill h-full" src={`data:image/png;base64,${item["data"]}`} alt="example image" />
      </div>
    );

    // Check if the index is even
    if (index % 2 == 0) {
      return (
        <>
          {textOutput}
          {imageOutput}
        </>
      );
    } else {
      return (
        <>
          {imageOutput}
          {textOutput}
        </>
      );
    }
  }

  // API Call
  async function generateButtonHandler() {
    // Clear the result section
    setOutput(<></>);

    // Call API endpoint
    fetch(
      'http://127.0.0.1:8080/generate',
      {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            "prompt": document.getElementById('prompt').value,
          }
        ),
      }
    )
      .then(res => res.json())
      .then(data => setGPTOut(data))
      .catch(error => console.log(error));
  }

  // Result updater
  useEffect(() => {
    // Check if the gptOutput is good
    if (gptOut.length > 0) {
      // Construct the list
      setOutput(
        <div className="grid grid-cols-3 gap-20 w-2/3">
          {gptOut.map((item, index) => (getRow(item, index)))}
        </div>
      )
    }
  }, [gptOut]);

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
          <div className="mt-60">
            <div className="flex flex-col justify-center items-center">

              <div className="font-santello text-fablr-purple text-9xl">
                Fablr
              </div>
              <div className="font-santello text-fablr-purple text-4xl">
                A New way to make your stories happen
              </div>
            </div>
          </div>
          <div className='drop-shadow-xl flex flex-col justify-center items-center h-full'>
            <div className="flex items-center justify-center w-full">
              <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="5%" stopColor="#f5f5f5"></stop><stop offset="95%" stopColor="#8a5cb5"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,250 0,250 C 111,223.28571428571428 222,196.57142857142858 342,226 C 462,255.42857142857142 590.9999999999999,341 723,342 C 855.0000000000001,343 990,259.42857142857144 1110,230 C 1230,200.57142857142856 1335,225.28571428571428 1440,250 C 1440,250 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg>
              <div className="absolute flex flex-col justify-center items-center">
                <div className="font-santello text-fablr-purple text-3xl">
                  Try it out below!
                </div>
                <button onClick={scrollToElement} className="animate-bounce bg-fablr-purple text-fablr-purple">
                  <AiOutlineDown size={48} />
                </button>
              </div>
            </div>
            <div className="bg-[#f5f5f5] h-full w-full flex justify-center py-10">
              <div className="w-full max-w-3xl">
                <div className='flex justify-center text-gray-700 py-6' id="bp1">
                  <p className='text-3xl font-santello text-fablr-purple'> Enter a storyline ⤵</p>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-full">
                    <input className="bg-gray-200 font-santello appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-300" id="prompt" name="name" type="text"></input>
                  </div>
                </div>
                <div className="flex justify-center ">
                  <button type="submit" onClick={generateButtonHandler} className="bg-[#8a5cb5] hover:bg-[#BA55D3] text-xl text-white font-santello py-5 px-7 border-b-4 border-[#8B008B] hover:border-[#8a5cb5] rounded">
                    Generate
                  </button>
                </div>
              </div>
            </div>
            <div className="flex h-full w-full bg-[#f5f5f5] justify-center p-20">
              {output}
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}