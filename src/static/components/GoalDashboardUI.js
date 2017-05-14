import React from 'react';
import {v4} from 'node-uuid';
import {LIFE_COMPONENTS} from '../config';
import LifeCompDropzone from './LifeCompDropzone';


class GoalDashboardUI extends React.Component {

    constructor(props){
        super(props);
        this.userId = this.props.userId;
    }

    static propTypes = {
        userId: React.PropTypes.number.isRequired
    };

    render() {
        
        return (

            <div id="component-dropzones" className="row my-container top-bottom-padded-content">
               
                {
                    LIFE_COMPONENTS.map((component) =>  {
                            return (
                                    <div key={v4()} className="col-md-3" >
                                        <LifeCompDropzone userId={this.userId} compKey={component.key} compValue={component.value}/>
                                    </div>
                                    )
                    })
                    
                }

            </div>
        );
    }
};

export default GoalDashboardUI;

