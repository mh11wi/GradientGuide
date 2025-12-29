import { useContext } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import round from 'assets/round.png';
import square from 'assets/square.png';
import almond from 'assets/almond.png';
import squoval from 'assets/squoval.png';


const models = [
  { label: 'Round', value: 'round', src: round }, 
  { label: 'Square', value: 'square', src: square }, 
  { label: 'Almond', value: 'almond', src: almond }, 
  { label: 'Squoval', value: 'squoval', src: squoval }, 
];

const StepModel = (props) => {
  const { orientation, model, setModel } = useContext(ToolContext);
  
  const onChange = (event, value) => {
    setModel(value);
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
          name="model"
          defaultValue={model} 
          onChange={onChange}
          row={orientation == 'portrait'}
        >
          {models.map(model => (
            <FormControlLabel 
              key={model.value} 
              value={model.value} 
              control={<Radio />} 
              label={model.label} 
            />
          ))}
        </RadioGroup>
      </FormControl>
      <Box sx={{ 
        maxWidth: orientation == 'landscape' ? '60vmin' : 'none', 
        maxHeight: orientation == 'landscape' ? 'none' : '55vmax',
        flexGrow: 1, 
        aspectRatio: '1/1'
      }}>
        <img alt={model} src={models.find(x => x.value == model).src} style={{ width: '100%' }} />
      </Box>
    </Box>
  );
};

export default StepModel;
