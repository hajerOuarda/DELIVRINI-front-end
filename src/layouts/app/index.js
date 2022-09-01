import { useState } from 'react';
import { Outlet } from 'react-router-dom';
// @mui
import { Box } from '@mui/material';
// hooks
import useResponsive from '../../hooks/useResponsive';
// config
import { HEADER } from '../../config';
//
import AppHeader from './header';
import NavbarVertical from './navbar/NavbarVertical';
import NavbarHorizontal from './navbar/NavbarHorizontal';
// ----------------------------------------------------------------------

export default function AppLayout() {
  const isDesktop = useResponsive('up', 'lg');

  const [open, setOpen] = useState(false);

  return (
    <>
      <AppHeader onOpenSidebar={() => setOpen(true)} verticalLayout={true} />

      {isDesktop ? (
        <NavbarHorizontal />
      ) : (
        <NavbarVertical isOpenSidebar={open} onCloseSidebar={() => setOpen(false)} />
      )}

      <Box
        component="main"
        sx={{
          px: { lg: 2 },
          pt: {
            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 80}px`,
          },
          pb: {
            xs: `${HEADER.MOBILE_HEIGHT + 24}px`,
            lg: `${HEADER.DASHBOARD_DESKTOP_HEIGHT + 24}px`,
          },
        }}
      >
        <Outlet />
      </Box>
    </>
  );

}
