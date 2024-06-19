import spinner190 from "../Images/spinner190.svg";

export default function Loader() {
    return (
        <div
            id="loader"
            style={{
                zIndex: "100",
                background: "black",
                opacity: "0.5",
                display: "none",
                height: "100%",
                width: "100%",
                position: "fixed",
            }}
        >
            <div className="flex w-full h-full items-center justify-center">
                <img src={spinner190} className="w-40" />
            </div>
        </div>
    );
}
