import { Search } from '@questlabs/react-sdk';
import React, { useContext } from 'react';
import { ThemeContext } from './AppContext';
import { generalFunction } from '../../assets/Config/generalFunction';
import { importConfig } from '../../assets/Config/importConfig';
import { useNavigate } from 'react-router';

const SearchComponents = () => {
    const { theme, bgColors, appConfig } =
        useContext(ThemeContext);
    const navigate = useNavigate();



    return (
        <div className="z-20">
                <Search
                    questId={appConfig?.QUEST_SEARCH_BAR_CAMPAIGN_ID}
                    userId={generalFunction.getUserId()}
                    token={generalFunction.getUserToken()}
                    open="ON_CTRL_K_KEY"
                    onResultClick={(e) => e == "/book-a-call" ? window.open(mainConfig.CALENDLY_LINK, "_blank") : navigate(e)}
                    // data={{}}
                    icons={[
                        importConfig.routesIcons.dashboardIcon,
                        importConfig.routesIcons.userIcon,
                        importConfig.routesIcons.adminIcon,
                        importConfig.routesIcons.settingIcon,
                    ]}
                    placeholder="Search for anything..."
                    styleConfig={{
                        listHover: {
                            background: theme == "dark" ? "rgba(162, 162, 162, 0.5)" : "#f4ebff"
                        },
                        Form: {
                            background: bgColors[`${theme}-primary-bg-color-1`],
                        },
                        Footer: {
                            background: bgColors[`${theme}-primary-bg-color-1`],
                        },
                        CommandButton: {
                            background: theme == "dark" ? "rgba(162, 162, 162, 0.5)" : "#f4ebff",
                            border: "none",
                            color: bgColors[`${theme}-color-premitive-grey-6`]
                        },
                        Topbar: {
                            borderColor: bgColors[`${theme}-primary-border-color`]
                        }
                    }}
                />
            </div>
    );
}

export default SearchComponents;
