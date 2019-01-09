import * as React from 'react';
import { Component } from 'react';
import AddDataPointsModal from './addDataPointsModal';
import { Application } from './../../types/domainTypes';
// import { Loading } from './../../types/utilityTypes';
import DataPointModal from './dataPointModal';
import api from './../../services/api';

class DataPoints extends Component<Application> {

    public state = {dataPoints: [], personBeanId: 0};

    public componentDidMount () {
        api
            .getDataPoints(this.props.personBean.id)
            .then(v => {
                this.setState({dataPoints: [...v]});
            });
    }

    render () {
        const {
            dataPoints
        } = this.state;

        return (
            <div>
            {
                dataPoints && dataPoints.length > 0 ?
                <>
                <header className="flexBetween">
                    <h3>Data Points</h3>
                    <AddDataPointsModal person={this.props.personBean} />
                </header>
                <ul style={{marginBlockEnd: '2rem', paddingLeft: '1rem'}}>
                    {dataPoints.map((dp, i) => {
                        return (
                            <li key={i} style={{ marginBottom: '.5rem' }}>
                                <DataPointModal
                                    {...this.state.dataPoints[i]}
                                    person={this.props.personBean.id}
                                />
                            </li>
                        );
                    })}
                </ul>
                </>
                :
                <header className="flexBetween">
                    <h3>Data Points</h3>
                    <AddDataPointsModal person={this.props.personBean} />
                </header>
            }
            </div>
        );
    }
}

export default DataPoints;