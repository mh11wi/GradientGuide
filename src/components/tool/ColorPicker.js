import { MuiColorInput } from 'mui-color-input';
import { Box, Button, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';


const ColorPicker = (props) => {
  const handleClick = (event) => {
    event.target.parentElement.querySelector('button').click();
  }
  
  const handleChange = (value) => {
    props.changeColor(props.index, value);
  }
  
  let content;
  if (props.color) {
    content = (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItmes: 'center' }}>
        <MuiColorInput 
          format="hex" 
          isAlphaHidden="true" 
          value={props.color} 
          onClick={handleClick} 
          onChange={handleChange}
          label={'Polish ' + (props.index + 1)}
          slotProps={{ input: { readOnly: true } }}
        />
        <IconButton 
          aria-label="Remove Polish" 
          color="primary" 
          onClick={() => handleChange(null)} 
          sx={{ visibility: props.removable ? 'visible' : 'hidden' }}
        >
          <CloseIcon />
        </IconButton>
      </Box>
    );
  } else {
    content = (
      <Button 
        variant="text"
        onClick={() => handleChange('#ffffff')}
        sx={{ mr: '50px' }}
      >
        + Add Polish
      </Button>
    );
  }
  
  return (
    <Box sx={{ 
      display: props.hidden ? 'none': 'block', 
      gridColumn: props.column,
      gridRow: props.row,
      "& .MuiInputBase-root, input": { cursor: 'pointer' } 
    }}>
      {content}
    </Box>
  );
};

export default ColorPicker;
