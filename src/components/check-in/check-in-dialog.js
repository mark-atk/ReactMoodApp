import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { MoodStepper } from './mood-input/mood-stepper';

export class CheckInDialog extends React.Component {
    state = {
        open: false,
    };

    constructor(props) {
        super(props);
    }

    toggleDialog = () => {
        if(this.state.open) {
            this.setState({open: false});
        } else {
            this.setState({open: true});
        }
    }

    componentDidMount() {
        this.props.setDialogToggle(this.toggleDialog);
    }

    handleClose = () => {
        this.setState({ open: false });
        this.props.setDialogFinished();
    };

    render() {
        return (
            <Dialog 
                fullScreen                     
                open={this.state.open}
                onClose={this.handleClose}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle id="responsive-dialog-title">{"Add new mood entry?"}</DialogTitle>
                <DialogContent>
                    <MoodStepper setCloseDialog={this.handleClose}/>
                </DialogContent>
            </Dialog>
        )
    }
}

export default CheckInDialog;