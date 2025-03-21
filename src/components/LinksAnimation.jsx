import RevealText from "./RevealText";

const LinksAnimation = ({ open, text, delay, onClick, link }) => {
  return (
    <li className="text-6xl h-16 md:text-8xl md:h-24 lg:text-9xl lg:h-32 overflow-hidden relative">
      <span
        
        onClick={onClick}
        style={{ transitionDelay: `${delay}ms` }}
        className={`w-max cursor-pointer absolute transition-all ease-[cubic-bezier(0.76,0,0.24,1)] duration-[900ms] ${
          open ? "translate-y-0" : "translate-y-[130px]"
        }`}
      >
        <RevealText text={text} to={link} delayPerLetter={30} />
      </span>
    </li>
  );
};

export default LinksAnimation;

