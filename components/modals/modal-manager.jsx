import {
  CommentModal,
  ComplaintModal,
  ConfirmModal,
  MoneyWithdrawModal,
  PaymentModal,
  UpdateAchievResumeModal,
  UpdateEduResumeModal,
  UpdateExpResumeModal,
} from ".";

function ModalManager({ modal, closeModal }) {
  if (!modal.isOpen) return null;

  switch (modal.type) {
    case "confirm":
      return <ConfirmModal {...modal.props} onClose={closeModal} />;
    case "payment":
      return <PaymentModal {...modal.props} onClose={closeModal} />;
    case "money-withdraw":
      return <MoneyWithdrawModal {...modal.props} onClose={closeModal} />;
    case "complaint":
      return <ComplaintModal {...modal.props} onClose={closeModal} />;
    case "comment":
      return <CommentModal {...modal.props} onClose={closeModal} />;
    case "edu-resume-update":
      return <UpdateEduResumeModal {...modal.props} onClose={closeModal} />;
    case "exp-resume-update":
      return <UpdateExpResumeModal {...modal.props} onClose={closeModal} />;
    case "achiev-resume-update":
      return <UpdateAchievResumeModal {...modal.props} onClose={closeModal} />;
    default:
      return null;
  }
}

export default ModalManager;
