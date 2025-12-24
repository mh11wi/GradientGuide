import { useContext } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';


const types = [
  { label: 'Vertical', value: 'vertical', gradient: '0deg' }, 
  { label: 'Horizontal', value: 'horizontal', gradient: '-90deg' }, 
  { label: 'Diagonal', value: 'diagonal', gradient: '225deg' }, 
  { label: 'Radial', value: 'radial', gradient: 'circle' }, 
];

const StepGradient = (props) => {
  const { orientation, model, colors, type, setType } = useContext(ToolContext);
  
  const onChange = (event, value) => {
    setType(value);
  }
  
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
      <FormControl sx={{ flexShrink: 0 }}>
        <RadioGroup
          name="type"
          defaultValue={type} 
          onChange={onChange}
          row={orientation == 'portrait'}
        >
          {types.map(type => (
            <FormControlLabel 
              key={type.value} 
              value={type.value} 
              control={<Radio />} 
              label={type.label} 
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ 
        maxWidth: orientation == 'landscape' ? '60vmin' : 'none', 
        maxHeight: orientation == 'landscape' ? 'none' : '55vmax',
        flexGrow: 1, 
        aspectRatio: '1/1', 
        position: 'relative',
      }}>
        <Box sx={{ 
          position: 'absolute', 
          width: '34%', 
          height: '62%', 
          top: '1px', 
          left: '50%', 
          transform: 'translateX(-50%)', 
          background: calculateGradient()
        }} />
        <img alt={model} src={model + '.png'} style={{ position: 'relative', width: '100%' }} />
      </Box>
    </Box>
  );
};

export default StepGradient;
