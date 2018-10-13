import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepContent from '@material-ui/core/StepContent';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import MoodInput from './mood-input';
import FeelingInput from './feeling-input';
import CommentInput from './comment-input';
import { RestService } from '../../../services/rest-service';

export class MoodStepper extends React.Component {

    state = {
        activeStep: 0,
        loading: false,
        mood: 5,
        feelings: {
            depressed: false,
            optimistic: false,
            bored: false,
            happy: false,
        },
        comment: ''
    };

    handleDataCallback = (dataFromChild) => {
        this.setState({
            mood: dataFromChild.mood ? dataFromChild.mood : this.state.mood,
            feelings: dataFromChild.feelings ? dataFromChild.feelings : this.state.feelings,
            comment: dataFromChild.comment ? dataFromChild.comment : this.state.comment,
        });
    }

    handleNext = () => {
        this.setState(state => ({
            activeStep: state.activeStep + 1,
        }), () => {
            if (this.state.activeStep === 3) {
                this.submitData();
            } else {
            }
        });
    };

    handleBack = () => {
        this.setState(state => ({
            activeStep: state.activeStep - 1,
        }));
    };

    handleReset = () => {
        this.setState({
            activeStep: 0,
        });
    };

    submitData() {
        const data = {
            userId: 1,
            dateTime: new Date(),
            mood: this.state.mood,
            feelings: this.generateFeelingsArray(),
            comment: this.state.comment
        };

        RestService.addNewEntry(data);

        this.props.setCloseDialog();
    };

    generateFeelingsArray() {
        const feelingsArray = [];
        const feelings = this.state.feelings;

        Object.keys(feelings).forEach(function(key,index) {
            if(feelings[key]) {
                feelingsArray.push(key.toString());
            }
        });

        return feelingsArray;
    };

    feelingsValid = () => {
        const feelings = this.state.feelings;
        var count = 0;
        Object.keys(feelings).forEach(function(key,index) {
            if(feelings[key]) {
                count++;
            }
        });

        return count > 0 ? true : false;;
    };

    render() {
        const { activeStep } = this.state;

        return (
            <div>
                <Paper square elevation={0}>
                    <Button onClick={this.handleReset}>
                        Reset
                </Button>
                    <Button onClick={this.props.setCloseDialog}>
                        Close
                </Button>
                </Paper>
                <Stepper activeStep={activeStep}
                    orientation="vertical">
                    <Step key="Step 1">
                        <StepLabel>Step 1</StepLabel>
                        <StepContent>
                            <Typography>Pick your mood</Typography>
                            <MoodInput dataCallback={this.handleDataCallback} />
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}>
                                    Next
                                </Button>
                            </div>
                        </StepContent>
                    </Step>
                    <Step key="Step 2">
                        <StepLabel>Step 2</StepLabel>
                        <StepContent>
                            <Typography>Select your relevant feelings</Typography>
                            <FeelingInput dataCallback={this.handleDataCallback} />
                            <div>
                                <Button onClick={this.handleBack}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}
                                    disabled={!this.feelingsValid()}>
                                    Next
                                </Button>
                            </div>
                        </StepContent >
                    </Step>
                    <Step key="Step 3">
                        <StepLabel>Step 3</StepLabel>
                        <StepContent>
                            <Typography>Insert optional comment</Typography>
                            <CommentInput dataCallback={this.handleDataCallback} />
                            <div>
                                <Button onClick={this.handleBack}>
                                    Back
                                </Button>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={this.handleNext}>
                                    Finish
                                </Button>
                            </div>
                        </StepContent>
                    </Step>
                </Stepper>
            </div>
        );
    };
}

export default MoodStepper;