import React, { FC, Fragment, useCallback, useEffect, useState } from "react";
// import { PlugButton } from "@raydeck/useplug";
import background from "./assets/bg.png";
import { ActorSubclass } from "@dfinity/agent";
import { _SERVICE } from "./declarations/backend/backend.did";
import { createActor } from "./declarations/backend";
import { FaFilePowerpoint, FaGithub, FaHourglass } from "react-icons/fa";
import config from "./config.json";
import {
  ArrowUpIcon,
  CheckCircleIcon,
  QuestionMarkCircleIcon,
  SparklesIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import ModalSlides from "./ModalSlides";
const slideClass =
  "w-80 mb-6 bg-black bg-opacity-80 border-2 border-orange-500 text-md font-medium text-white p-2 rounded-full transition hover:scale-105 transition-duration-250 hover:bg-opacity-60 hover:border-blue-900";

const {
  host,
  canisters: { backend },
} = config[config.mode as "production" | "local"];
let timer: NodeJS.Timer;
const useBackend = () => {
  const [actor, setActor] = useState<ActorSubclass<_SERVICE>>();
  useEffect(() => {
    (async () => {
      console.log("GEtting agent", host, backend);
      const a = createActor(backend, {
        agentOptions: { host },
      });
      console.log("I have an agent");
      setActor(a);
    })();
  }, []);
  return actor;
};
export const LoggedOut: FC = () => {
  const [newClass, setNewClass] = useState("");
  const [plugNewClass, setPlugNewClass] = useState("opacity-0");
  const [iconNewClass, setIconNewClass] = useState("text-black");
  const [isOpen, setIsOpen] = useState(false);
  const [ticks, setTicks] = useState(BigInt(0));
  const backend = useBackend();
  useEffect(() => {
    setTimeout(() => {
      setNewClass("blur-xl");
      setPlugNewClass("opacity-100");
    }, 2000);
  }, []);
  useEffect(() => {
    if (ticks) {
      setNewClass("blur-xl");
      setTimeout(() => {
        setNewClass("blur-sm");
      }, 1500);
    }
  }, [ticks]);
  useEffect(() => {
    if (isOpen) {
      setPlugNewClass("opacity-0");
    } else {
      setPlugNewClass("opacity-100");
    }
  }, [isOpen]);
  const getStats = useCallback(async () => {
    if (backend) {
      console.log("I am working with a backend");
      const ticks = await backend.getTicks();
      console.log("I got back ticks of", ticks);
      setTicks(ticks);
    }
  }, [backend]);
  useEffect(() => {
    if (backend) {
      clearInterval(timer);
      timer = setInterval(getStats, 5000);
    }
    return () => {
      clearInterval(timer);
    };
  }, [getStats, backend]);

  return (
    <Fragment>
      <div
        className={[
          "h-screen w-screen absolute  bg-cover transition duration-1000 ",
          newClass,
        ].join(" ")}
        style={{ backgroundImage: `url(${background})` }}
        onClick={() => {
          setNewClass("backdrop-blur");
          setPlugNewClass("opacity-100");
        }}
      ></div>

      <div
        className={[
          "h-screen w-screen absolute flex justify-around content-around transition duration-1000 ",
        ].join(" ")}
      >
        <div
          className={[
            "flex flex-col justify-between transition-opacity  duration-1000",
            plugNewClass,
          ].join(" ")}
        >
          <div className="bg-black bg-opacity-50 flex flex-row w-screen justify-between p-4">
            <a
              href="https://github.com/akshay-rakheja/supernova2022"
              className="text-gray-200 hover:text-gray-100 hover:scale-105 transition duration-250"
            >
              <div className="flex flex-row ">
                <FaGithub size={20} />
                <span className="ml-2 font-medium">Fork us on GitHub</span>
              </div>
            </a>
            <div className=" font-bold text-white opacity-50">
              ...or just enjoy the pulses every 10s
            </div>
          </div>

          <div>
            <div className="flex justify-around w-full flex-row">
              <div className="flex">
                <button
                  className={slideClass}
                  onClick={(event) => {
                    setIsOpen(true);
                    console.log("clicky clicky");
                  }}
                >
                  <div className="flex flex-row">
                    <SparklesIcon className="h-6 w-6 mr-2" />
                    Supernova Demo Day Presentation
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-around w-full flex-row">
              <div className="flex">
                <button
                  className={slideClass}
                  onClick={(event) => {
                    window.open(
                      "https://www.youtube.com/watch?v=TK-RihJkvDw",
                      "_blank"
                    );
                    // setIsOpen(true);
                    // console.log("clicky clicky");
                  }}
                >
                  <div className="flex flex-row">
                    <VideoCameraIcon className="h-6 w-6 mr-2" />
                    View Youtube Video
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-around w-full flex-row">
              <div className="flex">
                <button
                  className={slideClass}
                  onClick={(event) => {
                    window.open(
                      "https://fl5mh-daaaa-aaaap-qalja-cai.ic0.app/",
                      "_blank"
                    );
                    // setIsOpen(true);
                    // console.log("clicky clicky");
                  }}
                >
                  <div className="flex flex-row">
                    <FaHourglass className="h-6 w-6 mr-2" />
                    DeTi Home Page
                  </div>
                </button>
              </div>
            </div>

            <div className="flex justify-around w-full flex-row">
              <div className="flex">
                <button
                  className={slideClass}
                  onClick={(event) => {
                    window.open(
                      "https://d7hzd-wiaaa-aaaap-qamba-cai.ic0.app/",
                      "_blank"
                    );
                    // setIsOpen(true);
                    // console.log("clicky clicky");
                  }}
                >
                  <div className="flex flex-row">
                    <CheckCircleIcon className="h-6 w-6 mr-2" />
                    DeTi Tester
                  </div>
                </button>
              </div>
            </div>
          </div>
          <div className="flex justify-around w-full flex-row"></div>
        </div>
      </div>
      <ModalSlides show={isOpen} setShow={setIsOpen} />
    </Fragment>
  );
};

/* This example requires Tailwind CSS v2.0+ */

export default LoggedOut;
