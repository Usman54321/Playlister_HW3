import { useContext } from "react";
import { GlobalStoreContext } from "../store";

function DeleteListModal() {
    const { store } = useContext(GlobalStoreContext);
    

    function deleteListCallback() {
        store.deleteList();
    }

    function hideDeleteListModalCallback() {
        store.hideDeleteListModal();
    }

    let name = "";
    if (store.listToDelete) {
        name = store.idNamePairs.find(pair => pair._id === store.listToDelete).name;
    }

    return (
        <div
            className="modal"
            id="delete-list-modal"
            data-animation="slideInOutLeft">
            <div className="modal-root" id='verify-delete-list-root'>
                <div className="modal-north">
                    Delete playlist?
                </div>
                <div className="modal-center">
                    <div className="modal-center-content">
                        Are you sure you wish to permanently delete the <span id="delete-list-span">{name}</span> playlist?
                    </div>
                </div>
                <div className="modal-south">
                    <input type="button"
                        id="delete-list-confirm-button"
                        className="modal-button"
                        onClick={deleteListCallback}
                        value='Confirm' />
                    <input type="button"
                        id="delete-list-cancel-button"
                        className="modal-button"
                        onClick={hideDeleteListModalCallback}
                        value='Cancel' />
                </div>
            </div>
        </div>
    );
}

export default DeleteListModal;