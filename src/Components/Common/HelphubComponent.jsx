import { HelpHub } from '@questlabs/react-sdk';
import React, { useContext } from 'react';
import { generalFunction } from '../../assets/Config/generalFunction';
import { ThemeContext } from './AppContext';

const HelphubComponent = () => {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    



    return (
        <HelpHub
            questId={appConfig.QUEST_HELPHUB_CAMPAIGN_ID}
            userId={generalFunction.getUserId()}
            token={generalFunction.getUserToken()}
            styleConfig={{
                Home: {
                    Banner: {
                        background: bgColors[`${theme}-primary-bg-color-0`]
                    },
                    Button: {
                        border: "none"
                    }
                },
            }}
            contentConfig={{
                Home: {
                    box1: {
                        image: appConfig.BRAND_LOGO,
                        heading: "Welcome to" + appConfig.QUEST_ENTITY_NAME + " community",
                        subHeading: "We're here to help you out. Let us know if you need any help.",
                        link: "" // add any kind of commynity link here
                    }
                }
            }}
        />
    );
}

export default HelphubComponent;
