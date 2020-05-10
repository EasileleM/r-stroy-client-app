import { useState, useLayoutEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { mobileScreenSize, tabletScreenSize } from '../contants/const';

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: mobileScreenSize,
  });

  const isTablet = useMediaQuery({
    minWidth: mobileScreenSize,
    maxWidth: tabletScreenSize,
  });

  const isDesktop = useMediaQuery({
    minWidth: tabletScreenSize,
  });

  useLayoutEffect(() => {
    if (typeof window !== 'undefined') setIsClient(true);
  }, []);

  return {
    isDesktop: isClient ? isDesktop : true,
    isTablet: isClient ? isTablet : false,
    isMobile: isClient ? isMobile : false,
  };
}

export default useResponsive;