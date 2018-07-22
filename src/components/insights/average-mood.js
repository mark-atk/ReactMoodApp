import React from 'react';
import Chip from '@material-ui/core/Chip';
import { MoodAvater } from './mood-avatar';

export class AverageMoodDisplay extends React.Component {
    state = {
        averageMood: 0,
    };

    constructor(props) {
        super(props);
    };

    static getDerivedStateFromProps(props, state) {
        return { averageMood: props.averageMood };
    }

    render() {
        const mood = Math.ceil(this.props.averageMood);
        const avgMood = Math.round(((7-this.props.averageMood)/7) * 100);

        return (
            <Chip
                avatar={<MoodAvater mood={mood}/>}
                label={`Your average mood has been ${avgMood}% positive.`}
            />
        );
    }
}