import React from 'react';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

export class FeelingInput extends React.Component {
    state = {
        depressed: false,
        optimistic: false,
        bored: false,
        happy: false,
    };

    constructor(props) {
        super(props);
    };

    handleChange = name => event => {
        this.setState({ [name]: event.target.checked }, () => {
            this.props.dataCallback( {feelings: this.state} );
        });

    };

    render() {
        return (
            <FormControl component="fieldset">
                <FormGroup>
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.depressed}
                                onChange={this.handleChange('depressed')}
                                value="depressed"
                            />
                        }
                        label="Depressed"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.optimistic}
                                onChange={this.handleChange('optimistic')}
                                value="optimistic"
                            />
                        }
                        label="Optimistic"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.bored}
                                onChange={this.handleChange('bored')}
                                value="bored"
                            />
                        }
                        label="Bored"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={this.state.happy}
                                onChange={this.handleChange('happy')}
                                value="happy"
                            />
                        }
                        label="Happy"
                    />
                </FormGroup>
                <FormHelperText>Pick any of the above depending on how you are feeling.</FormHelperText>
            </FormControl>
        );
    };

}
export default FeelingInput;