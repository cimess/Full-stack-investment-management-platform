import React, { useEffect, useState } from 'react';
import { useAnalytics } from '../hooks/useAnalysis';
import FeedbackSurveyModal from './FeedbackSurveyModal';

const Analytics = () => {
    // This activates the automatic page tracking effect
    const { trackEvent } = useAnalytics();
    const [showSessionSurvey, setShowSessionSurvey] = useState(false);

    useEffect(() => {
        // Increment session count
        // Note: sessionStorage persists for the tab session. 
        // For a true "visit" count, localStorage is often used with a session flag.
        const countStr = localStorage.getItem('novainvest_visit_count') || '0';
        const sessionActive = sessionStorage.getItem('novainvest_session_active');
        
        if (!sessionActive) {
            const newCount = parseInt(countStr) + 1;
            localStorage.setItem('novainvest_visit_count', newCount.toString());
            sessionStorage.setItem('novainvest_session_active', 'true');
            
            // Trigger survey on 3rd visit
            const surveyCompleted = localStorage.getItem('session_survey_completed');
            if (newCount === 3 && !surveyCompleted) {
                // Small delay for better UX
                setTimeout(() => setShowSessionSurvey(true), 2000);
            }
        }
    }, []);

    const handleSaveFeedback = async (feedback: string | number) => {
        trackEvent("SESSION_FEEDBACK_SUBMITTED", { feedback });
        localStorage.setItem('session_survey_completed', 'true');
    };

    return (
        <>
            <FeedbackSurveyModal
                isOpen={showSessionSurvey}
                onClose={() => setShowSessionSurvey(false)}
                question="What's one thing you wish the app did better?"
                type="text"
                onSave={handleSaveFeedback}
                title="Your feedback matters"
            />
        </>
    );
};

export default Analytics;
