
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFaqs } from '../store/slices/faqSlice';
import { RootState, AppDispatch } from '../store';
import { Card } from './ui/card';
import { ChevronDown } from 'lucide-react';


const FaqList: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { faqs, loading, error } = useSelector((state: RootState) => state.faq);
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchFaqs());
  }, [dispatch]);

  if (loading) return <div className="text-center py-8 text-lg text-dark-secondary">Loading FAQs...</div>;
  if (error) return <div className="text-center py-8 text-red-500">Error: {error}</div>;
  if (!faqs.length) return <div className="text-center py-8 text-dark-secondary">No FAQs found.</div>;

  // Remove duplicate questions (keep first occurrence)
  const uniqueFaqs = faqs.filter((faq, idx, arr) =>
    arr.findIndex(f => f.question.trim().toLowerCase() === faq.question.trim().toLowerCase()) === idx
  );

  return (
    <div className="space-y-4">
      {uniqueFaqs.map((faq, idx) => {
        const isOpen = openIndex === idx;
        return (
          <Card
            key={faq._id}
            className={`dark-card p-0 shadow-md hover:shadow-lg transition-shadow overflow-hidden`}
          >
            <button
              className="w-full flex items-center gap-3 px-6 py-5 focus:outline-none select-text"
              onClick={() => setOpenIndex(isOpen ? null : idx)}
              aria-expanded={isOpen}
              aria-controls={`faq-answer-${faq._id}`}
            >
              <ChevronDown
                className={`w-6 h-6 text-dark-cta transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
              />
              <span className="font-semibold text-lg text-dark-primary text-left">{faq.question}</span>
            </button>
            {isOpen && (
              <div
                id={`faq-answer-${faq._id}`}
                className="px-6 pb-5 text-dark-secondary text-base leading-relaxed animate-fadein"
              >
                {faq.answer}
              </div>
            )}
          </Card>
        );
      })}
    </div>
  );
};

export default FaqList;
