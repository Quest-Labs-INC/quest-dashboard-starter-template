import { memo, useContext, useState } from 'react';
import { FeedbackWorkflow } from "@questlabs/react-sdk";
import { generalFunction } from "../../assets/Config/generalFunction";
import { ThemeContext } from './AppContext';


function FeedbackButton() {
    const [openFeedback, setOpenFeedback] = useState(false);

    const { theme, bgColors, contentConfig } = useContext(ThemeContext)
    return (
        <div className='z-50'>
            <div className="fixed -right-11 top-[50vh] -rotate-90 cursor-pointer" style={{ borderRadius: "6px 6px 0px 0px", padding: "10px 30px", background: bgColors[`${theme}-primary-bg-color-0`], color: "white" }} onClick={() => setOpenFeedback(true)}>
                <p>Feedback</p>
            </div>
            <FeedbackWorkflow
                questIds={[
                    'q-general-feedback',
                    'q-report-a-bug',
                    'q-request-a-feature',
                    'q-contact-us',
                ]}
                userId={generalFunction.getUserId()}
                token={generalFunction.getUserToken()}
                isOpen={openFeedback}
                onClose={() => setOpenFeedback(false)}
                zIndex={11}
                topbarColor={'white'}
                starColor='blue'
                showFooter={false}
                styleConfig={{
                    Form: {
                        background: bgColors[`${theme}-primary-bg-color-1`]
                        // background: "white"
                    },
                    PrimaryButton: {
                        background: bgColors[`${theme}-primary-bg-color-0`],
                    },
                    Heading: {
                        fontSize: "22px"
                    },
                    Description: {
                        fontSize: "14px"
                    },
                }}
            />
        </div>
    )
}

export default memo(FeedbackButton)