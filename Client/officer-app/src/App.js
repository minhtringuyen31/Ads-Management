import { useSelector } from 'react-redux';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';

// routing
import Routes from './routes';

// defaultTheme
import themes from './themes';

// project imports
import ReportProvider from 'store/report/ReportProvider';
import NavigationScroll from './layout/NavigationScroll';

// ==============================|| APP ||============================== //
//Merge branch

const App = () => {
  const customization = useSelector((state) => state.customization);

  return (
    <ReportProvider>
      <StyledEngineProvider injectFirst>
        <ThemeProvider theme={themes(customization)}>
          <CssBaseline />
          <NavigationScroll>
            <Routes />
          </NavigationScroll>
        </ThemeProvider>
      </StyledEngineProvider>
    </ReportProvider>
  );
};

export default App;