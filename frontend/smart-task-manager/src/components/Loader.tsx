/**
*Loader component displays a Bootstrap spinner during async operations.
*/
function Loader() {
    return (
        <div className="text-center py-5">
            {/** Bootstrap spinner animation */}
            <div className="spinner-border text-primary" role="status">
                {/**For screen readers (accessibility) */}
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}

export default Loader;