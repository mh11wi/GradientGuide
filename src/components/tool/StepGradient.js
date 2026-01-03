import { useContext, useEffect, useState } from 'react';
import { ToolContext } from 'components/tool/Tool';
import { Box, FormControl, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import sponge from 'assets/sponge.jpg';


const types = [
  { label: 'Vertical', value: 'vertical' }, 
  { label: 'Horizontal', value: 'horizontal' }, 
  { label: 'Diagonal', value: 'diagonal' }, 
  { label: 'Radial', value: 'radial' }, 
];

const StepGradient = (props) => {
  const { orientation, colors, type, setType } = useContext(ToolContext);
  const [loaded, setLoaded] = useState(false);
  const allColors = colors.filter(color => color != null);
  
  let donuts = [];
  if (type == 'radial') {
    for (let i = 0; i < allColors.length; i++) {
      const S_i = (i / allColors.length) * 100;
      const S_next = ((i + 1) / allColors.length) * 100;

      const inner = S_i;
      const outer = S_i + 2 * (S_next - S_i);

      donuts.push({ inner, outer });
    }
    
    const outerMax = Math.max(...donuts.map(d => d.outer));
    const scale = 200 / 3 / outerMax;
    donuts = donuts.map(d => ({ inner: d.inner * scale, outer: d.outer * scale})).reverse();
  }
  
  const getStyle = (color, index) => {
    let style;
    
    switch (type) {
      case 'vertical':
        style = {
          top: `${index * 100 / (allColors.length + 1)}%`,
          width: '100%',
          height: `${200 / (allColors.length + 1)}%`
        }
        break;
      case 'horizontal':
        style = {
          left: `${index * 100 / (allColors.length + 1)}%`,
          height: '100%',
          width: `${200 / (allColors.length + 1)}%`
        }
        break;
      case 'diagonal':
        const w = 100;
        const h = 200 / (allColors.length + 1);
        const l = w / 34 * 64;
        const d = Math.sqrt(w*w + l*l);
        style = {
          top: `${50 - (h / 2)}%`, 
          width: `${w}%`,
          height: `${h}%`,
          transform: `
            rotate(45deg) 
            scale(${2 * d / w / (allColors.length + 1)}, ${allColors.length + 1}) 
            translateX(-${25 * (allColors.length - 1)}%) 
            translateX(${50 * index}%)
          `
        }
        break;
      case 'radial':
        style = {
          width: '100%',
          height: 'auto',
          aspectRatio: '1 / 1', 
          inset: 0,
          margin: 'auto',
          transform: `scale(${2.25})`,
          mask: `
            radial-gradient(
              circle,
              transparent ${donuts[index].inner}%,
              black ${donuts[index].inner}%,
              black ${donuts[index].outer}%,
              transparent ${donuts[index].outer}%
            )
          `
        }
        break;
    }
    
    return { 
      ...style, 
      backgroundColor: color, 
      position: 'absolute',
      opacity: 0,
      animation: `fadeIn 50ms linear forwards`,
      animationDelay: `${(index + 1) * 750}ms`,
      animationFillMode: 'both',
      '@keyframes fadeIn': {
        from: { opacity: 0 },
        to: { opacity: 1 },
      }
    }
  }
  
  useEffect(() => {
    const img = new Image();
    img.src = sponge;
    img.onload = () => setLoaded(true);
  }, []);

  
  const onChange = (event, value) => {
    setType(value);
  }
  
  return (
    <Box sx={{ 
      display: 'flex', 
      flexDirection: orientation == 'landscape' ? 'row' : 'column', 
      justifyContent: orientation == 'landscape' ? 'center' : 'start', 
      alignItems: 'center',
      width: '100%',
      gap: orientation == 'landscape' ? 1 : 4,
      ml: orientation == 'landscape' ? 5 : 0
    }}>
      <FormControl sx={{ flexShrink: 0 }}>
        <RadioGroup
          name="type"
          value={type} 
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
      {loaded &&
        <Box key={type} sx={{ 
          position: 'relative',
          width: '100%',
          maxWidth: orientation == 'landscape' ? '30vmin' : '30vmax', 
          flexGrow: 1,
          aspectRatio: '34 / 64',
          backgroundImage: `url(${sponge})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          boxShadow: 3,
          overflow: 'hidden',
          mx: {
            xs: orientation == 'landscape' ? 6 : 0,
            md: orientation == 'landscape' ? 8 : 0,
            lg: orientation == 'landscape' ? 10 : 0
          }
        }}>
          {allColors.map((color, index) => (
            <Box key={index} sx={getStyle(color, index)} />
          ))}
        </Box>
      }
    </Box>
  );
};

export default StepGradient;
