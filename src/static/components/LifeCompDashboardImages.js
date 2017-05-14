import React from 'react';
import {LIFE_COMPONENTS, CLOUDINARY_IMAGE_ACCESS_URL} from '../config';
import {v4} from 'node-uuid';
import BrokenImage from '../images/broken.png';

class LifeCompDashboardImages extends React.Component {
    
    constructor(props){
        super(props);

        this.props = props;
    }

    static propTypes = {
        userId: React.PropTypes.number.isRequired
    }

    render(){

        return (
            <div>
                <div className='dashboard-component-title'>Life Component Images</div>
                {
                    LIFE_COMPONENTS.map((component) => {
                        let imgSrc = CLOUDINARY_IMAGE_ACCESS_URL + this.props.userId+"_"+component.key+".jpg";
                    
                        return (
                            <div key={v4()} className='col-sm-3 dashboard-images'>
                                <img src={imgSrc} className='img-responsive ' role='presentation' onError={ (e) => {e.target.src= BrokenImage } } />
                            </div>
                        )
                    })
                }
            </div>
        )
    }

}

export default LifeCompDashboardImages;