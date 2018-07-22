import React from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { AverageMoodDisplay } from './average-mood';
import {Doughnut, Bar} from 'react-chartjs-2';
import { RestService } from '../../services/rest-service';

export class Insights extends React.Component {
    state = { 
        donutData: {
            datasets: [{
                data: [20, 5],
                backgroundColor: [
                    '#36a2eb',
                    '#ff6384',
                ]
            }],
        
            // These labels appear in the legend and in the tooltips when hovering different arcs
            labels: [
                'Happy',
                'Sad'
            ]
        }
    };

    componentDidMount() {
        const allUserData = RestService.getAllDataForUser(1);

        console.log(allUserData);
    }

    render() {
        return (
            <ExpansionPanel expanded>
                <ExpansionPanelSummary>
                    <AverageMoodDisplay/>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                    <div><Doughnut data={this.state.donutData}/></div>
                    <br/>    
                </ExpansionPanelDetails>
            </ExpansionPanel>
        );
    }
}
export default Insights;