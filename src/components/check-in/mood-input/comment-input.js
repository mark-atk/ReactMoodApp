import React from 'react';
import TextField from '@material-ui/core/TextField';


export class CommentInput extends React.Component {
    state = {
        comment: ''
    };

    handleChange = event => {
        const commentValue = event.target.value;

        this.setState({
            comment: commentValue,
        });

        this.props.dataCallback({ comment: commentValue });
    };

    render() {
        return (
            <div>
                <TextField
                    label="Comment"
                    multiline
                    rowsMax="4"
                    rows="4"
                    value={this.state.comment}
                    onChange={this.handleChange}
                    margin="normal"
                />
            </div>
        );
    }
}

export default CommentInput;