import React from 'react';
import SmartImage from '../images/smart.png';
import GoalImage from '../images/goal.jpg';
import StatsImage from '../images/stats.jpg';

class Home extends React.Component {

    render() {
        return (
            <div id="home">
                <div id='intro' className='row'>
                    <div className='my-container pad'>
                        <h1>Goal Setting Web-App</h1>
                        <p>Put your life and goals in proper perspective and move <span className='highlight'>RAPIDLY</span> from 
                        where you are now to where you <span className='highlight'>DESERVE</span> and <span className='highlight'>DESIRE </span> 
                        to be in the future.</p>
                    </div>
                </div>
                <div className='row my-container'>
                    <div className='col-md-6  pad'>
                    <span className='caption'>Why Goals?</span>
                    <span className="detail">Every single decision we make is in pursuit of goals we set consciously or unconsciously.
                    There really cannot be any form of achievement without clear-cut Goals. Across all facets and 
                    dimensions of our lives, we  consistently set goals. Our Goals determines our expectations, results as well as rewards. 
                    To be Goalless is to live like a dried leave caught in the wind –lifeless i.e mere existence; 
                    living in a state of rudderless apat padhy; living life  as a subject to events, circumstances and 
                    situations and living at the mercies of life’s many elements.  </span>
                    </div>
                    <div className="col-md-5 col-md-offset-1">
                        <img src={GoalImage} className='img-responsive' role='presentation' />
                    </div>
                </div>
                <div className='row important-quote'>
                    <span>“Many people fail in life, not for lack of ability or brains or even courage but 
                    simply because they have never organized their energies around a goal”- Elbert Hubbard</span>
                    
                </div>
                <div id='stats' className='row my-container pad'>
                    <div className="col-md-5 ">
                        <img src={StatsImage} className='img-responsive' role='presentation' />
                    </div>
                    <div className='col-md-5 col-md-offset-1'>
                        <span className='caption'>Stats</span>
                        <span className="detail">8-10% of people who set goals at the beginning of the year achieve 
                        them by the end of that Year.</span>
                        <span className="detail">50% of the others have infrequent success.</span>
                        <span className="detail">25% NEVER succeed and have failed on every goal they set every year 
                        i.e 3 out of 4 people almost never succeed at achieving their new year Goals.</span>
                        <span className="detail">35% of people generally set goals related to money</span>
                        <span className="detail">40% of people set goals related to weight</span>
                        <span className="detail">50% of people set goals related to self-improvement or development</span>
                        <span className="detail">35% of people set goals related to relationships or marriage</span>
                        <span className="detail">40% of people in their 20s achieve their goals every year</span>
                        <span className="detail">15% of people in their 50s achieve their goals every year</span>
                    </div>
                   
                </div>
                <div className='row important-quote'>
                    <span>“Shoot for the moon.  Even if you miss, you'll land among the stars”- Les Brown </span>
                </div>
                <div className='row my-container pad'>
                    <div className='col-md-6'>
                        <span className='caption'>Set SMART Goals</span>
                        <span className="detail">Specific &mdash;</span>
                        <span className="detail">Measurable &mdash;</span>
                        <span className="detail">Attainable &mdash;</span>
                        <span className="detail">Realistic &mdash;</span>
                        <span className="detail">Time bound &mdash;</span>
                    </div>
                    <div className="col-md-5 col-md-offset-1">
                        <img src={SmartImage} className='img-responsive' role='presentation' />
                    </div>
                </div>
            </div>
        )
    }


}

export default Home;