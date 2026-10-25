const Modal = (props) => {
    const modal = props.modal
    
    return (
        <div className={modal.visible ? "modal d-block" : "modal"}
            tabIndex="-1"
            role="dialog"
            style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
            <div className="modal-dialog" role="document">
                <div className="modal-content bg-dark">
                    <div className="modal-header">
                        <h5 className="modal-title">{modal.title}</h5>
                    </div>
                    <div className="modal-body">
                        {typeof(modal.body)==="function"?modal.body():modal.body}
                    </div>
                    <div className="modal-footer">
                        {modal.button.map((b, k) =>
                            <button key={k}
                                type="button"
                                className="btn btn-primary"
                                onClick={() => b.action(props.game)}
                            >{b.label}</button>
                        )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal