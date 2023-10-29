import React, { useState } from "react";
import ModalLogin from "./ModalLogin";
import ModalRegister from "./ModalRegister";
import cn from "../../utils/cn";
import { MODAL_TYPE } from "../../constants/general";
import { useDispatch, useSelector } from "react-redux";
import { handleCloseModal } from "../../store/reducers/authReducer";

const AuthenModal = () => {
  const [modalType, setmodalType] = useState(MODAL_TYPE.login);
  const { showedModal } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const _onChangeTab = (modalType) => {
    setmodalType(modalType);
  };
  const _onCloseModal = (e) => {
    e?.preventDefault();
    dispatch(handleCloseModal());
  };
  return (
    <>
      <div
        className={cn("modal fade", {
          show: modalType,
        })}
        // id="signin-modal"
        // tabIndex={-1}
        // role="dialog"
        // aria-hidden="true"
        style={{ display: showedModal ? "block" : "none", zIndex: 1010 }}
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-body">
              <button
                type="button"
                className="close"
                // data-dismiss="modal"
                // aria-label="Close"
                onClick={_onCloseModal}
              >
                <span aria-hidden="true">
                  <i className="icon-close" />
                </span>
              </button>
              <div className="form-box">
                <div className="form-tab">
                  <ul className="nav nav-pills nav-fill nav-border-anim" role="tablist">
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: modalType === MODAL_TYPE.login,
                        })}
                        id="signin-tab"
                        // data-toggle="tab"
                        href="#signin"
                        // role="tab"
                        // aria-controls="signin"
                        // aria-selected="true"
                        onClick={() => _onChangeTab(MODAL_TYPE.login)}
                      >
                        Sign In
                      </a>
                    </li>
                    <li className="nav-item">
                      <a
                        className={cn("nav-link", {
                          active: modalType === MODAL_TYPE.register,
                        })}
                        // id="register-tab"
                        // data-toggle="tab"
                        href="#register"
                        // role="tab"
                        // aria-controls="register"
                        // aria-selected="false"
                        onClick={() => _onChangeTab(MODAL_TYPE.register)}
                      >
                        Register
                      </a>
                    </li>
                  </ul>
                  <div className="tab-content" id="tab-content-5">
                    {modalType === MODAL_TYPE.login && <ModalLogin />}

                    {/* .End .tab-pane */}
                    {modalType === MODAL_TYPE.register && <ModalRegister />}

                    {/* .End .tab-pane */}
                  </div>
                  {/* End .tab-content */}
                </div>
                {/* End .form-tab */}
              </div>
              {/* End .form-box */}
            </div>
            {/* End .modal-body */}
          </div>
          {/* End .modal-content */}
        </div>
        {/* End .modal-dialog */}
        {showedModal && (
          <div
            className="modal-backdrop fade show"
            onClick={_onCloseModal}
            // onClick={() => handleCloseModal}
          ></div>
        )}
      </div>
    </>
  );
};

export default AuthenModal;
