import React, { useState } from 'react'
import { Button, Dropdown, DropdownButton } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

// local 
import MySlider from './MySlider'

// renders the options menu
const Options = (props) => {
    
    // check passed prop
    const currentMethodText = (typeof props.currentMethodText !== 'undefined') ? props.currentMethodText : 'Empty Name'

    // handles click for sorting method selection
    const handleMethodClick = (childData) => {
        props.methodCallback(childData)
    }

    // handles click for sort execute/stop button
    const handleExecuteClick = (childData) => {
        (childData === true) ? props.executeCallback(true) : props.executeCallback(false)
    }

    // handles change for array size slider
    const handleSizeSliderChange = (childData) => {
        props.sizeChangeCallback(childData)
    }

    // handles change for array speed slider
    const handleSpeedSliderChange = (childData) => {
        props.speedChangeCallback(childData)
    }

    // handles click for randomize button
    const handleRandomizeClick = (childData) => {
        props.randomizeChangeCallback(childData)
    }

    return (
        <div id='options'>
            <div id='sliderDiv'>
                {/* slider for array size */}
                <MySlider
                    title={"Size (col #)"}
                    startValue={100}
                    range={[10, 250]}
                    step={5}
                    sliderValue={handleSizeSliderChange}
                />

                {/* slider for iteration speed */}
                <MySlider
                    title={'Speed (ms)'}
                    startValue={10}
                    range={[0.1, 100]}
                    step={0.1}
                    sliderValue={handleSpeedSliderChange}
                />
            </div>

            <div id='buttonDiv'>
                {/* sort method dropdown */}
                <DropdownButton id="dropdown-basic-button" title={currentMethodText}>
                    <Dropdown.Item onClick={() => handleMethodClick(0)} >Insertion Sort</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMethodClick(1)} >Selection Sort</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMethodClick(2)} >Bubble Sort</Dropdown.Item>
                    <Dropdown.Item onClick={() => handleMethodClick(3)} >Shell Sort</Dropdown.Item>
                </DropdownButton>

                {/* randomize array */}
                <Button variant="primary" onClick={() => handleRandomizeClick(true)} style={{width: '100px'}}>Randomize</Button>

                {/* execute button */}
                <Button variant="primary" onClick={() => handleExecuteClick(true)} style={{width: '100px'}}>Execute</Button>
                <div id="stopButton" style={{display: 'none'}}><Button variant="danger" onClick={() => handleExecuteClick(false)} style={{width: '100px'}}>Stop</Button></div>
            </div>
        </div>
    )
}

export default Options;
