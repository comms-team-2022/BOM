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

export interface TeamInfo {
    score: number;
    chosenAnswer?: number | string;
    isCorrect?: boolean;
    house: keyof Teams; // this makes it easier
}

export interface Teams {
    graham: TeamInfo;
    wesley: TeamInfo;
    elliot: TeamInfo;
    booth: TeamInfo;
}

// For non-multichoice questions
export type TeamCorrect = {
    [key in keyof Teams]?: boolean;
};
