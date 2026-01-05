import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  AppBar, 
  IconButton, 
  Link, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { Info, Home } from '@mui/icons-material';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';


const MenuBar = (props) => {
  const theme = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  
  const handleClickHelp = () => {
    setHelpOpen(true);
  }
  
  const handleCloseHelp = () => {
    setHelpOpen(false);
  }
  
  return (
    <AppBar position="relative" sx={{ background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})` }}>
      <Toolbar variant="dense">
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Gradient Guide
        </Typography>

        <IconButton aria-label="Help" onClick={handleClickHelp} color="inherit">
          <Info />
        </IconButton>
        <HelpDialog
          open={helpOpen}
          onClose={handleCloseHelp}
        />
		
        <Link href="https://mh11wi.github.io" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <IconButton aria-label="Home" color="inherit">
            <Home />
          </IconButton>
        </Link>
      </Toolbar>
    </AppBar>
  );
};

export default MenuBar;