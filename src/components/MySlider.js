import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Input from '@material-ui/core/Input';

// set slider style 
const useStyles = makeStyles({
    root: {
        width: 250,
    },
    input: {
        width: 42,
    },
});

const InputSlider = (props) => {

    // double check prop attributes
    const classes = useStyles();
    const title = (typeof props.title !== 'undefined') ? props.title : 'No Name'
    const range = (typeof props.range !== 'undefined') ? props.range : [0, 100]
    const startVal = (typeof props.startValue !== 'undefined') ? props.startValue : 50
    const step = (typeof props.step !== 'undefined') ? props.step : 5

    // state
    const [value, setValue] = React.useState(startVal);

    // sets val after change
    const handleSliderChange = (event, newValue) => {
        setValue(newValue);

        // pass change back to parent
        props.sliderValue(newValue);
    };

    // sets value on screen after change
    const handleInputChange = (event) => {
        let val = Number(event.target.value)
        
        // make sure value isnt over range limit
        if (val > range[1]) {
            setValue(range[1])
            val = range[1]
        }
        else {
            val = (event.target.value === '') ? '' : val;
            setValue(val);
        }

        // pass change back to parent
        props.sliderValue(val);
    };

    // handles the blur when clicked
    const handleBlur = () => {
        if (value < 0) {
            setValue(0);
        } else if (value > 100) {
            setValue(100);
        }
    };

    // render components
    return (
        <div className={classes.root}>

            {/* holds slider */}
            <Grid container spacing={2} alignItems="center">
                
                {/* text before slider */}
                <Typography 
                    id="input-slider" 
                    gutterBottom 
                    style={{width: 'auto', textAlign: 'right'}}
                >
                    {title}
                </Typography>
                
                {/* slider */}
                <Grid item xs>
                    <Slider
                        value={typeof value === 'number' ? value : 0}
                        onChange={handleSliderChange}
                        aria-labelledby="input-slider"
                        min={range[0]}
                        max={range[1]}
                    />
                </Grid>
                
                {/* input field */}
                <Grid item>
                    <Input
                        className={classes.input}
                        value={value}
                        margin="dense"
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        inputProps={{
                            step: step,
                            min: range[0],
                            max: range[1],
                            type: 'number',
                            'aria-labelledby': 'input-slider',
                        }}
                        maxLength={4}
                        style={{width: '60px'}}
                    />
                </Grid>
            </Grid>
        </div>
    );
}

export default InputSlider;