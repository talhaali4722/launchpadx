import React from 'react'
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';

const CircularProgressBarComp = (props) => {
    const { children, ...otherProps } = props;
    return (
        <div
            style={{
                position: 'relative',
                width: '50px',
                height: '50px',
            }}>
            <div style={{ position: 'absolute' }}>
                <CircularProgressbar {...otherProps}
                strokeWidth={12}
                    styles={buildStyles({
                        pathColor: '#a5a5a5',
                        textColor: '#a5a5a5',
                        trailColor:"#393939"
                        
                    })}

                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    height: '100%',
                    width: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                {props.children}
            </div>
        </div>
    );

    // return (
    //     <CircularProgressbar value={value} text={"s&nbsp;g"} strokeWidth={14} maxValue={maxValue}
    //         styles={buildStyles({
    //             textSize: '36px',
    //             pathColor: '#a5a5a5',
    //             textColor: '#a5a5a5',
    //         })}
    //     />
    // )
}

export default CircularProgressBarComp