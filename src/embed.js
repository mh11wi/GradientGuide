import ReactDOM from 'react-dom/client';
import 'src/embed.css';
import Tool from 'components/tool/Tool';
import { ThemeProvider, createTheme } from '@mui/material/styles';


const theme = createTheme({
  palette: {
    primary: {
      main: '#f06292'
    }
  }
});

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ThemeProvider theme={theme}>
    <Tool skipModel />
  </ThemeProvider>
);
