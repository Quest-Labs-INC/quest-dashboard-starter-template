import { useContext } from "react";
import { ThemeContext } from "../Common/AppContext";

export default function Parameter() {
    const { theme, bgColors, appConfig } = useContext(ThemeContext);

    return (
        <div className="w-full max-w-[520px] m-auto h-[800px] relative flex items-center justify-center">
            <div className="flex-col justify-start items-center gap-6 inline-flex">
                <div className="flex-col justify-start items-center gap-1.5 flex">
                    <div className="text-2xl font-semibold font-['Figtree'] leading-loose" style={{ color: bgColors[`${theme}-color-premitive-grey-5`] }}>
                        Test Individual page
                    </div>
                </div>
   
            </div>
        </div>
    );
}
