import React, { useContext } from 'react';
import { ThemeContext } from './AppContext';
import { generalFunction } from '../../assets/Config/generalFunction';

const SurveyComponents = ({closeSurveyPopup}) => {
    const { theme, bgColors } =
        useContext(ThemeContext);

    return (
        <div className="fixed w-screen h-screen z-20 left-0 top-0 bg-[rgba(151,151,151,0.2)] backdrop-blur-sm" onClick={closeSurveyPopup}>
                <div className="absolute right-20 bottom-14" id="clickbox_sreferral">
                  <Survey
                    questId="q-saas-survey"
                    userId={generalFunction.getUserId()}
                    token={generalFunction.getUserToken()}
                    itemsPerPage={2}
                    styleConfig={{
                      Form: {
                          background: bgColors[`${theme}-primary-bg-color-3`],
                          boxShadow: "0px 0px 0px 0px",
                      },
                      Label: {
                          color: bgColors[
                              `${theme}-color-premitive-grey-6`
                          ],
                          fontFamily: "Figtree",
                          fontSize: "12px",
                          fontStyle: "normal",
                          fontWeight: "500",
                          lineHeight: "16px",
                      },
                      Input: {
                          borderRadius: "10px",
                          border: "1px solid #ECECEC",
                      },
                      MultiChoice: {
                          selectedStyle: {
                              background: bgColors[`${theme}-primary-bg-color-0`],
                              color: "#E0E0E0",
                              border: "1px solid"
                          }
                      },
                      SingleChoice: {
                          selectedStyle: {
                              border: "1px solid gray"
                          }
                      }
                    }}
                    heading="How was your experience?"
                    subHeading="Please share your feedback with us."
                    showFooter={false}
                  />
                </div>
              </div>
    );
}

export default SurveyComponents;
