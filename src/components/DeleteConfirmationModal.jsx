import { Trash2 } from "lucide-react";
export default function DeleteConfirmationModal({ isOpen, onConfirm, onCancel, leadName }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 transition-opacity"
        onClick={onCancel}
      ></div>

      {/* Modal */}
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
        <div className="relative inline-block align-bottom bg-white rounded-2xl shadow-2xl transform transition-all sm:my-8 sm:align-middle sm:w-full sm:max-w-md">
          {/* Icon Section */}
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-100 mt-6">
           <Trash2 size={24} className="text-red-600" />
          </div>

          {/* Content */}
          <div className="px-6 py-6 text-center">
            <h3 className="text-lg font-bold text-gray-900 mb-2">Delete Lead</h3>
            <p className="text-sm text-gray-600 mb-4">
              Are you sure you want to delete <span className="font-semibold">{leadName}</span>? This action cannot be undone.
            </p>
            
          </div>

          {/* Footer Actions */}
          <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 rounded-b-2xl flex gap-3 justify-end">
            <button
              onClick={onCancel}
              className="px-6 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold rounded-lg transition"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              className="px-6 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
