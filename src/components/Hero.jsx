import { motion } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { styles } from '../styles';
import { charles, bwmap, worldmap } from '../assets';

const Hero = () => {
  return (
    <>
      {/* Background Images */}
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img
          src={bwmap}
          alt="world map"
          className="w-full h-full sm:block hidden object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 z-0 h-[100vh] w-screen">
        <img
          src={worldmap}
          alt="world map"
          className="w-full h-full sm:hidden block object-cover"
        />
      </div>

      {/* Hero Section */}
      <section
        className="relative flex sm:flex-row flex-col w-full h-screen mx-auto sm:bg-hero bg-hero-mobile overflow-hidden">
        <div
          className={"absolute inset-0 sm:top-[250px] top-[250px] lg:top-[250px] xl:top-[250px] sm:px-16 px-6 max-w-7xl mx-auto flex flex-col items-start justify-start gap-3"}>
          
          {/* Hero Text */}
          <div>
            <h1
              className={`${styles.heroHeadText} text-eerieBlack font-poppins`}>
                Hello, I'm
            </h1>
          </div>
        

          {/* Typing Animation */}
          <TypeAnimation
            className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-eerieBlack mb-4"
            sequence={[
              "Charles Vanzetta",
              2000, // Pause
              "a Software Developer",
              2000,
              "Exploring AI and technology",
              2000,
              "Ready for Co-op Opportunities",
              2000,
            ]}
            speed={50}
            deletionSpeed={30}
            wrapper="span"
            repeat={Infinity}
          />

</div>

        {/* Scroll Down Indicator */}
        <div
          className="absolute xs:bottom-10 bottom-32 w-full flex justify-center items-center">
          <a href="#about">
            <div
              className="w-[35px] h-[64px] rounded-3xl border-4 border-french border-dim flex justify-center items-start p-2">
              <motion.div
                animate={{
                  y: [0, 24, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  repeatType: 'loop',
                }}
                className="w-3 h-3 rounded-full bg-taupe mb-1"
              />
            </div>
          </a>
        </div>

        {/* Personal Image */}
        <div>
          <img
            className="absolute bottom-0 ml-[50vw] lg:ml-[62vw] md:ml-[50vw] xmd:ml-[50vw] 2xl:ml-[68vw] sm:h-[90vh] md:h-[70vh] xl:h-[80vh]"
            src={charles}
            alt="charles"
          />
        </div>
      </section>
    </>
  );
};

export default Hero;
