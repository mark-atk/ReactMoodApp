import React from 'react';
import Chip from '@material-ui/core/Chip';

export class FeelingsDisplay extends React.Component {
    constructor(props) {
        super(props);
    }

    feelingsChips = this.props.feelings.map(feeling => {
    });

    render() {
        return(            
            <div>    
            {this.props.feelings && this.props.feelings.map((feeling, index) =>
                <Chip style={{margin:"4px"}} key={index} label={feeling}/>
            )}
            </div>
        );
    };
}
export default FeelingsDisplay;