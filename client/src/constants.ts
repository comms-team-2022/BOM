export const teamColors = {
    // The hex codes were used because the charts didn't support the chakra colours
    graham: "#F56565", // red.400
    wesley: "#ECC94B", // yellow.400
    elliot: "#48BB78", // green.400
    booth: "#4299e1", // blue.400
};

// Make sure this is the same as the one in index.ts in server
export const enum Page {
    START,
    GRADE,
    QUESTION,
    CHART,
    END,
}
