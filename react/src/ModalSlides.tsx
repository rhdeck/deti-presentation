import {
  FC,
  Fragment,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Transition, Dialog } from "@headlessui/react";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  XCircleIcon,
} from "@heroicons/react/outline";
import useKeyPress from "./useKeyPress";
import One from "./assets/2.png";
import Two from "./assets/3.png";
import Three from "./assets/4.png";
import Four from "./assets/5.png";
import Six from "./assets/7.png";
import Seven from "./assets/8.png";
import Eight from "./assets/9.png";
import Nine from "./assets/10.png";
import Ten from "./assets/11.png";
import Eleven from "./assets/12.png";
import Twelve from "./assets/2.png";
import useWindowSize from "./useWindowSize";
const slideClass =
  " group w-80 mb-6 bg-black bg-opacity-80 border-2 border-orange-500 text-md font-medium text-white p-2 rounded-full transition hover:scale-105 transition-duration-250 hover:bg-opacity-60 hover:border-blue-900";
const selectorClass =
  "flex justify-center group w-12  mb-6  text-md font-medium text-white p-2  hover:scale-125 opacity-80 hover:opacity-100 transition-all transition-duration-500 ";
const currentSelectorClass =
  "flex justify-center group w-12  mb-6  text-md font-medium text-white p-2  opacity-80 transition-all transition-duration-500 ";
const selectorIconClass = "rounded-full bg-white h-4 w-4";
const currentSelectorIconClass = "rounded-full bg-blue-900 h-4 w-4";
const slideData = [
  { image: One },
  { image: Two },
  { image: Three },
  { image: Four },
  { embed: "https://fl5mh-daaaa-aaaap-qalja-cai.ic0.app/" },
  { image: Six },
  { image: Seven },
  { image: Eight },
  { image: Nine },
  { image: Ten },
  { image: Eleven },
  { image: Twelve },
];
export const ModalSlides: FC<{
  show: boolean;
  setShow: (show: boolean) => void;
}> = ({ show, setShow }) => {
  const [targetHeight, setTargetHeight] = useState(0);
  const [targetWidth, setTargetWidth] = useState(0);
  const windowSize = useWindowSize();
  useEffect(() => {
    setTargetHeight((((windowSize.width * 1) / 1) * 9) / 16);
  }, [windowSize]);
  useEffect(() => {
    setTargetWidth(
      windowSize.width > 1536 ? windowSize.width * 0.75 : windowSize.width
    );
  }, [windowSize]);
  const slides = useMemo(
    () =>
      slideData.map(({ image, embed }, index) => (
        <div style={{ height: targetHeight }} className="w-full align-center">
          {image && <img src={image} style={{ objectFit: "contain" }} />}
          {embed && (
            <iframe
              src={embed}
              style={{ height: targetHeight, width: targetWidth }}
            />
          )}
        </div>
      )),
    [targetHeight]
  );
  const [moving, setMoving] = useState("right");
  const [currentStep, setCurrentStep] = useState(0);
  const pressedRight = useKeyPress("ArrowRight");
  const pressedLeft = useKeyPress("ArrowLeft");
  const pressedSpace = useKeyPress("Space");
  const pressedEscape = useKeyPress("Escape");
  useEffect(() => {
    setShow(false);
  }, [pressedEscape, setShow]);
  const currentStepRef = useRef(currentStep);
  const goLeft = useCallback(() => {
    console.log("Pressed left");
    setMoving("left");
    setCurrentStep((old) => Math.max(old - 1, 0));
  }, []);
  const goRight = useCallback(
    (event?: React.MouseEvent<HTMLButtonElement>) => {
      console.log("Pressed right");
      setMoving("right");
      if (currentStepRef.current === slides.length - 1) setShow(false);
      setCurrentStep((old) => Math.min(old + 1, slides.length - 1));
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      return false;
    },
    [setShow, slides]
  );
  const goTo = useCallback(
    (index: number) => {
      if (index > currentStep) {
        setMoving("right");
      } else {
        setMoving("left");
      }
      setCurrentStep(index);
    },
    [currentStep]
  );
  useEffect(() => {
    if (pressedRight) {
      console.log("pressed rigth");
      goRight();
    } else if (pressedLeft) {
      goLeft();
    }
  }, [goLeft, goRight, pressedLeft, pressedRight, pressedSpace]);
  useEffect(() => {
    console.log("Current slide index is ", currentStep);
    currentStepRef.current = currentStep;
  }, [currentStep, slides.length]);
  const rightButton = useRef<HTMLButtonElement | null>(null);
  // useEffect(() => {
  //   console.log("I switched focus to the rightbutton");
  // }, [rightButton]);
  // const closeButton = useRef<HTMLButtonElement | null>(null);
  // useEffect(() => {
  //   if (closeButton.current && rightButton.current) closeButton.current?.blur();
  //   rightButton.current?.focus();
  // }, [rightButton, closeButton]);
  useEffect(() => {
    if (show) setCurrentStep(0);
  }, [show]);
  return (
    <Transition show={show} as={Fragment}>
      <Dialog
        onClose={() => {
          console.log("I iz closing");
          // setShow(false);
        }}
        className="absolute z-50 "
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-1000"
          enterFrom="opacity-0"
          enterTo="opacity-100 "
          leave="ease-in duration-500"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div
            // onClick={() => {
            //   console.log("I iz closing 2");
            //   setShow(false);
            // }}
            className={
              "fixed inset-0 flex items-center justify-center bg-black bg-opacity-80"
            }
          >
            <Dialog.Panel className="flex-col relative justify-center flex max-h-screen w-screen 2xl:w-3/4 m-4 z-50 ">
              <div className="absolute top-1 right-20 z-50 bg-green-500 ">
                <div className="absolute p-4">
                  <button
                    onClick={() => {
                      console.log("I iz closing XXXXXXX");
                      setShow(false);
                    }}
                    // ref={closeButton}
                  >
                    <XCircleIcon className="h-12 w-12 text-gray-600 hover:text-gray-200 transition" />
                  </button>
                </div>
              </div>
              <div
                // onClick={goRight}
                style={{ height: targetHeight }}
                className="bg-black  bg-opacity-80 rounded-lg overflow-clip  border-gray-300 shadow-md dark:border-gray-600 border-opacity-40 border-2 relative w-full"
              >
                {slides.map((slide, index) => (
                  <Transition
                    appear={false}
                    unmount={false}
                    show={currentStep === index}
                    enter="transform transition ease-in-out duration-500"
                    enterFrom={moving === "right" ? `opacity-0` : `opacity-0`}
                    enterTo={` opacity-100`}
                    leave="transform transition ease-in-out duration-500 "
                    leaveFrom={`opacity-100`}
                    leaveTo={moving === "right" ? `opacity-0` : `opacity-0`}
                    className="bg-black overflow-visible absolute "
                    style={{ height: targetHeight }}
                    as="div"
                  >
                    {slide}
                  </Transition>
                ))}
              </div>
              <div className="flex flex-row justify-center">
                {slides.map((slide, buttonIndex) => (
                  <button
                    className={
                      currentStep === buttonIndex
                        ? currentSelectorClass
                        : selectorClass
                    }
                    onClick={() => goTo(buttonIndex)}
                  >
                    <div
                      className={
                        currentStep === buttonIndex
                          ? currentSelectorIconClass
                          : selectorIconClass
                      }
                    />
                  </button>
                ))}
              </div>
              <div className="flex flex-row justify-around">
                <button
                  className={slideClass}
                  // className="bg-black bg-opacity-80 text-white font-medium p-2 pr-4 text-md rounded-xl hover:scale transition group"
                  onClick={goLeft}
                >
                  <ChevronLeftIcon className="h-8 w-8 text-gray-400 group-hover:text-white transition inline" />
                  Back
                </button>
                <button
                  className={slideClass}
                  autoFocus
                  // className="bg-black bg-opacity-80 text-white font-medium p-2 pl-4 text-md rounded-xl hover:bg-orange-800 transition group"
                  onClick={goRight}
                  ref={rightButton}
                >
                  Next
                  <ChevronRightIcon className="h-8 w-8 text-gray-400 group-hover:text-white transition inline" />
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
};
export default ModalSlides;
