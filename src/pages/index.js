// React.js and Next.js 
import React from "react";
import { useCallback, useState, useEffect } from "react";

// TS Particles
import { loadSlim } from "tsparticles-slim";
import Particles from "react-tsparticles";

// React icons
import { AiOutlineDown } from 'react-icons/ai';
import { VscLoading } from 'react-icons/vsc';

// Home definition
export default function Home() {

  // useState declaration
  const [gptOut, setGPTOut] = useState([]);
  const [output, setOutput] = useState(
    <div style={{ height: "500px" }}></div>
  );
  const [inputButton, setButton] = useState(
    <button type="submit" onClick={generateButtonHandler} className="drop-shadow-md bg-[#8a5cb5] hover:bg-[#BA55D3] text-xl text-white font-santello py-4 px-5 border-b-4 border-[#8B008B] hover:border-[#8a5cb5] rounded-lg">
      Generate
    </button>
  );

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
      <div className="max-w rounded overflow-hidden shadow-lg">
        <div className="px-10 py-5">
          <p className="text-gray-700 text-xl">
            {item["paragraph"]}
          </p>
        </div>
      </div>
    );
    const imageOutput = (
      <div className="max-w rounded overflow-hidden shadow-lg col-span-2">
        <img className="w-full object-fill h-full" src={`data:image/png;base64,${item["data"]}`} alt="example image" />
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
    setOutput(<div style={{ height: "500px" }}></div>);

    // Set the button
    setButton(
      <button disabled type="submit" className="drop-shadow-md flex bg-[#8a5cb5] hover:bg-[#BA55D3] text-xl text-white font-santello py-4 px-5 border-b-4 border-[#8B008B] rounded-lg">
        <div className="animate-spin h-5 w-5 mr-3 ...">
          <VscLoading/>
        </div>
        Processing... 
      </button>
    );

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
      // Set the button
      setButton(
        <button type="submit" onClick={generateButtonHandler} className="drop-shadow-md bg-[#8a5cb5] hover:bg-[#BA55D3] text-xl text-white font-santello py-4 px-5 border-b-4 border-[#8B008B] hover:border-[#8a5cb5] rounded-lg">
          Generate Again
        </button>
      )

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
    <main className="h-screen bg-gradient-to-b scrollbar-thin scrollbar-thumb-[#8a5cb5] scrollbar-track-gray-300 overflow-y-scroll scrollbar-thumb-rounded-full scrollbar-track-rounded-full">
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
              <div className="font-santello text-fablr-purple text-9xl drop-shadow-md">
                Fablr
              </div>
              <div className="font-santello text-fablr-purple text-4xl drop-shadow-md">
                A New way to make your stories happen
              </div>
            </div>
          </div>
          <div className='drop-shadow-xl flex flex-col justify-center items-center h-full'>
            <div className="flex items-center justify-center w-full">
              <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 590" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="5%" stopColor="#f5f5f5"></stop><stop offset="95%" stopColor="#8a5cb5"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,200 0,200 C 176.80000000000007,179.73333333333335 353.60000000000014,159.46666666666667 509,171 C 664.3999999999999,182.53333333333333 798.3999999999999,225.86666666666667 950,236 C 1101.6000000000001,246.13333333333333 1270.8000000000002,223.06666666666666 1440,200 C 1440,200 1440,600 1440,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="0.53" className="transition-all duration-300 ease-in-out delay-150 path-0"></path><defs><linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="5%" stopColor="#f5f5f5"></stop><stop offset="95%" stopColor="#8a5cb5"></stop></linearGradient></defs><path d="M 0,600 C 0,600 0,400 0,400 C 152.53333333333336,384.1333333333333 305.0666666666667,368.2666666666667 469,353 C 632.9333333333333,337.7333333333333 808.2666666666667,323.06666666666666 972,331 C 1135.7333333333333,338.93333333333334 1287.8666666666668,369.4666666666667 1440,400 C 1440,400 1440,600 1440,600 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-1"></path></svg>
              {/* <svg width="100%" height="100%" id="svg" viewBox="0 0 1440 490" xmlns="http://www.w3.org/2000/svg" className="transition duration-300 ease-in-out delay-150"><defs><linearGradient id="gradient" x1="50%" y1="100%" x2="50%" y2="0%"><stop offset="5%" stopColor="#f5f5f5"></stop><stop offset="95%" stopColor="#8a5cb5"></stop></linearGradient></defs><path d="M 0,500 C 0,500 0,250 0,250 C 111,223.28571428571428 222,196.57142857142858 342,226 C 462,255.42857142857142 590.9999999999999,341 723,342 C 855.0000000000001,343 990,259.42857142857144 1110,230 C 1230,200.57142857142856 1335,225.28571428571428 1440,250 C 1440,250 1440,500 1440,500 Z" stroke="none" strokeWidth="0" fill="url(#gradient)" fillOpacity="1" className="transition-all duration-300 ease-in-out delay-150 path-0"></path></svg> */}
              <div className="absolute flex flex-col justify-center items-center mb-10">
                <div className=" drop-shadow-md font-santello text-fablr-purple-dark text-3xl">
                  Try it out below!
                </div>
                <button onClick={scrollToElement} className="drop-shadow-md animate-bounce bg-fablr-purple text-fablr-purple-dark mt-2">
                  <AiOutlineDown size={48} />
                </button>
              </div>
            </div>
            <div className="bg-[#f5f5f5] h-full w-full flex justify-center py-10">
              <div className="w-full max-w-3xl">
                <div className='flex justify-center text-gray-700 py-6' id="bp1">
                  <p className='text-3xl font-santello text-fablr-purple drop-shadow-md'> Enter a storyline ⤵</p>
                </div>
                <div className="md:flex md:items-center mb-6">
                  <div className="md:w-full">
                    <textarea
                      className="drop-shadow-md bg-gray-200 font-santello appearance-none border-2 border-gray-200 rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:bg-white focus:border-purple-300"
                      id="prompt"
                      name="name"
                      rows="3" 
                      style={{ resize: 'vertical' }} 
                    ></textarea>
                  </div>
                </div>
                <div className="flex justify-center ">
                  {inputButton}
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