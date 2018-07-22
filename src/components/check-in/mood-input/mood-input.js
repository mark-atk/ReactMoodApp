import React from 'react';
import Radio from '@material-ui/core/Radio';
import Typography from '@material-ui/core/Typography';

export class MoodInput extends React.Component {
    state = {
        selectedValue: '4',
    };

    constructor(props) {
        super(props);
    }

    handleChange = event => {
        const moodValue = event.target.value;

        this.setState({ selectedValue:  moodValue});

        this.props.dataCallback({mood: moodValue});
    };

    render() {
        return (
            <div>
                <Radio
                    checked={this.state.selectedValue === '6'}
                    onChange={this.handleChange}
                    value="6"
                />😭
                <Radio
                    checked={this.state.selectedValue === '5'}
                    onChange={this.handleChange}
                    value="5"
                />😢
                <Radio
                    checked={this.state.selectedValue === '4'}
                    onChange={this.handleChange}
                    value="4"
                />🙁
                <Radio
                    checked={this.state.selectedValue === '3'}
                    onChange={this.handleChange}
                    value="3"
                />😐
                <Radio
                    checked={this.state.selectedValue === '2'}
                    onChange={this.handleChange}
                    value="2"
                />😏
                <Radio
                    checked={this.state.selectedValue === '1'}
                    onChange={this.handleChange}
                    value="1"
                />😌
                <Radio
                    checked={this.state.selectedValue === '0'}
                    onChange={this.handleChange}
                    value="0"
                />😆
            </div>
        );
    }
}

export default MoodInput;