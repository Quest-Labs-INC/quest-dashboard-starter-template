import { FeedbackWorkflow } from "@questlabs/react-sdk";
import { useState } from "react";






export default function FeedbackButton() {
    const [openFeedback, setOpenFeedback] = useState(false);


    return (
        <div>
            <div className="fixed -right-10 top-[50vh] -rotate-90 btn-gradient cursor-pointer" style={{borderRadius: "6px 6px 0px 0px", padding: "10px 30px"}} onClick={() => setOpenFeedback(true)}>
                <p>Feedback</p>
            </div>
            <FeedbackWorkflow
                questIds={[
                    'q-general-feedback',
                    'q-report-a-bug',
                    'q-request-a-feature',
                    'q-contact-us',
                ]}
                userId="u-1dd2f19b-5a1a-46e9-aa38-2e4318834421"
                token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJ1LTFkZDJmMTliLTVhMWEtNDZlOS1hYTM4LTJlNDMxODgzNDQyMSIsImlhdCI6MTcwNDMzNDgzOCwiZXhwIjoxNzA0NDIxMjM4fQ.eITOAIrG_VQjCSyUL3IalP8X-9t11KYKC9dniXKQAJ8src/Components/Common/DashboardWrapper.jsx4"              
                isOpen={openFeedback}
                onClose={() => setOpenFeedback(false)}
                zIndex={11}
            />
        </div>
    )
}