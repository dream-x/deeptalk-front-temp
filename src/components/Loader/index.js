export function Loader({hidden = true}) {
    return (
        <div className="loader-container">
            <div className={(hidden ? 'hidden' : "loader")}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
        </div>
    );
}
