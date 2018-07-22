import React from 'react';
import { HistoryItemPanel } from './history-item';

export class InsightsHistory extends React.Component {
    state = {
        userData: [{ userId: 1, 
            mood: "5", 
            feelings: ["depressed", "optimistic", "happy"], 
            comment: "Nothing to show here." }]
    };

    constructor(props) {
        super(props);
    }

    static getDerivedStateFromProps(props, state) {
        return { userData: props.data };
    }

    render() {
        return (
            <div>                
                {this.state.userData && this.state.userData.map((item) =>
                    <HistoryItemPanel key={item.id}
                        mood={item.mood}
                        feelings={item.feelings}
                        dateTime={item.dateTime}
                        comment={item.comment} />
                )}
            </div>
        );
    };
}
export default InsightsHistory;