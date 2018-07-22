import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import zIndex from '@material-ui/core/styles/zIndex';

export class MoodAvater extends React.Component {
    getRenderEmoji() {
        switch ((+this.props.mood)) {
            case 0:
                return '😆';
            case 1:
                return '😌';
            case 2:
                return '😏';
            case 3:
                return '😐';
            case 4:
                return '🙁';
            case 5:
                return '😢';
            case 6:
                return '😭';
            default:
                return "...";
        }
    }

    render() {
        return (
            <Avatar>
                {this.getRenderEmoji()}
            </Avatar>
        )
    }
}
export default MoodAvater;