import style from "./modal.module.css";

export default function Modal({ fermer, children }) {
    return (
        <div className={style.modal}>
            <div className={style.modalContent}>

                <button onClick={fermer}>
                    ✖
                </button>

                {children}

            </div>
        </div>
    );
}