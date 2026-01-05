import { useContext, useState } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, Button } from '@mui/material';
import { Share } from '@mui/icons-material';
import ShareDialog from 'components/menu/dialogs/share/ShareDialog';
import { isMobile } from 'helpers/app';


const images = import.meta.glob('/src/assets/*.png', {
  eager: true,
  import: 'default'
});

const types = [
  { value: 'vertical', gradient: '0deg' }, 
  { value: 'horizontal', gradient: '90deg' }, 
  { value: 'diagonal', gradient: '45deg' }, 
  { value: 'radial', gradient: 'circle' }, 
];

const StepFinish = (props) => {
  const { orientation, model, colors, type } = useContext(ToolContext);
  const [loaded, setLoaded] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const allColors = colors.filter(color => color != null);
  const query = `?model=${model}&colors=${allColors.map(c => c.replace('#', '')).join(',')}&type=${type}`;
  
  const shareData = {
    title: "Gradient Guide",
    text: "Check out this gradient manicure:",
    url: "https://mh11wi.github.io/GradientGuide" + query
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
  
  const calculateGradient = () => {
    let gradient = type == 'radial' ? 'radial-gradient(' : 'linear-gradient(';
    gradient += types.find(x => x.value == type).gradient;
    
    allColors.reverse().forEach((color) => {
      gradient += ',' + color;
    });
    
    gradient += ')';
    return gradient;
  }
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: orientation == 'landscape' ? 'row' : 'column', 
      justifyContent: orientation == 'landscape' ? 'center' : 'start', 
      alignItems: 'center',
      width: '100%',
      gap: orientation == 'landscape' ? 1 : 4,
      ml: (model != 'me' && orientation == 'landscape')? 5 : 0
    }}>
      { model != 'me' &&
        <Button 
          onClick={handleClickShare} 
          startIcon={<Share />}
          size='large'
          sx={{ flexShrink: 0, visibility: loaded ? 'visible' : 'hidden' }}
        >
          Share
        </Button>
      }
      <ShareDialog
        open={shareOpen}
        onClose={handleCloseShare}
        data={shareData}
      />
      <Box sx={{ 
        maxWidth: orientation == 'landscape' ? '60vmin' : 'none', 
        maxHeight: orientation == 'landscape' ? 'none' : '55vmax',
        flexGrow: 1, 
        aspectRatio: '1/1', 
        position: 'relative',
      }}>
        {loaded &&
          <Box sx={{ 
            position: 'absolute', 
            width: '33.5%', 
            height: '61%', 
            top: '3%', 
            left: '50%', 
            transform: 'translateX(-50%)', 
            background: calculateGradient()
          }} />
        }
        <img 
          alt={model} 
          src={images[Object.keys(images).find(x => x.includes(model))]} 
          onLoad={() => setLoaded(true)}
          style={{ position: 'relative', width: '100%' }} 
        />
      </Box>
    </Box>
  );
};

export default StepFinish;
