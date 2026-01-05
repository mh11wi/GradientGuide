import { createContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import { KeyboardArrowLeft, KeyboardArrowRight, Replay } from '@mui/icons-material';
import StepSource from 'components/tool/StepSource';
import StepModel from 'components/tool/StepModel';
import StepColors from 'components/tool/StepColors';
import StepGradient from 'components/tool/StepGradient';
import StepFinish from 'components/tool/StepFinish';
import useWindowOrientation from 'hooks/useWindowOrientation';


export const ToolContext = createContext();

const defaults = {
  model: 'round',
  colors: ['#ffffff', '#000000', null, null, null, null, null, null],
  type: 'vertical'
}

const Tool = (props) => {
  const theme = useTheme();
  const { orientation } = useWindowOrientation();
  const [activeStep, setActiveStep] = useState(0);
  const [source, setSource] = useState([]);
  const [model, setModel] = useState(defaults.model);
  const [colors, setColors] = useState(defaults.colors);
  const [type, setType] = useState(defaults.type);
  const steps = [
    { label: 'Select polish colours', content: <StepColors /> },
    { label: 'Select gradient type', content: <StepGradient /> },
  ];

  if (!props.skipModel) {
    steps.unshift({ label: 'Select nail shape', content: <StepModel /> });
  }
  
  if (props.sourceData) {
    steps.unshift({ label: 'Select colour source', content: <StepSource data={props.sourceData} /> });
  }
  
  useEffect(() => {
    if (props.skipModel) {
      setModel('me');
    }
  }, [props.skipModel]);
  
  useEffect(() => {
    if (props.sourceData) {
      setSource(props.sourceData);
    }
  }, [props.sourceData]);
  
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    let skipToLastStep = true;
   
    if (['round', 'square', 'almond', 'squoval'].includes(params.get('model'))) {
      setModel(params.get('model'));
    } else {
      skipToLastStep = false;
    }
    
    if (['vertical', 'horizontal', 'diagonal', 'radial'].includes(params.get('type'))) {
      setType(params.get('type'));
    } else {
      skipToLastStep = false;
    }
    
    const hex = params.get('colors')?.split(',');
    if (hex && hex.length <= defaults.colors.length) {
      const arr = defaults.colors.map(c => null);
      let allValid = true;
      
      hex.forEach((value, index) => {
        if (/^[A-Fa-f0-9]{6}$/.test(value)) {
          arr[index] = '#' + value.toLowerCase();
        } else {
          allValid = false;
        }
      });
      
      if (allValid) {
        setColors(arr);
      } else {
        skipToLastStep = false;
      }
    } else {
      skipToLastStep = false;
    }
    
    if (skipToLastStep) {
      setActiveStep(steps.length);
    }
  }, []);
  
  const renderStepContent = (index) => {
    if (activeStep == steps.length) {
      return <StepFinish />;
    } else {
      return steps[index].content;
    }
  };
  
  const handleNext = () => {
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };
  
  const startOver = () => {
    if (!props.skipModel) {
      setModel(defaults.model);
    }
    setColors(defaults.colors);
    setType(defaults.type);
    setActiveStep(0);
  };
  
  return (
    <ToolContext.Provider
      value={{
        orientation,
        source,
        setSource,
        model,
        setModel,
        colors,
        setColors,
        type,
        setType
      }}
    >
      <Box component="main" sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: 2, 
        p: 2, 
        height: `calc(100% - ${theme.spacing(4)})`,
        overflowY: 'auto'
      }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((step) => (
            <Step key={step.label}>
              <StepLabel>{step.label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          width: '100%', 
          height: '100%' 
        }}>
          {renderStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button 
            disabled={activeStep === 0} 
            onClick={handleBack} 
            startIcon={<KeyboardArrowLeft />}
          >
            Back
          </Button>
          {activeStep === steps.length ? (
            <Button onClick={startOver} endIcon={<Replay />}>
              Restart
            </Button>
          ) : (
            <Button onClick={handleNext} endIcon={<KeyboardArrowRight />}>
              Next
            </Button>
          )}
        </Box>
      </Box>
    </ToolContext.Provider>
  );
};

export default Tool;
