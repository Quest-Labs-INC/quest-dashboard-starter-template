import { memo, useContext, useState } from 'react';
import { FeedbackWorkflow } from "@questlabs/react-sdk";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { ThemeContext } from '../../App';


function FeedbackButton() {
    const [openFeedback, setOpenFeedback] = useState(false);

    const { theme, bgColors, contentConfig } = useContext(ThemeContext)
    return (
        <div>
            <div className="fixed -right-10 top-[50vh] -rotate-90 btn-gradient cursor-pointer" style={{ borderRadius: "6px 6px 0px 0px", padding: "10px 30px" }} onClick={() => setOpenFeedback(true)}>
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

                backgroundColor={bgColors[`${theme}-primary-bg-color-0`]}
                textColor={bgColors[`${theme}-color-premitive-grey-5`]}
                btnColor={bgColors[`${theme}-color-premitive-grey-5`]}
                topbarColor={'white'}
                btnTextColor={bgColors[`${theme}-color-premitive-grey-5`]}
                starColor='blue'
                styleConfig={{
                    Form: {

                    },
                    Heading: bgColors[`${theme}-color-premitive-grey-5`],
                    Description: {},
                    Input: bgColors[`${theme}-color-premitive-grey-5`],
                    Label: bgColors[`${theme}-color-premitive-grey-5`],
                    TextArea: bgColors[`${theme}-color-premitive-grey-5`],
                    PrimaryButton: bgColors[`${theme}-color-premitive-grey-5`],
                    SecondaryButton: {},
                    Modal: {},
                    Footer: {},
                }}
            />
        </div>
    )
}

export default memo(FeedbackButton)