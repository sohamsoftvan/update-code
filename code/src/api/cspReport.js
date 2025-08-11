import axios from 'axios';

export const reportCSPViolation = async (violationData) => {
    try {
        const response = await axios.post('/api/csp-report', violationData);
        return response.data;
    } catch (error) {
        console.error('Error reporting CSP violation:', error);
        throw error;
    }
}; 