import React from 'react';
import tgrowImage from '../images/tgrow.png';

class TgrowUI extends React.Component {
   
    render() {
        return (
            <div>
                <div className='row'>
                    <div className='col-md-3 border'>
                        <span>Way Forward</span>
                        <div>
                            Helps you determine and choose the fastest, easiest,
                            {/*best, first step and then the subsequent steps towards your goal
                            <p>Helps you plan your journey towards your desired destination</p>
                            <p>Helps you take requisite action</p> */}
                        </div>
                    </div>
                    <div className='col-md-offset-4 col-md-3 border'>
                        <span>Goal</span>
                        <div>
                            A goal gives clarity about what you want
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-4 col-md-offset-3 border'>
                        <img src={tgrowImage} className='img-responsive' role='presentation'/>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-3 border'>
                        <span>Options</span>
                        <div>
                            Best choices towards attaining your goals
                        </div>
                    </div>
                    <div className='col-md-offset-4 col-md-3 border'>
                        <span>Reality</span>
                        <div>
                            Helps you ascetain what can or is stopping you
                            <p>Helps you determine how to tackle these challenges, barriers or obstacles</p>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default TgrowUI;