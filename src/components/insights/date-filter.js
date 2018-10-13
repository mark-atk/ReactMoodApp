import React from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

export class DateFilter extends React.Component {
    constructor(props) {
        super(props);
    }

    state = {
        dateTo: new Date(),
        dateFrom: new Date()
    };

    handleDateToChange = event => {
        this.setState({
            dateTo: event.target.value,
        });
    };

    handleDateFromChange = event => {
        this.setState({
            dateFrom: event.target.value,
        });
    };

    render() {
        return(
            <div>
                Date Filter:
                <form noValidate>
                    <TextField
                        id="dateFrom"
                        label="Date From"
                        type="date"
                        onChange={this.handleDateFromChange}
                        InputLabelProps={{
                        shrink: true,
                        }}/>
                    <TextField
                        id="dateTo"
                        label="Date To"
                        type="date"
                        onChange={this.handleDateToChange}
                        InputLabelProps={{
                        shrink: true,
                        }}/>
                    <Button color="inherit" onClick={() => this.props.filterCallback(this.state.dateFrom, this.state.dateTo)}>
                        Filter
                    </Button>
                </form>
            </div>
        )
    }
}

export default DateFilter;