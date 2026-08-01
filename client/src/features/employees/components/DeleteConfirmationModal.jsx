import React from 'react';
import Modal from '../../../components/common/Modal';
import Button from '../../../components/common/Button';
import { AlertTriangle, Trash2 } from 'lucide-react';

const DeleteConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  employeeName = 'this employee',
  loading = false,
}) => {
  const modalFooter = (
    <>
      <Button variant="secondary" onClick={onClose} disabled={loading}>
        Cancel
      </Button>
      <Button variant="danger" onClick={onConfirm} loading={loading} icon={Trash2}>
        Delete Employee
      </Button>
    </>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Employee Deletion"
      footer={modalFooter}
      size="md"
    >
      <div className="flex items-start gap-4 p-2">
        <div className="p-3 bg-red-50 text-red-600 rounded-full flex-shrink-0">
          <AlertTriangle className="w-6 h-6" />
        </div>
        <div className="space-y-2">
          <p className="text-sm text-gray-700 leading-relaxed">
            Are you sure you want to delete <span className="font-bold text-gray-900">{employeeName}</span>?
          </p>
          <p className="text-xs text-gray-500">
            This action is permanent. The employee record and their associated profile image will be removed.
          </p>
        </div>
      </div>
    </Modal>
  );
};

export default DeleteConfirmationModal;
