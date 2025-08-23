import {
  CommentModal,
  ComplaintModal,
  ConfirmModal,
  MoneyWithdrawModal,
  PaymentModal,
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
    default:
      return null;
  }
}

export default ModalManager;
