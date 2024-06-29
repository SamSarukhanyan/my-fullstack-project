import { useSpring } from 'react-spring';

const useAnimatedVisibility = (isVisible) => {
  const styles = useSpring({
    opacity: isVisible ? 1 : 0,
    transform: isVisible ? 'translateY(0)' : 'translateY(-10px)',
  });

  return styles;
};

export default useAnimatedVisibility;
