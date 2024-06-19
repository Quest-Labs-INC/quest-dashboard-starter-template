import { memo, useContext } from "react";
import { FeedbackWorkflow } from "@questlabs/react-sdk";
import { useState } from "react";
import { generalFunction } from "../../assets/Config/generalFunction";
import { ThemeContext } from "./AppContext";
import { mainConfig } from "../../assets/Config/appConfig";

function FeedbackButton() {
    const [openFeedback, setOpenFeedback] = useState(false);
    const { theme, bgColors, appConfig } = useContext(ThemeContext);
    const getLighterColor = (color1, color2) => {

        const calculateLuminance = (color) => {
            const r = parseInt(color.slice(1, 3), 16);
            const g = parseInt(color.slice(3, 5), 16);
            const b = parseInt(color.slice(5, 7), 16);
            return (0.2126 * r + 0.7152 * g + 0.0722 * b) / 255;
        };
        const luminance1 = calculateLuminance(color1);
        const luminance2 = calculateLuminance(color2);

        return luminance1 > luminance2 ? color1 : color2;
    };

    const colorRetriver = () => {
        let mainColor = bgColors[`${theme}-primary-bg-color-0`] || "#FBFBFB";
        let diffColor = mainColor
            .split(" ")
            ?.filter((ele) => ele.charAt(0) == "#");

        let pickColor = !!diffColor?.length
            ? [diffColor[0], diffColor.length > 1 ? diffColor[1] : "#D1ACFF"]
            : ["#9035FF", "#D1ACFF"];
        // const lighterColor = getLighterColor(diffColor[0], diffColor[1]);
        const lighterColor = getLighterColor(pickColor[0], pickColor[1]);

        return lighterColor;
    };

    function hexToRgb(hex) {
        hex = hex.replace(/^#/, "");
        const bigint = parseInt(hex, 16);
        const r = (bigint >> 16) & 255;
        const g = (bigint >> 8) & 255;
        const b = bigint & 255;
        return `${r}, ${g}, ${b}`;
    }
    const originalColor = hexToRgb(colorRetriver())
        .split(",")
        .map((value) => parseInt(value.trim()));
    const darkerColor = originalColor.map((value) => Math.max(value - 50, 0));
    const clampedDarkerColor = darkerColor.map((value) => Math.min(value, 255));
    const darkerColorString = clampedDarkerColor.join(", ");

    return (
        <div className="z-50">
            <div
                className="fixed -right-11 top-[50vh] -rotate-90 cursor-pointer"
                style={{
                    borderRadius: "6px 6px 0px 0px",
                    padding: "10px 30px",
                    background: bgColors[`${theme}-primary-bg-color-0`],
                    color: "white",
                }}
                onClick={() => setOpenFeedback(true)}
            >
                <p>Feedback</p>
            </div>

            <FeedbackWorkflow
                userId={generalFunction.getUserId()}
                token={generalFunction.getUserToken()}
                isOpen={openFeedback}
                onClose={() => setOpenFeedback(false)}
                zIndex={11}
                topbarColor={"white"}
                starColor="blue"
                showFooter={true}
                questId={appConfig?.QUEST_FEEDBACK_WORKFLOW_CAMPAIGN_ID}
                ReportBug={{
                    description: "Help us squash those bugs!",
                }}
                GeneralFeedback={{
                    description: "Your opinions, our improvements.",
                    formDescription:
                        "Really appreciate you submitting a feedback to improve the app",
                }}
                ContactUs={{
                    description: "We're here, let's talk.",
                }}
                RequestFeature={{
                    description: "Suggest, we innovate together.",
                }}
                contactUrl={`mailto:${mainConfig.CONTACT_EMAIL
                    }`}
                styleConfig={{
                    listHeading: {},
                    listHover: {
                        background:
                            theme == "dark"
                                ? "rgba(162, 162, 162, 0.5)"
                                : "#FBFBFB",
                        iconColor:
                            theme == "dark"
                                ? ""
                                : `rgba(${darkerColorString}, 1)`,
                        iconBackground:
                            theme == "dark"
                                ? ""
                                : `rgba(${hexToRgb(colorRetriver())}, 0.2)`,
                    },
                    Form: {
                        background: bgColors[`${theme}-primary-bg-color-1`],
                    },
                    Heading: {
                        fontSize: "20px",
                        color: bgColors[`${theme}-color-premitive-grey-5`],
                    },
                    Description: {
                        fontSize: "12px",
                    },
                    Label: {
                        alignSelf: "stretch",
                        color: bgColors[`${theme}-color-premitive-grey-6`],
                        fontFamily: "Figtree",
                        fontSize: "12px",
                        fontStyle: "normal",
                        fontWeight: "500",
                        lineHeight: "16px" /* 133.333% */,
                    },
                    Footer: {
                        background: bgColors[`${theme}-primary-bg-color-1`],
                    },
                    PrimaryButton: {
                        border: "none",
                    },

                    Input: {
                        borderColor:
                            theme == "dark" ? "rgba(255, 255, 255, 0.2)" : "",
                    },
                    TextArea: {
                        borderColor:
                            theme == "dark" ? "rgba(255, 255, 255, 0.2)" : "",
                    },
                    SecondaryButton: {
                        color: bgColors[`${theme}-color-premitive-grey-5`],
                    },
                    TopBar: {
                        borderColor:
                            theme == "dark" ? "rgba(255, 255, 255, 0.2)" : "",
                    },
                }}
            />
        </div>
    );
}

export default memo(FeedbackButton);
