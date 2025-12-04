import { useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { 
  AppBar, 
  IconButton, 
  Link, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { 
  Info,
  Home,
  Share 
} from '@mui/icons-material';
import HelpDialog from 'components/menu/dialogs/help/HelpDialog';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import { isMobile } from 'helpers/app';


const MenuBar = (props) => {
  const theme = useTheme();
  const [helpOpen, setHelpOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  
  const shareData = {
    title: "Gradient Guide",
    text: "Check out this gradient tool for manicures:",
    url: "https://mh11wi.github.io/GradientGuide"
  };
  
  const handleClickHelp = () => {
    setHelpOpen(true);
  }
  
  const handleCloseHelp = () => {
    setHelpOpen(false);
  }
  
  const handleClickShare = async () => {
    if (!isMobile()) {
      setShareOpen(true);
    } else {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== "AbortError") {
          setShareOpen(true);
        }
      }
    }
  }
  
  const handleCloseShare = () => {
    setShareOpen(false);
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

        <IconButton aria-label="Share" onClick={handleClickShare} color="inherit">
          <Share />
        </IconButton>
        <ShareDialog
          open={shareOpen}
          onClose={handleCloseShare}
          data={shareData}
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