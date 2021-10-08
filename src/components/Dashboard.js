import React, { Component } from 'react';
import ReactDOM from 'react-dom'

// local imports
import Options from './Options';
import MyChart from './MyChart';
import { SortRounded } from '@material-ui/icons';

class Dashboard extends Component {

    // constructor
    constructor(props) {
        super(props);
        this.state = {
            method: 0,
            methodText: 'Insertion Sort',
            arrSize: '',
            iterationSpeed: 10,
            arrData: this.setArray(100),
            chartData: '',
            executing: false
        }
    }

    // sets chart data after first render
    componentDidMount = () => {
        this.setState({
            chartData: this.convertToDoubleMatrix(this.state.arrData)
        })
    }

    // sets the array, dependending on size var
    setArray = (size) => {
        this.setState({ arrSize: size })
        return Array.from({ length: size }, () => Math.ceil(Math.random() * 50));
    }

    // handles executing the sort
    handleExecute = (data) => {
        let arr = this.state.arrData;

        // check if array is sorted, if it is notify user
        let sorted = this.isSorted(arr);
        if (sorted === true) {
            alert("Array is already sorted, click randomize to start a new one.")
            return;
        }

        // check if sort isn't active
        if (this.state.executing === false) {

            // call correct sorting method
            switch (this.state.method) {
                case 0:
                    this.insertionSort(arr);
                    break;
                case 1:
                    this.selectionSort(arr);
                    break;
                case 2:
                    this.bubbleSort(arr);
                    break;
                case 3:
                    this.shellSort(arr);
                    break;
                default:
                    this.insertionSort(arr);
            }
            // set state and UI
            this.sortExecutionUpdate(true);
        }
        // stop button was clicked
        else if (data === false) {
            this.setState({
                executing: false
            }, function () {
                window.location.reload();
            });
        }
        // sort is already running
        else {
            alert("ERROR: You can't run a sort while another sort is in process.");
        }
    }

    // converts single array into double for display onto chart
    convertToDoubleMatrix = (arr) => {
        // create single array of correct length
        let doubleArr = new Array(arr.length);

        // turn single array into double array by making each element an array of [value, index] for chart display
        for (let i = 0; i < doubleArr.length; i++) {
            doubleArr[i] = [i, arr[i]]
        }

        return doubleArr;
    }

    // determine if array is sorted or not
    isSorted = (arr) => {
        let sorted = true;
        
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > arr[i + 1]) {
                sorted = false;
                break;
            }
        }

        return sorted;
    }

    // sets the sort method for the current visualizer
    handleMethodSwitch = (childData) => {
        var methodText = '';

        // set title for sorting method
        switch (childData) {
            case 0:
                methodText = 'Insertion Sort';
                break;
            case 1:
                methodText = 'Selection Sort';
                break;
            case 2:
                methodText = 'Bubble Sort';
                break;
            case 3:
                methodText = 'Shell Sort';
                break;
            default:
                methodText = 'Insertion Sort';
        }

        this.setState({
            method: childData,
            methodText: methodText
        })
    }

    // sets the size on user change
    handleSizeChange = (childData) => {
        // set new array and convert to chart data
        let newArr = this.setArray(childData);
        let newDoubleArr = this.convertToDoubleMatrix(newArr);

        // update state
        this.setState({
            arrData: newArr,
            chartData: newDoubleArr
        }, function () {
            // reset color
            this.resetColor()
        });
    }

    // sets chart color back to normal (if a column exists that is orange(rgb), it gets reset back to blue)
    resetColor = () => {
        // grab column list from chart
        let list = document.getElementsByClassName("series bar")[0].childNodes;

        // checking chart for an orange column
        for (let i = 0; i < list.length; i++) {

            // orange found, reset entire chart
            if (window.getComputedStyle(ReactDOM.findDOMNode(list[i])).getPropertyValue("fill") === 'rgb(255, 165, 0)') {
                for (let j = 0; j < list.length; j++) {
                    list[j].style.fill = 'rgb(74, 181, 235)';
                }

                // reset done, break the check loop 
                break;
            }
        }
    }

    // renders a randomized array with same length as previous
    handleRandomizeClick = () => {
        // set new array and convert to chart data
        let newArr = this.setArray(this.state.arrData.length);
        let newDoubleArr = this.convertToDoubleMatrix(newArr);

        // update state
        this.setState({
            arrData: newArr,
            chartData: newDoubleArr
        }, function () {
            // reset color
            this.resetColor();
        })
    }

    // sets the speed on user change
    handleSpeedChange = (childData) => {
        this.setState({ iterationSpeed: childData });
    }

    // delays code for # ms by creating a promise and resolving it
    updateChart(ms, arr) {
        this.setState({ chartData: this.convertToDoubleMatrix(arr) }, function () {
            ;
        });
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // handles fixing the UI and state depending on current sort execution
    sortExecutionUpdate = (running) => {

        if (running === false) {
            // tell state sort is done
            this.setState({ executing: false });

            // hide stop button 
            document.getElementById('stopButton').style.display = 'none';
        }
        else {
            // tell state sort is starting
            this.setState({ executing: true });

            // show stop button 
            document.getElementById('stopButton').style.display = 'block';
        }
    }

    // handles column color change
    setColumnColor = (show, index) => {
        if (show === true)
            document.getElementsByClassName("series bar")[0].childNodes[index].style.fill = 'orange';
        else
            document.getElementsByClassName("series bar")[0].childNodes[index].style.fill = 'rgb(74, 181, 235)';
    }

    // insertion sort
    insertionSort = async (arr) => {
        // base cases
        if (arr.length < 2 || arr == null)
            return arr;

        for (let i = 0; i < arr.length; i++) {

            // set cur
            let cur = arr[i];

            // sets current column color
            this.setColumnColor(true, i);

            // compare current with predecessor to see if it's smaller
            if (cur <= arr[i - 1]) {

                // current is smaller, so compare to all elements that come before it
                let j = i - 1;
                while (j >= 0 && cur < arr[j]) {

                    // move greater element up one 
                    arr[j + 1] = arr[j];

                    // swap positions
                    arr[j] = cur;

                    // update chart and delay iteration
                    await this.updateChart(this.state.iterationSpeed, arr);

                    // next previous index
                    j--;
                }
            }
        }
        // set state and UI
        this.sortExecutionUpdate(false);

        return arr;
    }

    // selection sort
    selectionSort = async (arr) => {
        // base case
        if (arr.length < 2 || arr == null)
            return arr;

        for (let i = 0; i < arr.length; i++) {
            let minIndex = i;

            // sets current column color
            this.setColumnColor(true, i);

            // find smallest number in subarray
            for (let j = i + 1; j < arr.length; j++) {
                // set new smallest
                if (arr[minIndex] > arr[j])
                    minIndex = j;
            }

            // swap elements if the minimum index does not equal current index
            if (minIndex != i) {
                // swap
                let temp = arr[i];
                arr[i] = arr[minIndex];
                arr[minIndex] = temp;

                // update chart and delay iteration
                await this.updateChart(this.state.iterationSpeed, arr);
            }
        }
        // set state and UI
        this.sortExecutionUpdate(false);

        return arr;
    }

    // bubble sort
    bubbleSort = async (arr) => {
        // base cases
        if (arr.length < 2 || arr == null)
            return arr;

        // double loop to compare each adjacent pair and swap them until sorted
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < arr.length; j++) {

                // swap elements if cur element is bigger than next
                if (arr[j] > arr[j + 1]) {

                    // swap
                    let temp = arr[j];
                    arr[j] = arr[j + 1];
                    arr[j + 1] = temp;

                    // update chart and delay iteration
                    await this.updateChart(this.state.iterationSpeed, arr);
                }

                // set current column color
                this.setColumnColor(true, arr.length - 1 - i);
            }
        }
        // set state and UI
        this.sortExecutionUpdate(false);

        return arr;
    }

    // shell sort
    shellSort = async (arr) => {
        // base cases
        if (arr.length < 2 || arr == null)
            return arr;

        // creating gap/intervals manually, this set works great
        let gaps = [66, 31, 14, 5, 1];

        // sorting with each gap/interval
        for (var g = 0; g < gaps.length; g++) {
            var curGap = gaps[g];

            // use insertion sort for each gap cycle
            for (var i = curGap; i < arr.length; i++) {
                var temp = arr[i];

                // compare and swap if smaller
                for (var j = i; j >= curGap && arr[j - curGap] > temp; j -= curGap) {
                    // swap
                    arr[j] = arr[j - curGap];

                    // update chart and delay iteration
                    await this.updateChart(this.state.iterationSpeed, arr);
                }

                // sets current column color
                if (g === gaps.length - 1)
                    this.setColumnColor(true, i);

                // swap
                arr[j] = temp;

                // update chart and delay iteration
                await this.updateChart(this.state.iterationSpeed, arr);
            }
        }
        // set state and UI
        this.sortExecutionUpdate(false);

        return arr;
    }

    // rendering components
    render() {
        // display nothing if states chart data isn't set
        if (this.state.chartData === null) {
            return (
                <div>Waiting for data...</div>
            )
        }
        // display main content
        else {
            return (
                <div id="dashboard">
                    <Options
                        methodCallback={this.handleMethodSwitch}
                        executeCallback={this.handleExecute}
                        sizeChangeCallback={this.handleSizeChange}
                        speedChangeCallback={this.handleSpeedChange}
                        randomizeChangeCallback={this.handleRandomizeClick}
                        currentMethodText={this.state.methodText}
                    />

                    <MyChart theData={this.state.chartData} />
                </div>
            )
        }
    }
}

export default Dashboard;

