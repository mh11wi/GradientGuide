import { useContext, useState } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box } from '@mui/material';


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
  
  const calculateGradient = () => {
    const allColors = colors.filter(color => color != null).reverse();
    let gradient = type == 'radial' ? 'radial-gradient(' : 'linear-gradient(';
    gradient += types.find(x => x.value == type).gradient;
    
    allColors.forEach((color) => {
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
      gap: 4,
      width: '100%',
    }}>
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
            width: '34%', 
            height: '64%', 
            top: '1px', 
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
