interface QuestionBase {
    question: string;
    isMultiChoice: boolean;
}

interface MultiQuestion extends QuestionBase {
    isMultiChoice: true;
    answers: string[];
    correctIndex: number;
}

interface OpenQuestion extends QuestionBase {
    isMultiChoice: false;
    answer: string;
}

type Question = MultiQuestion | OpenQuestion;

export interface QuestionGroup {
    grade: number;
    questions: Question[];
}

export type Teams = {
    [key: string]: { house: string; score: number; chosenAnswer?: number; isCorrect?: boolean };
};
