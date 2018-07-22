import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import { AverageMoodDisplay } from './average-mood';
import { Doughnut, Bar } from 'react-chartjs-2';
import { RestService } from '../../services/rest-service';
import { InsightsHistory } from './insights-history';

export class Insights extends React.Component {
    state = {
        userData: [],
        averageMood: 0,
        donutData: {
            datasets: [{
                data: [20, 5],
                backgroundColor: [
                    '#ff6384',
                    '#36a2eb',
                ]
            }],
            labels: [
                'Negative',
                'Positive',
            ]
        }
    };

    componentDidMount() {
        this.refresh();
        this.props.setRefresh(this.refresh);
    }

    refresh = () => {
        RestService.getAllDataForUser(1, (data) => this.updateStateAndData(data));
    }

    updateStateAndData(data) {
        this.setState({ userData: data.userData }, () => {
                if (this.state.userData) {
                    let moodSum = 0;
                    let moodCount = 0;

                    this.state.userData.forEach(item => {
                        moodSum = moodSum + +item.mood;
                        moodCount++;
                    });

                    const averageMood = (moodSum / moodCount);

                    this.setState({
                        averageMood: averageMood,
                        donutData: {
                            datasets: [{
                                data: [
                                    Math.round(averageMood), 
                                    Math.round(7-averageMood)
                                ]
                            }]
                        }
                    });
                }
            });
    }

    render() {
        return (
            <div>
                <ExpansionPanel expanded>
                    <ExpansionPanelSummary>
                        <AverageMoodDisplay averageMood={this.state.averageMood} />
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div>
                            <Doughnut data={this.state.donutData} />
                        </div>
                        <br />
                    </ExpansionPanelDetails>
                </ExpansionPanel>
                <InsightsHistory data={this.state.userData} />
            </div>
        );
    }
}
export default Insights;