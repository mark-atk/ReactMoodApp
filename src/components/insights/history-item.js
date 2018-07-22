import React from 'react';
import { MoodAvater } from './mood-avatar';
import { FeelingsDisplay } from './feelings-display';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { Typography } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';

export class HistoryItemPanel extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <div>
                            <MoodAvater mood={this.props.mood} />
                        </div>
                        <span style={{ width: "5%" }} />
                        <div style={{ alignSelf: "center" }}>
                            <Typography>{new Date(this.props.dateTime).toLocaleString()}</Typography>
                        </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {this.props.feelings.length > 0
                            &&
                            <Card>
                                <CardContent>
                                    <Typography gutterBottom variant="headline" component="h2">
                                        Feelings
                                    </Typography>
                                    <FeelingsDisplay feelings={this.props.feelings} />
                                </CardContent>
                            </Card>
                        }
                        <Card style={{ width: "100%" }}>
                            <CardContent>
                                <Typography variant="headline" component="h2">
                                    Comment
                                </Typography>
                                <Typography>
                                    {this.props.comment}
                                </Typography>
                            </CardContent>
                        </Card>
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            </div>
        );
    };
}
export default HistoryItemPanel;