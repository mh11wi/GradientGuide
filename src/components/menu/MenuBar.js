import { useState } from 'react';
import { 
  AppBar, 
  IconButton, 
  Link, 
  Toolbar, 
  Typography 
} from '@mui/material';
import { 
  Home,
  Share 
} from '@mui/icons-material';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import { isMobile } from 'helpers/app';


const MenuBar = (props) => {
  const [shareOpen, setShareOpen] = useState(false);
  
  const shareData = {
    title: "Gradient Guide",
    text: "Check out this gradient tool for manicures:",
    url: "https://mh11wi.github.io/GradientGuide"
  };
  
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
    <AppBar position="relative">
      <Toolbar variant="dense">
        <Typography variant="h5" component="h1" sx={{ fontWeight: 500, flexGrow: 1 }}>
          Gradient Guide
        </Typography>

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