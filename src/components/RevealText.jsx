import LinkRouter from "./LinkRouter";

const RevealText = ({ to, text, delayPerLetter = 30 }) => {
  const letters = text.split("");

  return (
    <LinkRouter to={to}
      className="relative inline-block group overflow-hidden cursor-pointer"
    >
      <div className="block">
        {letters.map((letter, index) => (
          <span
            key={`top-${index}`}
            style={{ transitionDelay: `${index * delayPerLetter}ms` }}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.024,1)] translate-y-0 group-hover:translate-y-[-100%]"
          >
            {letter === " " ? "\xa0" : letter}
          </span>
        ))}
      </div>
      <div className="block text-amber">
        {letters.map((letter, index) => (
          <span
            key={`bottom-${index}`}
            style={{ transitionDelay: `${index * delayPerLetter}ms` }}
            className="inline-block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.024,1)] translate-y-[100%] group-hover:translate-y-[-100%]"
          >
            {letter === " " ? "\xa0" : letter}
          </span>
        ))}
      </div>
    </LinkRouter>
  );
};

export default RevealText;

