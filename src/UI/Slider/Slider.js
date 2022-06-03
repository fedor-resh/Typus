import {useMove} from '@mantine/hooks';
import styles from './Slider.module.css'
import {useEffect} from "react";

function Slider({
                    setValue,
                    value,
                    isTimePanelVisible = false,
                    isTime
                }) {
    const {ref} = useMove(({x}) => {
        setValue(Math.round(x*10)*30)
    })
    let time
    if(isTime){
        const min = Math.floor(value / 60)
        const sec = value % 60
        time = `${min}:${sec}`
    }else{
        time = value
    }



    const val = value/60*20

    return (
        <>

            <div
                ref={ref}
                className={styles.slider}
                style={{
                    width: '100%',
                    height: 16,
                    position: 'relative',
                    borderRadius: 20,
                }}
            >
                {/* Filled bar */}
                <div
                    style={{
                        width: `${val}%`,
                        height: 16,
                        borderRadius: 20,
                        borderBottomLeftRadius: 20,
                        borderTopLeftRadius: 20,
                    }}
                />

                {/* Thumb */}
                <div className={styles.small__panel}
                     style={{
                         position: 'absolute',
                         left: `calc(${val}% - 8px)`,
                         top: 0,
                         width: 16,
                         height: 16,
                         borderRadius: 20,
                     }}
                >
                    {isTimePanelVisible && <div>
                        <p>{time}</p>
                    </div>}
                </div>
            </div>
        </>
    );
}

export default Slider