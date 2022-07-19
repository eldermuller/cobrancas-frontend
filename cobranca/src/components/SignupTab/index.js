import useConsumer from '../../hooks/useConsumer';
import { animated, config, easings, useTransition } from 'react-spring';
import './style.css';
import { useEffect, useState } from 'react';

function SignupTab({ previousStep }) {
    const { activeStep } = useConsumer()

    function getFrom() {
        if (previousStep === 0) { return { left: '0%', right: '0%' } }
        if (previousStep === 1) { return { left: '100%', right: '0%' } }
    }
    const fillFirstTab = useTransition(activeStep, {
        from: getFrom(),
        enter: { left: '0%', right: '0%' },
        leave: { left: '100%', right: '0%' },
        config: { duration: 500, easing: easings.easeOutQuad }
    })

    function getLeave() {
        if (activeStep === 0) { return { left: '0%', right: '100%' } }
        if (activeStep === 2) { return { left: '100%', right: '0%' } }
    }

    const fillMiddleTab = useTransition(activeStep, {
        from: { left: '0%', right: '100%' },
        enter: { left: '0%', right: '0%' },
        leave: getLeave(),
        config: { duration: 500, easing: easings.easeOutQuad }
    })
    const fillLastTab = useTransition(activeStep, {
        from: { left: '0%', right: '100%' },
        enter: { left: '0%', right: '0%' },
        leave: { left: '0%', right: '0%' },
        config: { duration: 500, easing: easings.easeOutQuad }
    })

    useEffect(() => {
    }, [activeStep])

    return (
        <div className='container-tab'>
            <div className='tab'>
                {fillFirstTab((style, activeStep) =>
                    activeStep === 0 &&
                    <animated.div style={style} className='inner-tab' />
                )}
            </div>
            <div className='tab'>
                {fillMiddleTab((style, activeStep) =>
                    activeStep === 1 &&
                    <animated.div style={style} className='inner-tab' />
                )}
            </div>
            <div className='tab'>
                {fillLastTab((style, activeStep) =>
                    activeStep === 2 &&
                    <animated.div style={style} className='inner-tab' />
                )}
            </div>
        </div>
    )
}

export default SignupTab;