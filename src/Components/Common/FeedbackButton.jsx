import { memo, useContext } from "react";
import { FeedbackWorkflow } from "@questlabs/react-sdk";
import { useState } from "react";
import { generalFunction } from "../../assets/Config/GeneralFunction";
import { ThemeContext } from "./AppContext";

function FeedbackButton() {
  const [openFeedback, setOpenFeedback] = useState(false);
  const { theme, bgColors } = useContext(ThemeContext);

  return (
    <div>
      <div
        className="fixed -right-10 top-[50vh] -rotate-90 btn-gradient cursor-pointer"
        style={{ borderRadius: "6px 6px 0px 0px", padding: "10px 30px" }}
        onClick={() => setOpenFeedback(true)}
      >
        <p>Feedback</p>
      </div>
      <FeedbackWorkflow
        questIds={[
          "q-general-feedback",
          "q-report-a-bug",
          "q-request-a-feature",
          "q-contact-us",
        ]}
        userId={generalFunction.getUserId()}
        token={generalFunction.getUserToken()}
        isOpen={openFeedback}
        onClose={() => setOpenFeedback(false)}
        zIndex={11}
        showFooter={false}
        styleConfig={{
          Form: {
            background: bgColors[`${theme}-primary-bg-color-1`],
            // background: "white"
          },
          PrimaryButton: {
            background: bgColors[`${theme}-primary-bg-color-0`],
          },
          Heading: {
            fontSize: "22px",
          },
          Description: {
            fontSize: "14px",
          },
        }}
      />
    </div>
  );
}

export default memo(FeedbackButton);
