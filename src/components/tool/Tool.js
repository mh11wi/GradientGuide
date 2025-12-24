import { createContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Stepper, Step, StepLabel, Button, Box } from '@mui/material';
import StepModel from 'components/tool/StepModel';
import StepColors from 'components/tool/StepColors';
import StepGradient from 'components/tool/StepGradient';
import useWindowOrientation from 'hooks/useWindowOrientation';


export const ToolContext = createContext();

const Tool = (props) => {
  const theme = useTheme();
  const { orientation } = useWindowOrientation();
  const [activeStep, setActiveStep] = useState(0);
  const [model, setModel] = useState('round');
  const [colors, setColors] = useState(['#ffffff', '#000000', null, null, null, null, null, null]);
  const [type, setType] = useState('vertical');
  const steps = [
    { label: 'Select polish colors', content: <StepColors /> },
    { label: 'Select gradient type', content: <StepGradient /> },
  ];

  if (!props.skipModel) {
    steps.unshift({ label: 'Select nail shape', content: <StepModel /> });
  }
  
  useEffect(() => {
    if (props.skipModel) {
      setModel('me');
    }
  }, [props.skipModel]);
  
  const renderStepContent = (index) => {
    return steps[index].content;
  };
  
  const handleNext = () => {
    setActiveStep((step) => step + 1);
  };

  const handleBack = () => {
    setActiveStep((step) => step - 1);
  };
  
  return (
    <ToolContext.Provider
      value={{
        orientation, 
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
        <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', height: '100%' }}>
          {renderStepContent(activeStep)}
        </Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Button disabled={activeStep === 0} onClick={handleBack}>
            Back
          </Button>
          <Button disabled={activeStep === steps.length - 1} onClick={handleNext}>
            Next
          </Button>
        </Box>
      </Box>
    </ToolContext.Provider>
  );
};

export default Tool;
