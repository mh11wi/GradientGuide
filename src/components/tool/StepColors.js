import { useContext } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box } from '@mui/material';
import ColorPicker  from 'components/tool/ColorPicker';


const StepColors = (props) => {
  const { orientation, colors, setColors } = useContext(ToolContext);
  const numColors = colors.filter(color => color != null).length;
  const maxRows = Math.ceil(colors.length / 2);
  
  let numColumns = 1;
  if (orientation == 'landscape' && numColors > (maxRows - 1)) {
    numColumns = 2;
  }
  
  const changeColor = (index, value) => {
    const array = [...colors];
    array[index] = value;
    setColors(array);
  }
  
  return (
    <Box sx={{
      display: 'grid',
      gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
      gridGap: '1rem',
      textAlign: 'center',
      pl: 4,
      width: '100%'
    }}>
      {colors.map((color, index) => (
        <ColorPicker 
          key={index} 
          index={index} 
          color={color} 
          changeColor={changeColor} 
          hidden={index > numColors} 
          removable={index > 0 && index == numColors - 1}
          column={(numColumns == 1 || index < maxRows) ? 1 : 2}
          row={numColumns == 1 ? (index + 1) : (index % maxRows + 1)}
        />
      ))}
    </Box>
  );
};

export default StepColors;
