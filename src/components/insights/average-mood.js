import React from 'react';
import Chip from '@material-ui/core/Chip';
import { MoodAvater } from './mood-avatar';

export class AverageMoodDisplay extends React.Component {
    state = {
        mood: 1,
    };

    render() {
        return (
            <Chip
                avatar={
                    <MoodAvater mood={this.state.mood}/>
                }
                label={`Your average mood has been ${((8-this.state.mood)/7)*100} %`}
            />
        );
    }
}