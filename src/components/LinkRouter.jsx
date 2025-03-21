import { Link } from 'react-router-dom';

const LinkRouter = ({ to, children, className, onClick }) => { 
  const handleRouteAndClick = (e) => {
    window.scrollTo(0, 0);
    if (onClick) { 
      onClick(e);
    }
  };

  return (
    <Link 
      to={to} 
      className={className} 
      onClick={handleRouteAndClick}
    >
      {children}
    </Link>
  );
};

export default LinkRouter;