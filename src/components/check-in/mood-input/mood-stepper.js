import React from 'react';
import PropTypes from 'prop-types';
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
        mood: 0,
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
        this.setState({
            loading: true
        }, () => {
            const data = {
                userId: 1,
                mood: this.state.mood,
                feelings: this.state.feelings,
                comment: this.state.comment
            };

            RestService.addNewEntry(data);

            this.props.setCloseDialog();
        });
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
                                    {activeStep === 3 - 1 ? 'Finish' : 'Next'}
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
                                    onClick={this.handleNext}>
                                    {activeStep === 3 - 1 ? 'Finish' : 'Next'}
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
                                    {activeStep === 3 - 1 ? 'Finish' : 'Next'}
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