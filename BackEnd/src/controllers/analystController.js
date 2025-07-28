import { getMonthlySummary } from '../services/analystService.js';

export const getAnalystSummary = async (req, res) => {
  try {
    const userId = req.user.id;
    const { month } = req.query;

    if (!month || !/^\d{4}-\d{2}$/.test(month)) {
      return res.status(400).json({ message: 'Invalid or missing month parameter (format: YYYY-MM)' });
    }

    const summary = await getMonthlySummary(userId, month);
    res.json(summary);
  } catch (error) {
    console.error('Analyst Error:', error);
    res.status(500).json({ message: 'Failed to generate summary' });
  }
};
