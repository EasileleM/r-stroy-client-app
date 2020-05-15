import { useState, useLayoutEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import { MOBILE_SCREEN_SIZE, TABLET_SCREEN_SIZE } from '../contants/const';

function useResponsive() {
  const [isClient, setIsClient] = useState(false);

  const isMobile = useMediaQuery({
    maxWidth: MOBILE_SCREEN_SIZE,
  });

  const isTablet = useMediaQuery({
    minWidth: MOBILE_SCREEN_SIZE,
    maxWidth: TABLET_SCREEN_SIZE,
  });

  const isDesktop = useMediaQuery({
    minWidth: TABLET_SCREEN_SIZE,
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