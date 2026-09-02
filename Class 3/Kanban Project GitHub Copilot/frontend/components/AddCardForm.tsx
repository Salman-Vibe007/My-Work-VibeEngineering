import { Plus } from 'lucide-react';
import { useState } from 'react';

interface AddCardFormProps {
  onAdd: (title: string, details: string) => void;
}

export default function AddCardForm({ onAdd }: AddCardFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [details, setDetails] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      alert('Please enter a card title');
      return;
    }
    onAdd(title, details);
    setTitle('');
    setDetails('');
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTitle('');
    setDetails('');
    setIsOpen(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleCancel();
    }
  };

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 text-sm text-brand-blue hover:bg-blue-50 rounded-lg border-2 border-dashed border-brand-blue transition-colors"
        type="button"
      >
        <Plus size={16} />
        Add Card
      </button>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white rounded-lg shadow-md p-4 border-2 border-brand-yellow"
      onKeyDown={handleKeyDown}
    >
      <input
        type="text"
        placeholder="Card title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full px-3 py-2 mb-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm"
        autoFocus
      />
      <textarea
        placeholder="Card details"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
        className="w-full px-3 py-2 mb-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-blue text-sm resize-none"
        rows={2}
      />
      <div className="flex gap-2">
        <button
          type="submit"
          className="flex-1 px-3 py-2 bg-brand-purple text-white rounded-lg hover:bg-opacity-90 transition-all text-sm font-medium"
        >
          Add
        </button>
        <button
          type="button"
          onClick={handleCancel}
          className="flex-1 px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all text-sm"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
